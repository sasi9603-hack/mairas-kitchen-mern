// Maira's Kitchen - Live Digital Menu Data for React
// Inspired by The Bun Wigi UI/UX Architecture

export const RESTAURANT_INFO = {
  name: "Maira's Kitchen",
  tagline: "A Bistro of Flavours & Vibes",
  subTagline: "Wood-Fire Dum Biryanis · Signature Starters · Open-Air Garden Ambience",
  address: "Mythri Layout, Near Rythu Market, Opposite Dr. YSR Memorial Park, Islampuram, Pulivendula, Andhra Pradesh - 516390",
  phone: "+91 99599 51110",
  phoneRaw: "9959951110",
  whatsapp: "919959951110",
  instagram: "https://www.instagram.com/mairaskitchen1/",
  instagramHandle: "@mairaskitchen1",
  googleMaps: "https://maps.app.goo.gl/sGNzKd769DQMBjL76",
  timings: "11:00 AM – 11:00 PM (All 7 Days)",
  priceRange: "₹₹ (Affordable Premium)",
  cuisines: ["Wood-Fire Biryani", "Rayalaseema & Andhra", "Tandoor & Kebabs", "Indo-Chinese", "Bistro Classics", "Coolers"]
};

export const ROTATING_BADGES = [
  { text: "దమ్ బిర్యానీ", trans: "DUM BIRYANI", sub: "wood-fire handi" },
  { text: "రాంబో చికెన్", trans: "RAMBO CHICKEN", sub: "signature crisp" },
  { text: "కట్టెల పొయ్యి", trans: "WOOD-FIRE AROMA", sub: "earthen clay pots" },
  { text: "రాయలసీమ రుచులు", trans: "AUTHENTIC SPICE", sub: "rich heritage" },
  { text: "ఆహ్లదకర వాతావరణం", trans: "THE VIBES", sub: "open-air garden dining" }
];

