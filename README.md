# Maira's Kitchen — Full-Stack MERN Restaurant Application & Admin Dashboard

> A wood-fire biryani & dining bistro web platform with real-time digital ordering, table reservation workflows, and a role-protected management dashboard.

---

## 🌟 Overview

**Maira's Kitchen** is a production-grade restaurant web platform designed for authentic wood-fire biryani and bistro dining. It features:
- **Public Website & Digital Menu:** Modern, animated customer interface inspired by modern bistro aesthetics, with category rails, interactive dishes, dish search & dietary filters (`Veg` vs. `Non-Veg`), real-time cart tray, pre-ordering modal, and table booking modal.
- **Administrative Dashboard:** Protected role-based portal (`/admin`) for restaurant operations:
  - Real-time operations overview with database-backed metrics.
  - Strict distinction between total order value and verified cash collected.
  - Kitchen order management with server-validated status transitions.
  - Table booking confirmations and cancellation reasons.
  - Menu catalog administration with live availability (`Available` vs. `Sold Out`) toggles and dish editor.
  - Consolidated customer directory aggregated from orders and reservations with lifetime history.
  - Restaurant operational settings (timings, notices, reservation preferences).

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18
- **Tooling & Bundler:** Vite
- **Routing:** React Router DOM (v6)
- **Styling:** Vanilla CSS design systems (`style.css` for public site; `admin.css` for dashboard)
- **API Client:** Fetch API with centralized request service (`client/src/services/api.js`)

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose (v8)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt password hashing
- **Validation:** Express Validator

---

## 📁 Repository Structure

```
Hotel_Anime_design/
├── client/                      # Frontend React 18 + Vite Application
│   ├── public/                  # Static assets & dish imagery
│   ├── src/
│   │   ├── components/          # Reusable customer & admin UI components
│   │   │   ├── admin/           # AdminLayout, AdminSidebar, AdminHeader, AdminRoute
│   │   │   ├── DishCard.jsx     # Menu dish card component
│   │   │   ├── PreOrderModal.jsx# Cart & pre-order checkout modal
│   │   │   ├── ReservationModal.jsx # Table booking modal
│   │   │   └── QuickActionDock.jsx  # Floating bottom action dock
│   │   ├── context/             # React Context providers (AuthContext, CartContext)
│   │   ├── data/                # Static dish data fallback
│   │   ├── pages/               # Application routes
│   │   │   ├── admin/           # Dashboard pages (Overview, Orders, Reservations, Menu, Customers, Settings, Login)
│   │   │   ├── Home.jsx         # Customer home page
│   │   │   └── Menu.jsx         # Customer menu page
│   │   ├── services/            # Centralized API service layer (api.js)
│   │   ├── styles/              # Dedicated CSS (style.css, admin.css)
│   │   ├── App.jsx              # Root router & layout configuration
│   │   └── main.jsx             # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Backend Node.js + Express API
│   ├── config/                  # MongoDB Atlas connection (db.js)
│   ├── controllers/             # Business logic & request handlers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── healthController.js
│   │   ├── menuController.js
│   │   ├── orderController.js
│   │   ├── reservationController.js
│   │   └── settingsController.js
│   ├── middleware/              # Auth, role authorization, db check, error handling
│   ├── models/                  # Mongoose models (User, MenuItem, Order, Reservation, Settings)
│   ├── routes/                  # Express route definitions
│   ├── scripts/                 # Utility scripts (seedMenu.js, seedAdmin.js, audit_tests.js)
│   ├── .env.example             # Example environment configuration
│   ├── package.json
│   └── server.js                # Server entry point
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB Atlas cluster account (or local MongoDB)

---

### Backend Setup

1. Navigate to the `server/` directory:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Fill in your environment variables in `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Seed the database with the initial menu catalog (33 dishes across 7 categories):
   ```bash
   npm run seed
   ```

5. Provision an administrator account safely:
   ```bash
   npm run seed:admin
   ```

6. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the `client/` directory:
   ```bash
   cd client
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend application will run on `http://localhost:5173`.

3. To build for production:
   ```bash
   npm run build
   ```

---

## 🔒 Security Features

- **Password Hashing:** Passwords are encrypted using `bcrypt` with 10 salt rounds. Plaintext passwords are never stored or logged.
- **Role Isolation:** Public registration assigns `role: 'customer'` only. Administrative privileges cannot be self-assigned.
- **Server-Side Validation:** All order totals are calculated using authoritative MongoDB database prices; client-tampered prices are rejected.
- **Status Workflow Protection:** Orders and reservations follow strict state transitions (`received` → `preparing` → `ready` → `completed`). Terminal statuses cannot be reopened.
- **Protected Administrative Endpoints:** All administrative routes (`/api/admin/*`, `/api/orders`, `/api/reservations`, etc.) enforce JWT verification and role authorization (`admin` / `staff`).

---

## 🧪 Testing

Run the automated pre-deployment API and security audit test suite:
```bash
node server/scripts/audit_tests.js
```

---

## 📄 License

ISC License. Built for Maira's Kitchen.
