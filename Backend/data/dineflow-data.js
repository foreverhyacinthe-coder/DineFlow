export const images = {
  burger:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
  chicken:
    "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?auto=format&fit=crop&w=1200&q=80",
  restaurant:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
  diningRoom:
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80",
  lounge:
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
  kitchen:
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
  map:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80",
};

export const overview = {
  stats: [
    {
      label: "Daily revenue",
      value: "$14,842.00",
      delta: "+12.5%",
      icon: "wallet",
      tone: "mint",
    },
    {
      label: "Total orders",
      value: "318",
      delta: "+42 new",
      icon: "cart",
      tone: "sky",
    },
    {
      label: "Customer growth",
      value: "2,491",
      delta: "+8%",
      icon: "trend",
      tone: "amber",
    },
    {
      label: "Table occupancy",
      value: "84%",
      delta: "Peak",
      icon: "table",
      tone: "green",
    },
  ],
  chart: {
    revenue: [18, 24, 34, 47, 56, 60, 58, 48, 34, 29, 42, 68],
    orders: [12, 16, 22, 30, 38, 43, 41, 26, 22, 30, 42, 53],
    labels: ["08:00", "12:00", "16:00", "20:00", "00:00"],
  },
  activity: [
    {
      title: "New Order #4829",
      meta: "Table 12 - 4 guests - $124.50",
      time: "2 minutes ago",
      icon: "utensils",
      tone: "mint",
    },
    {
      title: "VIP Guest Arrived",
      meta: "Mr. Julian Thompson - Regular",
      time: "8 minutes ago",
      icon: "star",
      tone: "amber",
    },
    {
      title: "Inventory Alert",
      meta: "Sea bass stock reaching critical",
      time: "24 minutes ago",
      icon: "alert",
      tone: "rose",
    },
    {
      title: "Check Completed",
      meta: "Table 04 settled their bill",
      time: "45 minutes ago",
      icon: "check",
      tone: "sky",
    },
  ],
};

export const menuItems = [
  {
    id: "truffle-burger",
    name: "Truffle Wagyu Burger",
    shortName: "Signature Truffle Burger",
    category: "Mains",
    price: 32,
    margin: 64,
    orders: 842,
    satisfaction: 92,
    rating: 4.9,
    status: "In Stock",
    description:
      "Aged wagyu beef, black truffle aioli, aged cheddar, and brioche.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "quinoa-bowl",
    name: "Quinoa Power Bowl",
    shortName: "Salmon Zen Bowl",
    category: "Mains",
    price: 18.5,
    margin: 41,
    orders: 448,
    satisfaction: 86,
    rating: 4.8,
    status: "In Stock",
    description:
      "Tri-color quinoa, roasted chickpeas, avocado, greens, and citrus tahini.",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "garlic-crab",
    name: "Garlic King Crab",
    category: "Appetizers",
    price: 45,
    margin: 38,
    orders: 164,
    satisfaction: 79,
    rating: 4.5,
    status: "Out of Stock",
    description:
      "Wild-caught Alaskan king crab legs with smoked garlic butter.",
    image:
      "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "miso-salmon",
    name: "Miso Glazed Salmon",
    shortName: "Pan-Seared Salmon",
    category: "Mains",
    price: 29,
    margin: 58,
    orders: 715,
    satisfaction: 88,
    rating: 4.8,
    status: "In Stock",
    description: "Atlantic salmon, sweet miso glaze, asparagus, and sesame.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "margherita",
    name: "Garden Margherita",
    category: "Mains",
    price: 16,
    margin: 52,
    orders: 512,
    satisfaction: 91,
    rating: 4.7,
    status: "In Stock",
    description:
      "San Marzano tomatoes, buffalo mozzarella, basil, and olive oil.",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ribeye",
    name: "Signature Ribeye",
    category: "Mains",
    price: 58,
    margin: 61,
    orders: 642,
    satisfaction: 95,
    rating: 4.9,
    status: "In Stock",
    description: "Charred ribeye, pepper jus, whipped potatoes, and herbs.",
    image:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "gnocchi",
    name: "Black Truffle Gnocchi",
    category: "Mains",
    price: 32,
    margin: 69,
    orders: 520,
    satisfaction: 94,
    rating: 5,
    status: "In Stock",
    description:
      "Handmade potato gnocchi, clarified butter, pecorino, and shaved truffle.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "lava-cake",
    name: "Matcha Lava Cake",
    category: "Desserts",
    price: 18,
    margin: 55,
    orders: 326,
    satisfaction: 89,
    rating: 4.7,
    status: "In Stock",
    description:
      "Molten Uji matcha center, white chocolate soil, and berry coulis.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80",
  },
];

