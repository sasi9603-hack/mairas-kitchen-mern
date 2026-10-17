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
    id: "biryanis",
    name: "Wood-Fire Biryanis",
    shortName: "Biryani",
    icon: "🍲",
    image: "/assets/images/woodfire_biryani.jpg",
    description: "Cooked the heritage way over slow wood-fire embers in sealed earthen handis with aged basmati and fragrant saffron.",
    subcategories: ["Handi Dum", "Chef Specials", "Vegetarian"],
    items: [
      {
        id: "biry-01",
        name: "Maira's Special Wood-Fire Biryani",
        category: "biryanis",
        subcategory: "Chef Specials",
        diet: "non-veg",
        price: 340,
        tags: ["chef's special", "bestseller"],
        image: "/assets/images/woodfire_biryani.jpg",
        description: "Our crown jewel. Tender farm chicken slow-dummed in sealed clay pots with 2-year aged basmati, saffron, aromatic ghee, and roasted cashews. Served with thick Mirchi ka Salan and cucumber raita.",
        ingredients: "Aged long basmati rice, tender chicken pieces, wood-fire charcoal dum, saffron milk, whole spices, mint, fried shallots."
      },
      {
        id: "biry-02",
        name: "Royal Chicken Dum Biryani",
        category: "biryanis",
        subcategory: "Handi Dum",
        diet: "non-veg",
        price: 290,
        tags: ["bestseller"],
        image: "/assets/images/woodfire_biryani.jpg",
        description: "Authentic Hyderabadi dum biryani with marinated succulent chicken layered between fragrant spiced rice, boiled egg, and crispy golden onions.",
        ingredients: "Bone-in chicken, spiced yogurt marinade, basmati rice, mint, coriander, boiled egg, fried onion garnish."
      },
      {
        id: "biry-03",
        name: "Earthen Pot Mutton Dum Biryani",
        category: "biryanis",
        subcategory: "Handi Dum",
        diet: "non-veg",
        price: 390,
        tags: ["must try"],
        image: "/assets/images/woodfire_biryani.jpg",
        description: "Melt-in-mouth tender cuts of young mutton marinated in hand-ground garam masala and slow cooked over charcoal embers.",
        ingredients: "Young mutton cuts, hand-pounded spices, curd, saffron, fragrant basmati, clarified butter (desi ghee)."
      },
      {
        id: "biry-04",
        name: "Coastal Spiced Prawns Biryani",
        category: "biryanis",
        subcategory: "Chef Specials",
        diet: "non-veg",
        price: 360,
        tags: ["chef's special"],
        image: "/assets/images/woodfire_biryani.jpg",
        description: "Fresh coastal prawns tossed in a fiery shallot-pepper masala, then gently dum-layered with saffron rice.",
        ingredients: "Butterflied prawns, black pepper, curry leaf infusion, basmati rice, caramelized onions."
      },
      {
        id: "biry-05",
        name: "Kaju Chicken Fry Piece Biryani",
        category: "biryanis",
        subcategory: "Handi Dum",
        diet: "non-veg",
        price: 330,
        tags: ["bestseller"],
        image: "/assets/images/woodfire_biryani.jpg",
        description: "Crisp dry-spiced chicken fry pieces topped with roasted whole cashews over aromatic flavored biryani rice.",
        ingredients: "Chicken fry pieces, golden cashews, curry leaves, flavored spiced biryani rice."
      },
      {
        id: "biry-06",
        name: "Shahi Paneer & Mushroom Dum Biryani",
        category: "biryanis",
        subcategory: "Vegetarian",
        diet: "veg",
        price: 260,
        tags: ["veg"],
        image: "/assets/images/woodfire_biryani.jpg",
        description: "Soft malai paneer cubes and button mushrooms marinated in rich tandoori curd masala and slow-steamed in a clay handi.",
        ingredients: "Fresh paneer, button mushrooms, green peas, whole spices, saffron-infused long grain rice."
      }
    ]
  },
  {
    id: "starters",
    name: "Signature Starters",
    shortName: "Starters",
    icon: "🍗",
    image: "/assets/images/rambo_chicken.jpg",
    description: "Crispy, fiery, and wok-tossed appetizers loaded with bold Rayalaseema heat and garlic crunch.",
    subcategories: ["Signature Crisp", "Seafood & Fish", "Veg Appetizers"],
    items: [
      {
        id: "start-01",
        name: "Maira's Signature Rambo Chicken",
        category: "starters",
        subcategory: "Signature Crisp",
        diet: "non-veg",
        price: 320,
        tags: ["chef's special", "bestseller", "must try"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "The pride of Maira's Kitchen. Extra-crispy chicken morsels glazed in an addictively sweet-and-spicy chili sauce, loaded with crunchy roasted cashews and aromatic flash-fried curry leaves.",
        ingredients: "Boneless chicken, secret chili glaze, whole roasted cashews, crispy curry leaves, sesame, lime."
      },
      {
        id: "start-02",
        name: "Crunchy Crispy Chicken Wings",
        category: "starters",
        subcategory: "Signature Crisp",
        diet: "non-veg",
        price: 290,
        tags: ["bestseller"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Golden crumbed wings, ultra crispy on the outside and juicy on the bone. Served with house garlic mayo and spicy dip.",
        ingredients: "Chicken wings, double-dusted seasoned crust, house garlic emulsion, pickled onion."
      },
      {
        id: "start-03",
        name: "Andhra Chilli Chicken (Bone/Boneless)",
        category: "starters",
        subcategory: "Signature Crisp",
        diet: "non-veg",
        price: 280,
        tags: ["must try"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Authentic spicy green chili chicken sautéed with slit green chilies, crushed garlic, and curry leaves.",
        ingredients: "Chicken bites, bird's eye chilies, shallots, garlic, cracked pepper, coriander."
      },
      {
        id: "start-04",
        name: "Apollo Fish Masala",
        category: "starters",
        subcategory: "Seafood & Fish",
        diet: "non-veg",
        price: 350,
        tags: ["chef's special"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Tender boneless fish fillets crisped and tossed in a creamy yogurt, curry leaf, and green chili tempered gravy.",
        ingredients: "Fresh boneless fish fillets, tempered curd reduction, green chilies, ginger-garlic paste."
      },
      {
        id: "start-05",
        name: "Garlic Butter Pepper Prawns",
        category: "starters",
        subcategory: "Seafood & Fish",
        diet: "non-veg",
        price: 380,
        tags: ["must try"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Juicy jumbo prawns flash-sautéed in farm butter, minced roasted garlic, crushed Tellicherry black pepper and herbs.",
        ingredients: "Cleaned sea prawns, salted butter, roasted golden garlic, crushed black pepper, fresh parsley."
      },
      {
        id: "start-06",
        name: "Crispy Sweet Corn Salt & Pepper",
        category: "starters",
        subcategory: "Veg Appetizers",
        diet: "veg",
        price: 220,
        tags: ["bestseller", "veg"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Crunchy batter-fried tender sweet corn kernels tossed with diced bell peppers, spring onions, and white pepper.",
        ingredients: "Golden sweet corn, bell pepper confetti, spring onion greens, toasted peppercorns."
      },
      {
        id: "start-07",
        name: "Paneer Majestic",
        category: "starters",
        subcategory: "Veg Appetizers",
        diet: "veg",
        price: 260,
        tags: ["veg"],
        image: "/assets/images/tandoor_platter.jpg",
        description: "Crispy fried paneer batons tossed in a rich yogurt sauce with mint, garlic, and cracked cumin.",
        ingredients: "Cottage cheese strips, spiced curd coating, fresh mint, green chili ribbons."
      }
    ]
  },
  {
    id: "tandoor",
    name: "Tandoor & Kebabs",
    shortName: "Tandoor",
    icon: "🍢",
    image: "/assets/images/tandoor_platter.jpg",
    description: "Charred to smoky perfection in our authentic earthen clay oven over glowing coals.",
    subcategories: ["Clay Oven Kebabs", "Tandoori Platters", "Vegetarian Tandoor"],
    items: [
      {
        id: "tand-01",
        name: "Murgh Malai Tikka",
        category: "tandoor",
        subcategory: "Clay Oven Kebabs",
        diet: "non-veg",
        price: 330,
        tags: ["chef's special", "bestseller"],
        image: "/assets/images/tandoor_platter.jpg",
        description: "Silky boneless chicken chunks marinated in rich malai cream, cashew paste, green cardamom, and mild cheese, charred to buttery tenderness.",
        ingredients: "Boneless chicken thighs, fresh clotted cream, cashew butter, green cardamom, roasted cumin."
      },
      {
        id: "tand-02",
        name: "Charcoal Tandoori Chicken (Half / Full)",
        category: "tandoor",
        subcategory: "Clay Oven Kebabs",
        diet: "non-veg",
        price: 280,
        tags: ["bestseller"],
        image: "/assets/images/tandoor_platter.jpg",
        description: "Whole spring chicken soaked in Kashmiri chili mustard oil marinade and slow-roasted on skewers in the tandoor. Served with mint chutney.",
        ingredients: "Spring chicken, Kashmiri degi mirch, mustard oil, hung curd, ginger-garlic, chaat masala."
      },
      {
        id: "tand-03",
        name: "Juicy Tangdi Kebab (3 Pcs)",
        category: "tandoor",
        subcategory: "Clay Oven Kebabs",
        diet: "non-veg",
        price: 320,
        tags: ["must try"],
        image: "/assets/images/tandoor_platter.jpg",
        description: "Chicken drumsticks stuffed with spiced cheese and minced herbs, roasted until crispy-skinned and smoky.",
        ingredients: "Chicken drumsticks, herb-cheese stuffing, hung curd marinade, lemon juice."
      },
      {
        id: "tand-04",
        name: "Paneer Tikka Shashlik",
        category: "tandoor",
        subcategory: "Vegetarian Tandoor",
        diet: "veg",
        price: 270,
        tags: ["veg", "bestseller"],
        image: "/assets/images/tandoor_platter.jpg",
        description: "Plump cubes of fresh malai paneer, crunchy capsicum, and sweet onions skewered and roasted with ajwain.",
        ingredients: "Malai paneer, three bell peppers, red onion petals, ajwain carom seeds, spicy tandoori rub."
      },
      {
        id: "tand-05",
        name: "Maira's Grand Kebab Platter",
        category: "tandoor",
        subcategory: "Tandoori Platters",
        diet: "non-veg",
        price: 650,
        tags: ["chef's special"],
        image: "/assets/images/tandoor_platter.jpg",
        description: "The ultimate gathering platter: 2 pcs Tandoori Chicken, 4 pcs Murgh Malai Tikka, 2 Tangdi Kebabs, and 4 pcs Paneer Tikka with butter naan strips and 2 dips.",
        ingredients: "Chef's assortment of house kebabs, butter naans, spicy green dip, pickled onions."
      }
    ]
  },
  {
    id: "chinese",
    name: "Indo-Chinese & Wok",
    shortName: "Chinese",
    icon: "🥢",
    image: "/assets/images/rambo_chicken.jpg",
    description: "Fiery wok-tossed staples seasoned with garlic, dark soy, and house chili pastes.",
    subcategories: ["Wok Fried Rice", "Tossed Noodles", "Saucy Gravies"],
    items: [
      {
        id: "chin-01",
        name: "Dragon Chicken Indo-Fusion",
        category: "chinese",
        subcategory: "Saucy Gravies",
        diet: "non-veg",
        price: 310,
        tags: ["must try"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Crispy chicken strips tossed in spicy chili paste, honey, toasted sesame, bell peppers, and cashew halves.",
        ingredients: "Chicken strips, dark soy, chili paste, honey glaze, cashews, scallions."
      },
      {
        id: "chin-02",
        name: "Schezwan Chicken Fried Rice",
        category: "chinese",
        subcategory: "Wok Fried Rice",
        diet: "non-veg",
        price: 240,
        tags: ["bestseller"],
        image: "/assets/images/woodfire_biryani.jpg",
        description: "Aged long-grain rice tossed on roaring wok flames with shredded chicken, scrambled eggs, and fiery Schezwan chili paste.",
        ingredients: "Steamed rice, chicken cubes, egg ribbons, Schezwan paste, celery, spring onion."
      },
      {
        id: "chin-03",
        name: "Special Chicken Hakka Noodles",
        category: "chinese",
        subcategory: "Tossed Noodles",
        diet: "non-veg",
        price: 230,
        tags: ["bestseller"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Silky wheat noodles tossed with shredded chicken, crunchy carrots, cabbage, capsicum, and garlic-soy sauce.",
        ingredients: "Egg wheat noodles, julienned veggies, roasted garlic, light soy, sesame oil."
      },
      {
        id: "chin-04",
        name: "Veg Schezwan Fried Rice & Manchurian",
        category: "chinese",
        subcategory: "Wok Fried Rice",
        diet: "veg",
        price: 210,
        tags: ["veg"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Wok-fried vegetable rice paired with crispy mixed vegetable dumplings in savory coriander garlic gravy.",
        ingredients: "Finely diced garden veggies, rice, soy-ginger glaze, vegetable dumplings."
      }
    ]
  },
  {
    id: "continental",
    name: "Continental & Fast Bites",
    shortName: "Bistro Bites",
    icon: "🍔",
    image: "/assets/images/rambo_chicken.jpg",
    description: "Artisan burgers, thin-crust wood-fired pizzas, loaded fries and creamy pastas for cafe lovers.",
    subcategories: ["Burgers & Sandwiches", "Pizzas & Pasta", "Loaded Sides"],
    items: [
      {
        id: "cont-01",
        name: "Maira's Signature Smash Burger",
        category: "continental",
        subcategory: "Burgers & Sandwiches",
        diet: "non-veg",
        price: 260,
        tags: ["bestseller", "must try"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Grilled juicy seasoned chicken patty layered with double cheddar, caramelized onions, crisp lettuce, gherkins and secret bistro sauce in a toasted brioche bun.",
        ingredients: "Toasted brioche, seasoned patty, sharp cheddar, caramelized onions, house burger spread."
      },
      {
        id: "cont-02",
        name: "Smoked BBQ Chicken Pizza (10\")",
        category: "continental",
        subcategory: "Pizzas & Pasta",
        diet: "non-veg",
        price: 380,
        tags: ["chef's special"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Crispy stone-baked base loaded with smoky BBQ chicken, red onions, spicy jalapeños, and generous molten mozzarella cheese.",
        ingredients: "Hand-stretched dough, San Marzano tomato sauce, barbecue chicken chunks, mozzarella, jalapeños."
      },
      {
        id: "cont-03",
        name: "Creamy Alfredo Chicken Penne",
        category: "continental",
        subcategory: "Pizzas & Pasta",
        diet: "non-veg",
        price: 290,
        tags: ["bestseller"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Al dente penne pasta bathed in velvety garlic parmesan cream sauce, tossed with herb-grilled chicken and cracked pepper.",
        ingredients: "Penne pasta, fresh dairy cream, aged parmesan, roasted garlic, butter, grilled chicken."
      },
      {
        id: "cont-04",
        name: "Crispy Peri-Peri Loaded Fries",
        category: "continental",
        subcategory: "Loaded Sides",
        diet: "veg",
        price: 160,
        tags: ["veg", "bestseller"],
        image: "/assets/images/rambo_chicken.jpg",
        description: "Skin-on golden fries shaken in zesty African peri-peri seasoning and drizzled with warm cheese sauce and jalapeño bits.",
        ingredients: "Golden potato fries, peri-peri spice dust, molten cheese sauce, sliced jalapeños."
      }
    ]
  },
  {
    id: "beverages",
    name: "Mocktails & Coolers",
    shortName: "Drinks",
    icon: "🍹",
    image: "/assets/images/mojito_cooler.jpg",
    description: "Crafted sodas, ice-cold fruit coolers, signature thick milkshakes, and hot earthen kulhad brews.",
    subcategories: ["Craft Mocktails", "Thick Shakes", "Hot Teas & Coffees"],
    items: [
      {
        id: "bev-01",
        name: "Passion Fruit & Mint Sparkler",
        category: "beverages",
        subcategory: "Craft Mocktails",
        diet: "veg",
        price: 160,
        tags: ["bestseller", "must try"],
        image: "/assets/images/mojito_cooler.jpg",
        description: "Tangy tropical passion fruit pulp muddled with crushed garden mint, fresh lime slices, and sparkling fizz over shaved ice.",
        ingredients: "Natural passion fruit pulp, fresh mint leaves, lime wheels, club soda, raw cane syrup."
      },
      {
        id: "bev-02",
        name: "Oceanic Blue Lagoon Mojito",
        category: "beverages",
        subcategory: "Craft Mocktails",
        diet: "veg",
        price: 150,
        tags: ["bestseller"],
        image: "/assets/images/mojito_cooler.jpg",
        description: "Vibrant blue citrus cooler muddled with lime cordial, refreshing spearmint, and fizz. The ultimate heat buster.",
        ingredients: "Blue curacao syrup, lime juice, fresh garden mint, cracked ice, lemon-lime soda."
      },
      {
        id: "bev-03",
        name: "Belgian Chocolate Mud Shake",
        category: "beverages",
        subcategory: "Thick Shakes",
        diet: "veg",
        price: 180,
        tags: ["must try"],
        image: "/assets/images/mojito_cooler.jpg",
        description: "Heavy decadent shake whipped with rich Belgian chocolate, whole milk, chocolate fudge drizzle, and brownie crumb crown.",
        ingredients: "Belgian dark chocolate ganache, creamy whole milk, vanilla gelato, chocolate curls."
      },
      {
        id: "bev-04",
        name: "Masala Kulhad Chai",
        category: "beverages",
        subcategory: "Hot Teas & Coffees",
        diet: "veg",
        price: 50,
        tags: ["veg"],
        image: "/assets/images/mojito_cooler.jpg",
        description: "Traditional slow-brewed tea infused with crushed ginger, green cardamom, and cloves, poured hot in an earthen terracotta kulhad.",
        ingredients: "Assam black tea leaves, crushed fresh ginger, green cardamom, full-cream milk, terracotta kulhad."
      }
    ]
  },
  {
    id: "desserts",
    name: "Artisan Desserts",
    shortName: "Desserts",
    icon: "🍨",
    image: "/assets/images/dessert_delight.jpg",
    description: "Sweet indulgence to wrap up the feast — featuring royal Hyderabadi puddings and sizzling iron bakes.",
    subcategories: ["Royal Specials", "Sizzling Bakes"],
    items: [
      {
        id: "des-01",
        name: "Royal Apricot Delight (Khubani Treat)",
        category: "desserts",
        subcategory: "Royal Specials",
        diet: "veg",
        price: 180,
        tags: ["chef's special", "bestseller", "must try"],
        image: "/assets/images/dessert_delight.jpg",
        description: "A Hyderabadi icon: stewed sweet Turkish apricots layered over soft vanilla sponge, smothered in rich clotted cream and slivered Iranian pistachios.",
        ingredients: "Stewed dried apricots (Khubani), vanilla sponge cake, fresh sweetened malai cream, pistachios."
      },
      {
        id: "des-02",
        name: "Sizzling Iron Skillet Brownie",
        category: "desserts",
        subcategory: "Sizzling Bakes",
        diet: "veg",
        price: 220,
        tags: ["bestseller"],
        image: "/assets/images/dessert_delight.jpg",
        description: "Warm roasted walnut fudge brownie brought sizzling on a smoking iron cast skillet, crowned with creamy vanilla bean gelato and warm chocolate fudge.",
        ingredients: "Dark chocolate brownie, roasted walnuts, vanilla gelato scoop, molten Belgian chocolate sauce."
      },
      {
        id: "des-03",
        name: "Traditional Shahi Matka Kulfi",
        category: "desserts",
        subcategory: "Royal Specials",
        diet: "veg",
        price: 120,
        tags: ["veg"],
        image: "/assets/images/dessert_delight.jpg",
        description: "Dense, slow-cooked whole milk kulfi infused with saffron strands and roasted almonds, served frozen in an artisan mini pot.",
        ingredients: "Slow-reduced rabdi milk, saffron stigmas, almond flakes, green cardamom, terracotta pot."
      }
    ]
  }
];