export const MENU_CATEGORIES = [
  {
    "id": "soups",
    "name": "Soups",
    "shortName": "Soups",
    "icon": "🥣",
    "image": "/assets/images/rambo_chicken.jpg",
    "description": "Steaming hot, rich, and comforting soups made with fresh vegetables, chicken, and house-blended seasonings.",
    "subcategories": [
      "Veg Soups",
      "Non-Veg Soups"
    ],
    "items": [
      {
        "id": "item-001",
        "itemId": "item-001",
        "name": "Tomato Soup",
        "category": "soups",
        "categoryName": "Soups",
        "subcategory": "Veg Soups",
        "diet": "veg",
        "price": 70,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "A comforting, wholesome bowl of hot Tomato Soup prepared with fresh vegetables, garlic, and aromatic herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-002",
        "itemId": "item-002",
        "name": "Veg Sweet Corn Soup",
        "category": "soups",
        "categoryName": "Soups",
        "subcategory": "Veg Soups",
        "diet": "veg",
        "price": 80,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "A comforting, wholesome bowl of hot Veg Sweet Corn Soup prepared with fresh vegetables, garlic, and aromatic herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-003",
        "itemId": "item-003",
        "name": "Veg Hot & Sour Soup",
        "category": "soups",
        "categoryName": "Soups",
        "subcategory": "Veg Soups",
        "diet": "veg",
        "price": 80,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "A comforting, wholesome bowl of hot Veg Hot & Sour Soup prepared with fresh vegetables, garlic, and aromatic herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-004",
        "itemId": "item-004",
        "name": "Veg Manchow Soup",
        "category": "soups",
        "categoryName": "Soups",
        "subcategory": "Veg Soups",
        "diet": "veg",
        "price": 90,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "A comforting, wholesome bowl of hot Veg Manchow Soup prepared with fresh vegetables, garlic, and aromatic herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-005",
        "itemId": "item-005",
        "name": "Lemon Coriander Soup",
        "category": "soups",
        "categoryName": "Soups",
        "subcategory": "Veg Soups",
        "diet": "veg",
        "price": 90,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "A comforting, wholesome bowl of hot Lemon Coriander Soup prepared with fresh vegetables, garlic, and aromatic herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-006",
        "itemId": "item-006",
        "name": "Chicken Sweet Corn Soup",
        "category": "soups",
        "categoryName": "Soups",
        "subcategory": "Non-Veg Soups",
        "diet": "non-veg",
        "price": 100,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Rich and savory Chicken Sweet Corn Soup slow-simmered with tender shredded chicken, broth, and cracked black pepper.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-007",
        "itemId": "item-007",
        "name": "Chicken Hot & Sour Soup",
        "category": "soups",
        "categoryName": "Soups",
        "subcategory": "Non-Veg Soups",
        "diet": "non-veg",
        "price": 100,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Rich and savory Chicken Hot & Sour Soup slow-simmered with tender shredded chicken, broth, and cracked black pepper.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-008",
        "itemId": "item-008",
        "name": "Chicken Manchow Soup",
        "category": "soups",
        "categoryName": "Soups",
        "subcategory": "Non-Veg Soups",
        "diet": "non-veg",
        "price": 110,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Rich and savory Chicken Manchow Soup slow-simmered with tender shredded chicken, broth, and cracked black pepper.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "salads",
    "name": "Salads & Accompaniments",
    "shortName": "Salads",
    "icon": "🥗",
    "image": "/assets/images/garden_ambience.jpg",
    "description": "Crispy garden salads, fresh cucumber cuts, and cooling raitas to accompany your feast.",
    "subcategories": [
      "Fresh Salads",
      "Raitas"
    ],
    "items": [
      {
        "id": "item-009",
        "itemId": "item-009",
        "name": "Cucumber Salad",
        "category": "salads",
        "categoryName": "Salads & Accompaniments",
        "subcategory": "Fresh Salads",
        "diet": "veg",
        "price": 50,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/garden_ambience.jpg",
        "description": "Crisp and refreshing fresh garden greens, sliced cucumbers, tomatoes, and lime wedges.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-010",
        "itemId": "item-010",
        "name": "Green Salad",
        "category": "salads",
        "categoryName": "Salads & Accompaniments",
        "subcategory": "Fresh Salads",
        "diet": "veg",
        "price": 60,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/garden_ambience.jpg",
        "description": "Crisp and refreshing fresh garden greens, sliced cucumbers, tomatoes, and lime wedges.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-011",
        "itemId": "item-011",
        "name": "Mixed Raita",
        "category": "salads",
        "categoryName": "Salads & Accompaniments",
        "subcategory": "Raitas",
        "diet": "veg",
        "price": 30,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/garden_ambience.jpg",
        "description": "Cooling spiced yogurt blended with crisp veggies, roasted cumin, and fresh mint.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "veg-starters",
    "name": "Veg Starters",
    "shortName": "Veg Starters",
    "icon": "🥬",
    "image": "/assets/images/rambo_chicken.jpg",
    "description": "Crispy, crunchy, and wok-tossed vegetarian delights packed with garlic, pepper, and Rayalaseema spice.",
    "subcategories": [
      "Paneer Specials",
      "Crisp & Manchurian"
    ],
    "items": [
      {
        "id": "item-012",
        "itemId": "item-012",
        "name": "Veg Manchurian",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 210,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Veg Manchurian tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-013",
        "itemId": "item-013",
        "name": "Chilli Paneer",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Paneer Specials",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Chilli Paneer tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-014",
        "itemId": "item-014",
        "name": "Paneer 65",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Paneer Specials",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Paneer 65 tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-015",
        "itemId": "item-015",
        "name": "Paneer Manchurian",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Paneer Specials",
        "diet": "veg",
        "price": 230,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Paneer Manchurian tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-016",
        "itemId": "item-016",
        "name": "Gobi Manchurian",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 200,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Gobi Manchurian tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-017",
        "itemId": "item-017",
        "name": "Gobi 65",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 200,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Gobi 65 tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-018",
        "itemId": "item-018",
        "name": "Chilli Mushroom",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 210,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Chilli Mushroom tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-019",
        "itemId": "item-019",
        "name": "Mushroom Manchurian",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Mushroom Manchurian tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-020",
        "itemId": "item-020",
        "name": "Mushroom 65",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 210,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Mushroom 65 tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-021",
        "itemId": "item-021",
        "name": "Crispy Corn",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Crispy Corn tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-022",
        "itemId": "item-022",
        "name": "Crispy Veg",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 200,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Crispy Veg tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-023",
        "itemId": "item-023",
        "name": "Paneer Pepper Dry",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Paneer Specials",
        "diet": "veg",
        "price": 210,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Paneer Pepper Dry tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-024",
        "itemId": "item-024",
        "name": "Paneer Majestic",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Paneer Specials",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Paneer Majestic tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-025",
        "itemId": "item-025",
        "name": "Honey Chilli Potato",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 210,
        "tags": [
          "veg",
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Honey Chilli Potato tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-026",
        "itemId": "item-026",
        "name": "Chilli Baby Corn",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Chilli Baby Corn tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-027",
        "itemId": "item-027",
        "name": "Baby Corn Manchurian",
        "category": "veg-starters",
        "categoryName": "Veg Starters",
        "subcategory": "Crisp & Manchurian",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Crispy, flavorful Baby Corn Manchurian tossed with capsicum, garlic, spring onions, and special house spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "non-veg-starters",
    "name": "Non-Veg Starters",
    "shortName": "Non-Veg Starters",
    "icon": "🍗",
    "image": "/assets/images/rambo_chicken.jpg",
    "description": "Signature crispy chicken wings, spicy mutton roasts, and seasoned egg appetizers.",
    "subcategories": [
      "Chicken Starters",
      "Mutton Starters",
      "Egg Starters"
    ],
    "items": [
      {
        "id": "item-028",
        "itemId": "item-028",
        "name": "Chicken Majestic",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-029",
        "itemId": "item-029",
        "name": "Chicken 555",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 240,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-030",
        "itemId": "item-030",
        "name": "Chilli Chicken",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 220,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-031",
        "itemId": "item-031",
        "name": "Chicken 65",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 220,
        "tags": [
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-032",
        "itemId": "item-032",
        "name": "Chicken Lollipop",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 270,
        "tags": [
          "bestseller"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-033",
        "itemId": "item-033",
        "name": "Chicken Drumstick",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 320,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-034",
        "itemId": "item-034",
        "name": "Chicken Crispy Wings",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 220,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-035",
        "itemId": "item-035",
        "name": "Chicken Chilli Wings",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 230,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-036",
        "itemId": "item-036",
        "name": "Lemon Chicken",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 240,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-037",
        "itemId": "item-037",
        "name": "Pepper Chicken",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 240,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-038",
        "itemId": "item-038",
        "name": "Hyderabadi Long Stick Chicken",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-039",
        "itemId": "item-039",
        "name": "Kaju Nut Dry Chicken",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-040",
        "itemId": "item-040",
        "name": "Chicken Schezwan Bone Dry",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-041",
        "itemId": "item-041",
        "name": "Kaju Nut Chicken Kheema Balls",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Chicken Starters",
        "diet": "non-veg",
        "price": 270,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Succulent chicken chunks tossed with house chili glaze, crunchy cashews, and aromatic spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-042",
        "itemId": "item-042",
        "name": "Mutton Roast",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Mutton Starters",
        "diet": "non-veg",
        "price": 330,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Tender roasted young mutton pieces marinated in Rayalaseema spices and dry-fried with curry leaves.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-043",
        "itemId": "item-043",
        "name": "Mutton Fry",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Mutton Starters",
        "diet": "non-veg",
        "price": 330,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Tender roasted young mutton pieces marinated in Rayalaseema spices and dry-fried with curry leaves.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-044",
        "itemId": "item-044",
        "name": "Mutton Schezwan Kaju Dry",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Mutton Starters",
        "diet": "non-veg",
        "price": 350,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Tender roasted young mutton pieces marinated in Rayalaseema spices and dry-fried with curry leaves.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-045",
        "itemId": "item-045",
        "name": "Chilli Egg",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Egg Starters",
        "diet": "egg",
        "price": 160,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Spiced Chilli Egg prepared fresh with onions, green chilies, and cracked pepper.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-046",
        "itemId": "item-046",
        "name": "Schezwan Egg Dry",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Egg Starters",
        "diet": "egg",
        "price": 180,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Spiced Schezwan Egg Dry prepared fresh with onions, green chilies, and cracked pepper.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-047",
        "itemId": "item-047",
        "name": "Omelette",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Egg Starters",
        "diet": "egg",
        "price": 40,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Spiced Omelette prepared fresh with onions, green chilies, and cracked pepper.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-048",
        "itemId": "item-048",
        "name": "Boiled Eggs (2)",
        "category": "non-veg-starters",
        "categoryName": "Non-Veg Starters",
        "subcategory": "Egg Starters",
        "diet": "egg",
        "price": 30,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Spiced Boiled Eggs (2) prepared fresh with onions, green chilies, and cracked pepper.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "seafood-starters",
    "name": "Seafood Starters",
    "shortName": "Seafood",
    "icon": "🍤",
    "image": "/assets/images/rambo_chicken.jpg",
    "description": "Coastal spiced Apollo fish, crispy tawa fish, and juicy garlic butter prawns.",
    "subcategories": [
      "Fish Specials",
      "Prawns Specials"
    ],
    "items": [
      {
        "id": "item-049",
        "itemId": "item-049",
        "name": "Apollo Fish",
        "category": "seafood-starters",
        "categoryName": "Seafood Starters",
        "subcategory": "Fish Specials",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Fresh boneless fish fillets seasoned with coastal masala and crisped to golden perfection.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-050",
        "itemId": "item-050",
        "name": "Chilli Fish",
        "category": "seafood-starters",
        "categoryName": "Seafood Starters",
        "subcategory": "Fish Specials",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Fresh boneless fish fillets seasoned with coastal masala and crisped to golden perfection.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-051",
        "itemId": "item-051",
        "name": "Fish Roast B/L",
        "category": "seafood-starters",
        "categoryName": "Seafood Starters",
        "subcategory": "Fish Specials",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Fresh boneless fish fillets seasoned with coastal masala and crisped to golden perfection.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-052",
        "itemId": "item-052",
        "name": "Tawa Fish",
        "category": "seafood-starters",
        "categoryName": "Seafood Starters",
        "subcategory": "Fish Specials",
        "diet": "non-veg",
        "price": 270,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Fresh boneless fish fillets seasoned with coastal masala and crisped to golden perfection.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-053",
        "itemId": "item-053",
        "name": "Garlic Prawns",
        "category": "seafood-starters",
        "categoryName": "Seafood Starters",
        "subcategory": "Prawns Specials",
        "diet": "non-veg",
        "price": 270,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Plump sea prawns sautéed with garlic, black pepper, curry leaves, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-054",
        "itemId": "item-054",
        "name": "Prawns Fry",
        "category": "seafood-starters",
        "categoryName": "Seafood Starters",
        "subcategory": "Prawns Specials",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Plump sea prawns sautéed with garlic, black pepper, curry leaves, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-055",
        "itemId": "item-055",
        "name": "Chilli Prawns",
        "category": "seafood-starters",
        "categoryName": "Seafood Starters",
        "subcategory": "Prawns Specials",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Plump sea prawns sautéed with garlic, black pepper, curry leaves, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "breads",
    "name": "Indian Breads & Tandoor",
    "shortName": "Breads",
    "icon": "🫓",
    "image": "/assets/images/tandoor_platter.jpg",
    "description": "Hot clay-oven baked rotis, buttery naans, garlic naans, and stuffed kulchas.",
    "subcategories": [
      "Naans & Rotis",
      "Stuffed Kulchas"
    ],
    "items": [
      {
        "id": "item-056",
        "itemId": "item-056",
        "name": "Roti",
        "category": "breads",
        "categoryName": "Indian Breads & Tandoor",
        "subcategory": "Naans & Rotis",
        "diet": "veg",
        "price": 25,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Freshly baked in the earthen clay tandoor, soft, hot, and delicious.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-057",
        "itemId": "item-057",
        "name": "Butter Roti",
        "category": "breads",
        "categoryName": "Indian Breads & Tandoor",
        "subcategory": "Naans & Rotis",
        "diet": "veg",
        "price": 35,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Freshly baked in the earthen clay tandoor, soft, hot, and delicious.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-058",
        "itemId": "item-058",
        "name": "Plain Naan",
        "category": "breads",
        "categoryName": "Indian Breads & Tandoor",
        "subcategory": "Naans & Rotis",
        "diet": "veg",
        "price": 30,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Freshly baked in the earthen clay tandoor, soft, hot, and delicious.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-059",
        "itemId": "item-059",
        "name": "Butter Naan",
        "category": "breads",
        "categoryName": "Indian Breads & Tandoor",
        "subcategory": "Naans & Rotis",
        "diet": "veg",
        "price": 40,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Freshly baked in the earthen clay tandoor, soft, hot, and delicious.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-060",
        "itemId": "item-060",
        "name": "Garlic Naan",
        "category": "breads",
        "categoryName": "Indian Breads & Tandoor",
        "subcategory": "Naans & Rotis",
        "diet": "veg",
        "price": 50,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Freshly baked in the earthen clay tandoor, soft, hot, and delicious.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-061",
        "itemId": "item-061",
        "name": "Plain Kulcha",
        "category": "breads",
        "categoryName": "Indian Breads & Tandoor",
        "subcategory": "Stuffed Kulchas",
        "diet": "veg",
        "price": 40,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Freshly baked in the earthen clay tandoor, soft, hot, and delicious.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-062",
        "itemId": "item-062",
        "name": "Masala Kulcha",
        "category": "breads",
        "categoryName": "Indian Breads & Tandoor",
        "subcategory": "Stuffed Kulchas",
        "diet": "veg",
        "price": 50,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Freshly baked in the earthen clay tandoor, soft, hot, and delicious.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-063",
        "itemId": "item-063",
        "name": "Paneer Kulcha",
        "category": "breads",
        "categoryName": "Indian Breads & Tandoor",
        "subcategory": "Stuffed Kulchas",
        "diet": "veg",
        "price": 60,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Freshly baked in the earthen clay tandoor, soft, hot, and delicious.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "veg-kebabs",
    "name": "Veg Kebabs",
    "shortName": "Veg Kebabs",
    "icon": "🍢",
    "image": "/assets/images/tandoor_platter.jpg",
    "description": "Smoky, charred paneer and mushroom skewers roasted over glowing charcoal embers in our clay tandoor.",
    "subcategories": [
      "Paneer Tikkas",
      "Veg Seekh"
    ],
    "items": [
      {
        "id": "item-064",
        "itemId": "item-064",
        "name": "Veg Kabab",
        "category": "veg-kebabs",
        "categoryName": "Veg Kebabs",
        "subcategory": "Paneer Tikkas",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Skewered fresh cottage cheese and vegetables marinated in spiced hung yogurt, charred over charcoal.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-065",
        "itemId": "item-065",
        "name": "Paneer Tikka Kabab",
        "category": "veg-kebabs",
        "categoryName": "Veg Kebabs",
        "subcategory": "Paneer Tikkas",
        "diet": "veg",
        "price": 240,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Skewered fresh cottage cheese and vegetables marinated in spiced hung yogurt, charred over charcoal.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-066",
        "itemId": "item-066",
        "name": "Malai Paneer Smokey Kabab",
        "category": "veg-kebabs",
        "categoryName": "Veg Kebabs",
        "subcategory": "Paneer Tikkas",
        "diet": "veg",
        "price": 260,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Skewered fresh cottage cheese and vegetables marinated in spiced hung yogurt, charred over charcoal.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-067",
        "itemId": "item-067",
        "name": "Mushroom Tikka Kabab",
        "category": "veg-kebabs",
        "categoryName": "Veg Kebabs",
        "subcategory": "Paneer Tikkas",
        "diet": "veg",
        "price": 260,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Skewered fresh cottage cheese and vegetables marinated in spiced hung yogurt, charred over charcoal.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-068",
        "itemId": "item-068",
        "name": "Paneer Hariyali Tikka",
        "category": "veg-kebabs",
        "categoryName": "Veg Kebabs",
        "subcategory": "Paneer Tikkas",
        "diet": "veg",
        "price": 250,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Skewered fresh cottage cheese and vegetables marinated in spiced hung yogurt, charred over charcoal.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-069",
        "itemId": "item-069",
        "name": "Veg Seekh Kabab",
        "category": "veg-kebabs",
        "categoryName": "Veg Kebabs",
        "subcategory": "Veg Seekh",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Skewered fresh cottage cheese and vegetables marinated in spiced hung yogurt, charred over charcoal.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "non-veg-kebabs",
    "name": "Non-Veg Kebabs",
    "shortName": "Non-Veg Kebabs",
    "icon": "🔥",
    "image": "/assets/images/tandoor_platter.jpg",
    "description": "Succulent tandoori chicken, Kalmi kebabs, Reshmi and Afghani roasted skewers.",
    "subcategories": [
      "Chicken Kebabs",
      "Fish & Prawns Kebabs"
    ],
    "items": [
      {
        "id": "item-070",
        "itemId": "item-070",
        "name": "Kalmi Kabab Full",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 450,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Kalmi Kabab Full marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-071",
        "itemId": "item-071",
        "name": "Kalmi Kabab Half",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Kalmi Kabab Half marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-072",
        "itemId": "item-072",
        "name": "Tandoori Chicken Full",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 450,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Tandoori Chicken Full marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-073",
        "itemId": "item-073",
        "name": "Tandoori Chicken Half",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Tandoori Chicken Half marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-074",
        "itemId": "item-074",
        "name": "Malai Kabab",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Malai Kabab marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-075",
        "itemId": "item-075",
        "name": "Haryali Kabab",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Haryali Kabab marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-076",
        "itemId": "item-076",
        "name": "Reshmi Kabab",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Reshmi Kabab marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-077",
        "itemId": "item-077",
        "name": "Chicken Tikka",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Chicken Tikka marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-078",
        "itemId": "item-078",
        "name": "Afghani Tandoori Kabab Half",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Afghani Tandoori Kabab Half marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-079",
        "itemId": "item-079",
        "name": "Afghani Tandoori Kabab Full",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 500,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Afghani Tandoori Kabab Full marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-080",
        "itemId": "item-080",
        "name": "Afghani Tikka Kabab Half",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Afghani Tikka Kabab Half marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-081",
        "itemId": "item-081",
        "name": "Afghani Tikka Kabab Full",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Chicken Kebabs",
        "diet": "non-veg",
        "price": 500,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Afghani Tikka Kabab Full marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-082",
        "itemId": "item-082",
        "name": "Tandoori Fish Kabab",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Fish & Prawns Kebabs",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Tandoori Fish Kabab marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-083",
        "itemId": "item-083",
        "name": "Afghani Fish Kabab",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Fish & Prawns Kebabs",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Afghani Fish Kabab marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-084",
        "itemId": "item-084",
        "name": "Prawns Tikka Kabab",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Fish & Prawns Kebabs",
        "diet": "non-veg",
        "price": 280,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Prawns Tikka Kabab marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-085",
        "itemId": "item-085",
        "name": "Malai Prawns Kabab",
        "category": "non-veg-kebabs",
        "categoryName": "Non-Veg Kebabs",
        "subcategory": "Fish & Prawns Kebabs",
        "diet": "non-veg",
        "price": 280,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Juicy, smoky Malai Prawns Kabab marinated in royal tandoori spices and char-grilled over embers.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "veg-curries",
    "name": "Veg Curries",
    "shortName": "Veg Curries",
    "icon": "🥘",
    "image": "/assets/images/tandoor_platter.jpg",
    "description": "Rich, creamy paneer gravies, kaju curries, and traditional spicy mixed vegetable curries.",
    "subcategories": [
      "Paneer Gravies",
      "Kaju & Veg Curries"
    ],
    "items": [
      {
        "id": "item-086",
        "itemId": "item-086",
        "name": "Veg Kolhapuri",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 210,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-087",
        "itemId": "item-087",
        "name": "Aloo Matar",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 180,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-088",
        "itemId": "item-088",
        "name": "Green Peas Masala",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 180,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-089",
        "itemId": "item-089",
        "name": "Mixed Veg Curry",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 200,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-090",
        "itemId": "item-090",
        "name": "Palak Paneer",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Paneer Gravies",
        "diet": "veg",
        "price": 230,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-091",
        "itemId": "item-091",
        "name": "Paneer Butter Masala",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Paneer Gravies",
        "diet": "veg",
        "price": 240,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-092",
        "itemId": "item-092",
        "name": "Mutter Paneer",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Paneer Gravies",
        "diet": "veg",
        "price": 240,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-093",
        "itemId": "item-093",
        "name": "Kaju Paneer",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Paneer Gravies",
        "diet": "veg",
        "price": 250,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-094",
        "itemId": "item-094",
        "name": "Methi Chaman",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-095",
        "itemId": "item-095",
        "name": "Kadai Paneer",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Paneer Gravies",
        "diet": "veg",
        "price": 230,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-096",
        "itemId": "item-096",
        "name": "Mushroom Curry",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 200,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-097",
        "itemId": "item-097",
        "name": "Paneer Tikka Masala",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Paneer Gravies",
        "diet": "veg",
        "price": 230,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-098",
        "itemId": "item-098",
        "name": "Tawa Veg Curry",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 180,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-099",
        "itemId": "item-099",
        "name": "Kaju Tomato Curry",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 180,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-100",
        "itemId": "item-100",
        "name": "Baby Corn Curry",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 240,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-101",
        "itemId": "item-101",
        "name": "Kaju Baby Corn Curry",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 250,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-102",
        "itemId": "item-102",
        "name": "Kadai Mushroom",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Kaju & Veg Curries",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-103",
        "itemId": "item-103",
        "name": "Paneer Curry",
        "category": "veg-curries",
        "categoryName": "Veg Curries",
        "subcategory": "Paneer Gravies",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Rich and creamy gravy prepared with aromatic whole spices, tomatoes, cashews, and fresh herbs.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "non-veg-curries",
    "name": "Non-Veg Curries",
    "shortName": "Non-Veg Curries",
    "icon": "🍛",
    "image": "/assets/images/tandoor_platter.jpg",
    "description": "Slow-simmered Mutton Rogan Josh, Butter Chicken, and aromatic Rayalaseema gravies.",
    "subcategories": [
      "Mutton Curries",
      "Chicken Curries"
    ],
    "items": [
      {
        "id": "item-104",
        "itemId": "item-104",
        "name": "Mutton Rogan Josh",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Mutton Curries",
        "diet": "non-veg",
        "price": 320,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-105",
        "itemId": "item-105",
        "name": "Mutton Hyderabadi",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Mutton Curries",
        "diet": "non-veg",
        "price": 320,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-106",
        "itemId": "item-106",
        "name": "Mutton Curry",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Mutton Curries",
        "diet": "non-veg",
        "price": 320,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-107",
        "itemId": "item-107",
        "name": "Chicken Mohali",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-108",
        "itemId": "item-108",
        "name": "Chicken Methi Chaman",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 270,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-109",
        "itemId": "item-109",
        "name": "Chicken Tikka Masala",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-110",
        "itemId": "item-110",
        "name": "Chicken Chettinadu",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-111",
        "itemId": "item-111",
        "name": "Butter Chicken",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-112",
        "itemId": "item-112",
        "name": "Kadai Chicken",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-113",
        "itemId": "item-113",
        "name": "Chicken Curry",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-114",
        "itemId": "item-114",
        "name": "Chicken Bone Curry",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 240,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-115",
        "itemId": "item-115",
        "name": "Chicken Boneless Curry",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-116",
        "itemId": "item-116",
        "name": "Kaju Nut Chilly",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-117",
        "itemId": "item-117",
        "name": "Kalmili Masala Half",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-118",
        "itemId": "item-118",
        "name": "Kalmili Masala Full",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 450,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-119",
        "itemId": "item-119",
        "name": "Chicken Chatpata",
        "category": "non-veg-curries",
        "categoryName": "Non-Veg Curries",
        "subcategory": "Chicken Curries",
        "diet": "non-veg",
        "price": 260,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Slow-simmered traditional curry infused with hand-ground spices, onions, and rich flavorful gravy.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "fried-rice",
    "name": "Wok Fried Rice",
    "shortName": "Fried Rice",
    "icon": "🍚",
    "image": "/assets/images/woodfire_biryani.jpg",
    "description": "Sizzling wok-tossed basmati rice with farm vegetables, chicken, egg, and spicy Schezwan sauce.",
    "subcategories": [
      "Veg Fried Rice",
      "Non-Veg Fried Rice"
    ],
    "items": [
      {
        "id": "item-120",
        "itemId": "item-120",
        "name": "Veg Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 150,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-121",
        "itemId": "item-121",
        "name": "Mixed Veg Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 230,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-122",
        "itemId": "item-122",
        "name": "Jeera Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 130,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-123",
        "itemId": "item-123",
        "name": "Schezwan Veg Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 200,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-124",
        "itemId": "item-124",
        "name": "Paneer Kaju Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-125",
        "itemId": "item-125",
        "name": "Egg Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Non-Veg Fried Rice",
        "diet": "egg",
        "price": 160,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-126",
        "itemId": "item-126",
        "name": "Chicken Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Non-Veg Fried Rice",
        "diet": "non-veg",
        "price": 180,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-127",
        "itemId": "item-127",
        "name": "Schezwan Chicken Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Non-Veg Fried Rice",
        "diet": "non-veg",
        "price": 190,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-128",
        "itemId": "item-128",
        "name": "Special Chicken Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Non-Veg Fried Rice",
        "diet": "non-veg",
        "price": 210,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-129",
        "itemId": "item-129",
        "name": "Curd Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 80,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-130",
        "itemId": "item-130",
        "name": "Paneer Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 200,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-131",
        "itemId": "item-131",
        "name": "Gobi Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 180,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-132",
        "itemId": "item-132",
        "name": "Mushroom Fried Rice",
        "category": "fried-rice",
        "categoryName": "Wok Fried Rice",
        "subcategory": "Veg Fried Rice",
        "diet": "veg",
        "price": 180,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Aged long-grain rice wok-tossed over high flames with spring onions, secret sauces, and fresh seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "noodles",
    "name": "Tossed Noodles",
    "shortName": "Noodles",
    "icon": "🥢",
    "image": "/assets/images/rambo_chicken.jpg",
    "description": "Flavorsome wok noodles stir-fried with crunchy vegetables, eggs, and chicken strips.",
    "subcategories": [
      "Veg Noodles",
      "Non-Veg Noodles"
    ],
    "items": [
      {
        "id": "item-133",
        "itemId": "item-133",
        "name": "Veg Noodles",
        "category": "noodles",
        "categoryName": "Tossed Noodles",
        "subcategory": "Veg Noodles",
        "diet": "veg",
        "price": 160,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Silky noodles tossed in roaring wok flames with shredded veggies, dark soy, garlic, and spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-134",
        "itemId": "item-134",
        "name": "Paneer Noodles",
        "category": "noodles",
        "categoryName": "Tossed Noodles",
        "subcategory": "Veg Noodles",
        "diet": "veg",
        "price": 180,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Silky noodles tossed in roaring wok flames with shredded veggies, dark soy, garlic, and spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-135",
        "itemId": "item-135",
        "name": "Egg Noodles",
        "category": "noodles",
        "categoryName": "Tossed Noodles",
        "subcategory": "Non-Veg Noodles",
        "diet": "egg",
        "price": 180,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Silky noodles tossed in roaring wok flames with shredded veggies, dark soy, garlic, and spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-136",
        "itemId": "item-136",
        "name": "Chicken Noodles",
        "category": "noodles",
        "categoryName": "Tossed Noodles",
        "subcategory": "Non-Veg Noodles",
        "diet": "non-veg",
        "price": 200,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Silky noodles tossed in roaring wok flames with shredded veggies, dark soy, garlic, and spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-137",
        "itemId": "item-137",
        "name": "Chicken Schezwan Noodles",
        "category": "noodles",
        "categoryName": "Tossed Noodles",
        "subcategory": "Non-Veg Noodles",
        "diet": "non-veg",
        "price": 210,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Silky noodles tossed in roaring wok flames with shredded veggies, dark soy, garlic, and spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-138",
        "itemId": "item-138",
        "name": "Mixed Non-Veg Noodles",
        "category": "noodles",
        "categoryName": "Tossed Noodles",
        "subcategory": "Veg Noodles",
        "diet": "veg",
        "price": 230,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/rambo_chicken.jpg",
        "description": "Silky noodles tossed in roaring wok flames with shredded veggies, dark soy, garlic, and spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "biryanis",
    "name": "Wood-Fire Biryanis",
    "shortName": "Biryani",
    "icon": "🍲",
    "image": "/assets/images/woodfire_biryani.jpg",
    "description": "Traditional dum-cooked biryanis in earthen pots with aged basmati, saffron, and tender meats.",
    "subcategories": [
      "Chicken Biryanis",
      "Mutton & Seafood",
      "Veg & Egg Biryani"
    ],
    "items": [
      {
        "id": "item-139",
        "itemId": "item-139",
        "name": "Plain Biryani Rice",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Veg & Egg Biryani",
        "diet": "veg",
        "price": 110,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-140",
        "itemId": "item-140",
        "name": "Veg Biryani Rice",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Veg & Egg Biryani",
        "diet": "veg",
        "price": 140,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-141",
        "itemId": "item-141",
        "name": "Egg Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Veg & Egg Biryani",
        "diet": "egg",
        "price": 180,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-142",
        "itemId": "item-142",
        "name": "Chicken Dum Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Chicken Biryanis",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-143",
        "itemId": "item-143",
        "name": "Chicken Fry Piece Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Chicken Biryanis",
        "diet": "non-veg",
        "price": 270,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-144",
        "itemId": "item-144",
        "name": "Special Chicken Biryani (Boneless)",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Chicken Biryanis",
        "diet": "non-veg",
        "price": 280,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-145",
        "itemId": "item-145",
        "name": "Mutton Dum Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Mutton & Seafood",
        "diet": "non-veg",
        "price": 350,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-146",
        "itemId": "item-146",
        "name": "Mutton Fry Piece Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Mutton & Seafood",
        "diet": "non-veg",
        "price": 370,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-147",
        "itemId": "item-147",
        "name": "Tandoori Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Veg & Egg Biryani",
        "diet": "veg",
        "price": 280,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-148",
        "itemId": "item-148",
        "name": "Kalmi Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Veg & Egg Biryani",
        "diet": "veg",
        "price": 280,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-149",
        "itemId": "item-149",
        "name": "Mughlai Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Veg & Egg Biryani",
        "diet": "veg",
        "price": 280,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-150",
        "itemId": "item-150",
        "name": "Prawns Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Mutton & Seafood",
        "diet": "non-veg",
        "price": 320,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-151",
        "itemId": "item-151",
        "name": "Paneer Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Veg & Egg Biryani",
        "diet": "veg",
        "price": 240,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-152",
        "itemId": "item-152",
        "name": "Mushroom Biryani",
        "category": "biryanis",
        "categoryName": "Wood-Fire Biryanis",
        "subcategory": "Veg & Egg Biryani",
        "diet": "veg",
        "price": 220,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Wood-fire slow-cooked dum biryani layered with fragrant aged basmati, saffron, mint, and rich spices.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "pulao",
    "name": "Authentic Pulao",
    "shortName": "Pulao",
    "icon": "🌾",
    "image": "/assets/images/woodfire_biryani.jpg",
    "description": "Rich Andhra and Rayalaseema spiced pulaos finished with roasted cashews and pure desi ghee.",
    "subcategories": [
      "Non-Veg Pulao",
      "Veg Pulao"
    ],
    "items": [
      {
        "id": "item-153",
        "itemId": "item-153",
        "name": "Kaju Nut Pulao",
        "category": "pulao",
        "categoryName": "Authentic Pulao",
        "subcategory": "Veg Pulao",
        "diet": "veg",
        "price": 240,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Fragrant spiced pulao rice cooked in pure ghee with roasted cashews and signature seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-154",
        "itemId": "item-154",
        "name": "Fry Piece Chicken Pulao",
        "category": "pulao",
        "categoryName": "Authentic Pulao",
        "subcategory": "Non-Veg Pulao",
        "diet": "non-veg",
        "price": 250,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Fragrant spiced pulao rice cooked in pure ghee with roasted cashews and signature seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-155",
        "itemId": "item-155",
        "name": "Authentic Andhra Veg Pulao",
        "category": "pulao",
        "categoryName": "Authentic Pulao",
        "subcategory": "Veg Pulao",
        "diet": "veg",
        "price": 280,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Fragrant spiced pulao rice cooked in pure ghee with roasted cashews and signature seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-156",
        "itemId": "item-156",
        "name": "Kashmiri Pulao",
        "category": "pulao",
        "categoryName": "Authentic Pulao",
        "subcategory": "Veg Pulao",
        "diet": "veg",
        "price": 260,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Fragrant spiced pulao rice cooked in pure ghee with roasted cashews and signature seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-157",
        "itemId": "item-157",
        "name": "Chicken Kaju Nut Pulao",
        "category": "pulao",
        "categoryName": "Authentic Pulao",
        "subcategory": "Non-Veg Pulao",
        "diet": "non-veg",
        "price": 270,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Fragrant spiced pulao rice cooked in pure ghee with roasted cashews and signature seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-158",
        "itemId": "item-158",
        "name": "Tandoori Pulao",
        "category": "pulao",
        "categoryName": "Authentic Pulao",
        "subcategory": "Veg Pulao",
        "diet": "veg",
        "price": 260,
        "tags": [
          "veg",
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Fragrant spiced pulao rice cooked in pure ghee with roasted cashews and signature seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-159",
        "itemId": "item-159",
        "name": "Mutton Pulao",
        "category": "pulao",
        "categoryName": "Authentic Pulao",
        "subcategory": "Non-Veg Pulao",
        "diet": "non-veg",
        "price": 320,
        "tags": [
          "must try"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Fragrant spiced pulao rice cooked in pure ghee with roasted cashews and signature seasonings.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "platters",
    "name": "Feast Platters",
    "shortName": "Platters",
    "icon": "🍱",
    "image": "/assets/images/tandoor_platter.jpg",
    "description": "Sumptuous sharing platters combining popular kebabs, starters, dips, and sides.",
    "subcategories": [
      "Non-Veg Platters",
      "Seafood & Mixed Platters"
    ],
    "items": [
      {
        "id": "item-160",
        "itemId": "item-160",
        "name": "Chicken Platter",
        "category": "platters",
        "categoryName": "Feast Platters",
        "subcategory": "Non-Veg Platters",
        "diet": "non-veg",
        "price": 899,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Grand feast platter featuring an assorted selection of signature starters, dips, and chef specialties.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-161",
        "itemId": "item-161",
        "name": "Mutton Platter",
        "category": "platters",
        "categoryName": "Feast Platters",
        "subcategory": "Non-Veg Platters",
        "diet": "non-veg",
        "price": 1199,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Grand feast platter featuring an assorted selection of signature starters, dips, and chef specialties.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-162",
        "itemId": "item-162",
        "name": "Sea Food Platter",
        "category": "platters",
        "categoryName": "Feast Platters",
        "subcategory": "Seafood & Mixed Platters",
        "diet": "non-veg",
        "price": 999,
        "tags": [
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Grand feast platter featuring an assorted selection of signature starters, dips, and chef specialties.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-163",
        "itemId": "item-163",
        "name": "Mixed Platter",
        "category": "platters",
        "categoryName": "Feast Platters",
        "subcategory": "Seafood & Mixed Platters",
        "diet": "veg",
        "price": 999,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/tandoor_platter.jpg",
        "description": "Grand feast platter featuring an assorted selection of signature starters, dips, and chef specialties.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "pot-biryani",
    "name": "Earthen Pot Biryani",
    "shortName": "Pot Biryani",
    "icon": "🏺",
    "image": "/assets/images/woodfire_biryani.jpg",
    "description": "Heritage wood-fire handi biryanis sealed with whole dough and steamed in earthen clay pots.",
    "subcategories": [
      "Signature Handi"
    ],
    "items": [
      {
        "id": "item-164",
        "itemId": "item-164",
        "name": "Chicken Pot Biryani",
        "category": "pot-biryani",
        "categoryName": "Earthen Pot Biryani",
        "subcategory": "Signature Handi",
        "diet": "non-veg",
        "price": 899,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Traditional clay pot biryani cooked with sealed earthen handi dum for unmatched rustic wood-fire aroma.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-165",
        "itemId": "item-165",
        "name": "Mutton Pot Biryani",
        "category": "pot-biryani",
        "categoryName": "Earthen Pot Biryani",
        "subcategory": "Signature Handi",
        "diet": "non-veg",
        "price": 1199,
        "tags": [
          "chef's special",
          "bestseller"
        ],
        "image": "/assets/images/woodfire_biryani.jpg",
        "description": "Traditional clay pot biryani cooked with sealed earthen handi dum for unmatched rustic wood-fire aroma.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  },
  {
    "id": "desserts",
    "name": "Desserts & Sweets",
    "shortName": "Desserts",
    "icon": "🍨",
    "image": "/assets/images/dessert_delight.jpg",
    "description": "Sweet royal treats to conclude your meal, including Double Ka Meetha, Kadhu Ka Kheer, and warm Gulab Jamun.",
    "subcategories": [
      "Royal Sweets"
    ],
    "items": [
      {
        "id": "item-166",
        "itemId": "item-166",
        "name": "Gulab Jamun",
        "category": "desserts",
        "categoryName": "Desserts & Sweets",
        "subcategory": "Royal Sweets",
        "diet": "veg",
        "price": 80,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/dessert_delight.jpg",
        "description": "Decadent sweet royal delicacy prepared with rich milk, ghee, and golden dry fruits.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-167",
        "itemId": "item-167",
        "name": "Double Ka Meeta",
        "category": "desserts",
        "categoryName": "Desserts & Sweets",
        "subcategory": "Royal Sweets",
        "diet": "veg",
        "price": 100,
        "tags": [
          "veg",
          "bestseller"
        ],
        "image": "/assets/images/dessert_delight.jpg",
        "description": "Decadent sweet royal delicacy prepared with rich milk, ghee, and golden dry fruits.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      },
      {
        "id": "item-168",
        "itemId": "item-168",
        "name": "Kadhu Ka Kheer",
        "category": "desserts",
        "categoryName": "Desserts & Sweets",
        "subcategory": "Royal Sweets",
        "diet": "veg",
        "price": 120,
        "tags": [
          "veg",
          "popular"
        ],
        "image": "/assets/images/dessert_delight.jpg",
        "description": "Decadent sweet royal delicacy prepared with rich milk, ghee, and golden dry fruits.",
        "ingredients": "Fresh ingredients, signature spices, herbs, and chef's seasoning.",
        "available": true
      }
    ]
  }
];