export const operations = {
  tabs: ["All (12)", "Preparing (8)", "Ready (4)"],
  tickets: [
    {
      table: "14",
      state: "Preparing",
      tone: "orange",
      items: [
        ["2x Truffle Risotto", "Grill"],
        ["1x Wagyu Steak", "Saute"],
      ],
      elapsed: "14m",
      action: "View Ticket",
    },
    {
      table: "08",
      state: "Ready",
      tone: "mint",
      items: [
        ["4x Garden Salad", "Prep"],
        ["1x Lobster Bisque", "Saute"],
      ],
      elapsed: "06m",
      action: "Serve Now",
      featured: true,
    },
    {
      table: "22",
      state: "Preparing",
      tone: "orange",
      items: [
        ["1x Duck Confit", "Grill"],
        ["2x Caesar Salad", "Prep"],
      ],
      elapsed: "06m",
      action: "View Ticket",
    },
    {
      table: "02",
      state: "Overdue",
      tone: "rose",
      items: [["3x Burger Deluxe", "Grill"]],
      elapsed: "28m",
      action: "Expedite",
    },
    {
      table: "31",
      state: "Preparing",
      tone: "orange",
      items: [["2x Pasta Carbonara", "Saute"]],
      elapsed: "02m",
      action: "View Ticket",
    },
    {
      table: "19",
      state: "Preparing",
      tone: "orange",
      items: [["1x Salmon Fillet", "Grill"]],
      elapsed: "08m",
      action: "View Ticket",
    },
  ],
  stations: [
    ["Grill Station", 82],
    ["Saute Station", 45],
    ["Prep Station", 15],
  ],
};

export const kitchenBoard = [
  {
    title: "Received",
    icon: "inbox",
    count: "04",
    tickets: [
      {
        id: "#4012",
        table: "Table 08",
        time: "2m ago",
        items: ["2x Wagyu Burger", "1x Truffle Fries"],
        note: "Medium",
        action: "Start Prep",
      },
      {
        id: "#4015",
        table: "Table 12",
        time: "5m ago",
        items: ["1x Lobster Risotto", "1x Caesar Salad"],
        note: "No anchovies",
        action: "Start Prep",
      },
    ],
  },
  {
    title: "Prep",
    icon: "utensils",
    count: "03",
    tickets: [
      {
        id: "#3998",
        table: "Table 02",
        time: "04:12",
        items: ["3x Ribeye Steak"],
        note: "Rare / medium-rare",
        chef: "Chef Marco",
        action: "Start Cooking",
        active: true,
      },
    ],
  },
  {
    title: "Cooking",
    icon: "flame",
    count: "05",
    tickets: [
      {
        id: "#3985",
        table: "Table 21",
        time: "12:55",
        items: ["4x Roasted Salmon", "2x Duck Confit"],
        chef: "Chef Sarah",
        action: "Mark Ready",
        danger: true,
      },
      {
        id: "#3992",
        table: "Table 15",
        time: "08:20",
        items: ["1x Tomahawk Steak"],
        note: "Rush",
        chef: "Chef Leo",
        action: "Mark Ready",
      },
    ],
  },
  {
    title: "Ready",
    icon: "check",
    count: "02",
    tickets: [
      {
        id: "#3980",
        table: "Table 05",
        time: "Completed",
        items: ["2x Sea Bass Papillote", "1x Garden Greens"],
        note: "Picked up by James",
        complete: true,
      },
    ],
  },
];

