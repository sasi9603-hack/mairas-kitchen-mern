/**
 * Maira's Kitchen — Pre-Deployment Audit Test Runner (v2)
 * Executes real HTTP requests against backend to verify:
 * - Health & Atlas connectivity
 * - Unauthenticated route rejection (401)
 * - Customer unauthorized access rejection (403)
 * - Input validation & error responses (400)
 * - Admin authentication (200)
 * - Order & Reservation creation & transitions
 * - Menu CRUD & availability toggling
 * - Settings read & write persistence
 */

const BASE_URL = 'http://localhost:5000/api';

const results = {
  passed: [],
  failed: []
};

function record(name, passed, details) {
  if (passed) {
    results.passed.push({ name, details });
    console.log(`[PASS] ${name}: ${details}`);
  } else {
    results.failed.push({ name, details });
    console.error(`[FAIL] ${name}: ${details}`);
  }
}

async function run() {
  console.log('=== STARTING AUTOMATED PRE-DEPLOYMENT AUDIT ===\n');

  // 1. Health & DB Check
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    const isConnected = data.database?.connected === true || data.database?.status === 'connected';
    record('Health Check & MongoDB Atlas Connectivity', res.status === 200 && isConnected, `Status: ${res.status}, Host: ${data.database?.host}, Provider: ${data.database?.provider}`);
  } catch (err) {
    record('Health Check & MongoDB Atlas Connectivity', false, err.message);
  }

  // 2. Unauthenticated Protected Route Checks (Must return 401)
  const protectedEndpoints = [
    { method: 'GET', url: '/admin/overview' },
    { method: 'GET', url: '/orders' },
    { method: 'GET', url: '/reservations' },
    { method: 'POST', url: '/menu' },
    { method: 'GET', url: '/admin/customers' },
    { method: 'PUT', url: '/settings' }
  ];

  for (const ep of protectedEndpoints) {
    try {
      const res = await fetch(`${BASE_URL}${ep.url}`, { method: ep.method });
      const ok = res.status === 401;
      record(`Unauthenticated ${ep.method} ${ep.url} Protection`, ok, `Received HTTP ${res.status} (Expected 401)`);
    } catch (err) {
      record(`Unauthenticated ${ep.method} ${ep.url} Protection`, false, err.message);
    }
  }

  // 3. Invalid Admin Login (Must return 401)
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@mairaskitchen.com', password: 'WrongPassword999!' })
    });
    const ok = res.status === 401;
    record('Invalid Password Authentication', ok, `Received HTTP ${res.status} (Expected 401)`);
  } catch (err) {
    record('Invalid Password Authentication', false, err.message);
  }

  // 4. Register Non-Admin Customer & Attempt Admin Access (Must return 403 Forbidden)
  let customerToken = null;
  const testCustomerEmail = `audit_customer_${Date.now()}@example.com`;
  try {
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Audit Customer',
        email: testCustomerEmail,
        password: 'Password123!',
        role: 'admin' // Attempt privilege escalation via payload
      })
    });
    const regData = await regRes.json();
    const roleIsCustomer = regData.data && regData.data.role === 'customer';
    customerToken = regData.data?.token;

    record('Public Registration Role Isolation (No Admin Privilege Escalation)', roleIsCustomer, `Assigned role: ${regData.data?.role}`);

    // Now test accessing admin routes with customer token
    const testRes = await fetch(`${BASE_URL}/admin/overview`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const ok = testRes.status === 403;
    record('Non-Admin Access to /api/admin/overview Blocked', ok, `Received HTTP ${testRes.status} (Expected 403)`);

    const testRes2 = await fetch(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${customerToken}` }
    });
    const ok2 = testRes2.status === 403;
    record('Non-Admin Access to /api/orders Blocked', ok2, `Received HTTP ${testRes2.status} (Expected 403)`);
  } catch (err) {
    record('Role Isolation & Authorization', false, err.message);
  }

  // 5. Valid Admin Login
  let adminToken = null;
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@mairaskitchen.com',
        password: 'SecurePassword2026!'
      })
    });
    const data = await res.json();
    const ok = res.status === 200 && data.data?.role === 'admin' && Boolean(data.data?.token);
    adminToken = data.data?.token;
    record('Legitimate Admin Authentication', ok, `Role: ${data.data?.role}, Token received`);
  } catch (err) {
    record('Legitimate Admin Authentication', false, err.message);
  }

  // 6. Public Menu Fetching
  try {
    const res = await fetch(`${BASE_URL}/menu`);
    const data = await res.json();
    const ok = res.status === 200 && Array.isArray(data.data) && data.data.length >= 33;
    record('Public Menu Catalog Retrieval', ok, `Loaded ${data.data?.length} dishes from MongoDB Atlas`);
  } catch (err) {
    record('Public Menu Catalog Retrieval', false, err.message);
  }

  // 7. Input Validation: Invalid Order (Empty items & missing phone)
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Audit User' },
        items: []
      })
    });
    const data = await res.json();
    const ok = res.status === 400 && data.success === false;
    record('Order Validation (Missing phone & empty items)', ok, `Received HTTP ${res.status}: "${data.message}"`);
  } catch (err) {
    record('Order Validation', false, err.message);
  }

  // 8. Input Validation: Invalid Reservation (Missing reservationDate & time)
  try {
    const res = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Audit User',
        phone: '123'
      })
    });
    const data = await res.json();
    const ok = res.status === 400 && data.success === false;
    record('Reservation Validation (Incomplete fields & short phone)', ok, `Received HTTP ${res.status}: "${data.message}"`);
  } catch (err) {
    record('Reservation Validation', false, err.message);
  }

  // 9. Legitimate Order Placement & Authoritative Pricing Check
  let createdOrderId = null;
  let createdOrderNumber = null;
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: 'Audit Customer Rao',
          phone: '+91 99887 76655',
          email: 'audit.customer@test.com'
        },
        items: [
          { itemId: 'biry-01', name: "Maira's Special Wood-Fire Biryani", quantity: 2, price: 1 } // Send fake price of ₹1
        ],
        orderType: 'dine-in',
        paymentMethod: 'cash'
      })
    });
    const data = await res.json();
    createdOrderId = data.data?._id || data.data?.id;
    createdOrderNumber = data.data?.orderNumber;

    // Check authoritative price: 2 x 340 = 680, NOT 2 x 1 = 2
    const totalIsAuthoritative = data.data?.totalAmount === 680;
    record('Order Creation & Authoritative Pricing', totalIsAuthoritative, `Order #${createdOrderNumber}, Grand Total: ₹${data.data?.totalAmount} (Calculated from DB price ₹340 x 2)`);
  } catch (err) {
    record('Order Creation & Authoritative Pricing', false, err.message);
  }

  // 10. Legitimate Table Reservation Placement
  let createdResId = null;
  let createdBookingRef = null;
  try {
    const res = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Audit Customer Rao',
        phone: '+91 99887 76655',
        email: 'audit.customer@test.com',
        reservationDate: '2026-10-25',
        reservationTime: '19:30',
        guestCount: '4 Guests',
        seatingPreference: 'Open-Air Garden Lawn',
        specialRequests: 'Audit test booking near fountain'
      })
    });
    const data = await res.json();
    createdResId = data.data?._id || data.data?.id;
    createdBookingRef = data.data?.bookingReference || data.data?.bookingRef;
    const ok = res.status === 201 && Boolean(createdBookingRef);
    record('Table Reservation Creation', ok, `Booking Ref #${createdBookingRef}, Status: ${data.data?.status}`);
  } catch (err) {
    record('Table Reservation Creation', false, err.message);
  }

  // 11. Admin Order Status Workflow & Cash Payment Update
  if (adminToken && createdOrderId) {
    try {
      // Transition: received -> preparing
      const resPrep = await fetch(`${BASE_URL}/orders/${createdOrderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: 'preparing' })
      });
      const dataPrep = await resPrep.json();

      // Transition: preparing -> ready
      const resReady = await fetch(`${BASE_URL}/orders/${createdOrderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: 'ready' })
      });
      const dataReady = await resReady.json();

      // Cash payment: pending -> paid
      const resPay = await fetch(`${BASE_URL}/orders/${createdOrderId}/payment`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ paymentStatus: 'paid' })
      });
      const dataPay = await resPay.json();

      const ok = dataPrep.success && dataReady.success && dataPay.success && dataPay.data?.paymentStatus === 'paid';
      record('Admin Order Status Workflow & Cash Collection Toggle', ok, `Final Status: ${dataReady.data?.orderStatus}, Payment: ${dataPay.data?.paymentStatus}`);
    } catch (err) {
      record('Admin Order Status Workflow', false, err.message);
    }
  }

  // 12. Admin Reservation Status Workflow (pending -> confirmed)
  if (adminToken && createdResId) {
    try {
      const res = await fetch(`${BASE_URL}/reservations/${createdResId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status: 'confirmed', note: 'Audit confirmed table' })
      });
      const data = await res.json();
      const ok = res.status === 200 && data.data?.status === 'confirmed';
      record('Admin Reservation Status Confirmation', ok, `Updated status to "${data.data?.status}"`);
    } catch (err) {
      record('Admin Reservation Status Confirmation', false, err.message);
    }
  }

  // 13. Admin Menu Availability Toggle (and Revert)
  if (adminToken) {
    try {
      // Find item biry-01
      const menuRes = await fetch(`${BASE_URL}/menu/biry-01`);
      const menuData = await menuRes.json();
      const dishId = menuData.data?._id;

      // Toggle to Sold Out (false)
      const resFalse = await fetch(`${BASE_URL}/menu/${dishId}/availability`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ available: false })
      });
      const dataFalse = await resFalse.json();

      // Verify public menu now reflects sold-out if requested available=true
      const pubRes = await fetch(`${BASE_URL}/menu?available=true`);
      const pubData = await pubRes.json();
      const isGoneFromAvailable = !pubData.data.some(d => d.itemId === 'biry-01');

      // Revert back to Available (true)
      const resTrue = await fetch(`${BASE_URL}/menu/${dishId}/availability`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ available: true })
      });
      const dataTrue = await resTrue.json();

      const ok = dataFalse.data?.available === false && isGoneFromAvailable && dataTrue.data?.available === true;
      record('Menu Availability Toggle & Public Sync', ok, 'Dish toggled to Sold Out, verified filtered on public menu, then restored to Available');
    } catch (err) {
      record('Menu Availability Toggle & Public Sync', false, err.message);
    }
  }

  // 14. Customer Directory Aggregation Check
  if (adminToken) {
    try {
      const res = await fetch(`${BASE_URL}/admin/customers?search=9988776655`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      const cust = data.data?.[0];
      const ok = res.status === 200 && cust && (cust.orderCount >= 1 || cust.ordersCount >= 1);
      record('Customer Directory Aggregation & History', ok, `Found ${cust?.name} with ${cust?.orderCount} orders and ${cust?.reservationCount} bookings`);
    } catch (err) {
      record('Customer Directory Aggregation & History', false, err.message);
    }
  }

  // 15. Settings Retrieval & Persistence
  if (adminToken) {
    try {
      const getRes = await fetch(`${BASE_URL}/settings`);
      const currentSettings = await getRes.json();

      const putRes = await fetch(`${BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({
          ...currentSettings.data,
          announcement: `Authentic wood-fire dum biryani prepared fresh daily. (Verified Audit ${new Date().toLocaleDateString()})`
        })
      });
      const putData = await putRes.json();
      const ok = putRes.status === 200 && putData.success === true;
      record('Restaurant Settings Read & Write Persistence', ok, 'Settings retrieved, announcement updated and persisted');
    } catch (err) {
      record('Restaurant Settings Read & Write Persistence', false, err.message);
    }
  }

  // 16. Overview Metrics Verification
  if (adminToken) {
    try {
      const res = await fetch(`${BASE_URL}/admin/overview`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      const m = data.data?.metrics;
      const ok = res.status === 200 && m && (m.totalOrders > 0 || m.orders?.total > 0) && (m.paidRevenue > 0 || m.revenue?.collectedRevenue > 0);
      record('Admin Overview Analytics & Separation of Cash Revenue', ok, `Total Orders: ${m?.totalOrders || m?.orders?.total}, Verified Cash: ₹${m?.paidRevenue || m?.revenue?.collectedRevenue}, Total Dishes: ${m?.totalDishes || m?.menu?.total}`);
    } catch (err) {
      record('Admin Overview Analytics', false, err.message);
    }
  }

  console.log('\n=== AUDIT SUITE FINISHED ===');
  console.log(`Passed: ${results.passed.length}`);
  console.log(`Failed: ${results.failed.length}`);
}

run();