export const analytics = {
  stats: [
    ["Total revenue", "$42,850", "+12.4%"],
    ["Net orders", "1,142", "-2.1%"],
    ["Avg ticket", "$37.52", "+5.8%"],
    ["Retention", "64%", "+1.2%"],
  ],
  velocity: [12, 18, 27, 31, 29, 40, 55, 57],
  popularity: [
    ["Pan-Seared Scallops", 32],
    ["Truffle Linguine", 24],
    ["Aged Ribeye", 18],
    ["Roasted Branzino", 15],
  ],
  loyalty: [
    ["Alexander Mitchell", "Premium Member", "$1,240.00", "24 Visits", "High Value"],
    ["Sarah Chen", "Regular Member", "$890.50", "18 Visits", "At Risk"],
    ["Jordan Lee", "New Member", "$320.00", "4 Visits", "Rising Star"],
  ],
};

export const staff = {
  stats: [
    ["Total staff", "24", "+2 New", "mint"],
    ["Active shifts", "12", "Peak Time", "amber"],
    ["Avg performance", "94%", "+4%", "green"],
    ["Pending requests", "03", "Urgent", "rose"],
  ],
  roster: [
    ["Marcus Villalobos", "Executive Chef", "On Duty", "Active: Order #204", 98],
    ["Elena Smith", "Sous Chef", "Off Duty", "Checked out 4h ago", 82],
    ["Julian Chen", "Waitstaff Lead", "On Duty", "Table 12: Checkout", 95],
  ],
};

export const billing = {
  tier: "Pro Management",
  renewal: "Oct 24, 2024",
  amount: "$299.00 / month",
  invoices: [
    ["#DF-2024-0082", "Sep 24, 2024", "$299.00", "Paid"],
    ["#DF-2024-0081", "Aug 24, 2024", "$299.00", "Paid"],
    ["#DF-2024-0080", "Jul 24, 2024", "$345.50", "Paid"],
  ],
};

export const reservations = {
  upcoming: [
    ["19:00", "Alexandre Dubois", "4 People", "T-12", "Main Hall"],
    ["19:15", "Elena Rossi", "2 People", "T-04", "Terrace"],
    ["19:30", "Marcus Sterling", "6 People", "T-25", "VIP - Window"],
    ["20:00", "Sarah Connor", "4 People", "T-18", "Main Hall"],
  ],
  tables: [
    { id: "01", x: 8, y: 10, seats: 4, status: "occupied" },
    { id: "04", x: 35, y: 11, seats: 2, status: "reserved" },
    { id: "12", x: 64, y: 33, seats: 4, status: "reserved" },
    { id: "08", x: 23, y: 56, seats: 2, status: "available" },
    { id: "25", x: 78, y: 76, seats: 6, status: "vip" },
  ],
};

export const publicMenu = {
  cart: [
    ["Tuna Carpaccio", 1, "$24.00"],
    ["Truffle Gnocchi", 2, "$64.00"],
  ],
  restaurants: [
    {
      name: "Essence Moderne",
      meta: "French Fusion - $$$$",
      rating: "4.9",
      image: images.restaurant,
    },
    {
      name: "Sushi Zen Omakase",
      meta: "Kyoto-style tasting experience",
      rating: "4.8",
      image:
        "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Emerald Lounge",
      meta: "Cocktails & Tapas - 0.4 mi",
      rating: "4.8",
      image: images.lounge,
    },
    {
      name: "Botanica Kitchen",
      meta: "Organic & Vegan - 0.8 mi",
      rating: "4.6",
      image:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Terra Grill",
      meta: "Mediterranean - 1.2 mi",
      rating: "4.9",
      image:
        "https://images.unsplash.com/photo-1592861956120-e524fc739696?auto=format&fit=crop&w=900&q=80",
    },
  ],
};
