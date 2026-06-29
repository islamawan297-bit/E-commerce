const products = [
  {
    id: "p1",
    name: "AeroSound Max Wireless Headphones",
    category: "audio",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviewsCount: 128,
    featured: true,
    trending: true,
    bestSeller: true,
    newArrival: false,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Experience absolute audio purity with AeroSound Max. Featuring industry-leading Active Noise Cancellation (ANC), spatial audio tracking, and up to 40 hours of battery life, these headphones redefine wireless listening.",
    specs: {
      "Driver Size": "40mm Dynamic",
      "Battery Life": "Up to 40 Hours (ANC On)",
      "Connectivity": "Bluetooth 5.2, AAC, aptX Adaptive",
      "Charging": "USB-C Fast Charging (10 mins = 5 hours)",
      "Weight": "250g"
    },
    reviews: [
      { user: "Sarah K.", rating: 5, comment: "Incredible soundstage and ANC. Better than my Sony and Bose!", date: "2026-05-12" },
      { user: "Marcus T.", rating: 4, comment: "Very comfortable for long sessions, though the bass is slightly heavy out of the box.", date: "2026-06-01" }
    ]
  },
  {
    id: "p2",
    name: "Chronos Premium Smartwatch",
    category: "wearables",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    reviewsCount: 84,
    featured: true,
    trending: false,
    bestSeller: false,
    newArrival: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Chronos blends timeless premium watch design with cutting-edge health tracking. Monitor your heart rate, sleep cycles, blood oxygen levels, and receive smart alerts on a vibrant AMOLED always-on display.",
    specs: {
      "Display": "1.43\" AMOLED Always-On",
      "Water Resistance": "5 ATM (Up to 50m)",
      "Sensors": "Heart Rate, SpO2, Accelerometer, Gyroscope",
      "Battery Life": "Up to 7 days normal usage",
      "Compatibility": "iOS & Android"
    },
    reviews: [
      { user: "David L.", rating: 5, comment: "Beautiful display, battery easily lasts a week. Highly recommended.", date: "2026-04-18" },
      { user: "Elena R.", rating: 4, comment: "Fitness tracking is precise. Standard strap could be slightly softer.", date: "2026-05-22" }
    ]
  },
  {
    id: "p3",
    name: "Minimalist Leather Backpack",
    category: "bags",
    price: 129,
    originalPrice: 159,
    rating: 4.7,
    reviewsCount: 96,
    featured: false,
    trending: true,
    bestSeller: true,
    newArrival: false,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Crafted from top-grain water-resistant leather, this minimalist backpack is designed for the modern commuter. Features a dedicated 16-inch laptop sleeve, hidden security pocket, and padded breathable shoulder straps.",
    specs: {
      "Material": "Top-Grain Cowhide Leather",
      "Capacity": "20 Liters",
      "Laptop Pocket": "Fits up to 16\" MacBook Pro",
      "Dimensions": "42 x 30 x 12 cm",
      "Weight": "0.9 kg"
    },
    reviews: [
      { user: "Jordan M.", rating: 5, comment: "Stunning leather quality. It smells amazing and looks extremely premium.", date: "2026-03-30" },
      { user: "Anna P.", rating: 4, comment: "Fits my laptop and daily notebooks perfectly. I wish it had one more external water bottle pouch.", date: "2026-05-09" }
    ]
  },
  {
    id: "p4",
    name: "Lumina Desk Lamp V2",
    category: "home",
    price: 79,
    originalPrice: 99,
    rating: 4.5,
    reviewsCount: 52,
    featured: false,
    trending: false,
    bestSeller: false,
    newArrival: true,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Elevate your workspace illumination with Lumina. Features adjustable color temperature (2700K - 6500K), eye-friendly flicker-free LED panel, customizable brightness slider, and integrated 10W wireless fast charging base.",
    specs: {
      "Power Consumption": "12W Max",
      "Brightness": "Up to 800 Lumens",
      "Color Temp": "5 Levels (Warm to Cool)",
      "Wireless Charger": "Qi-Certified 10W",
      "Control": "Touch Slider & App Enabled"
    },
    reviews: [
      { user: "Oliver Q.", rating: 4, comment: "Looks incredibly sleek on my desk. Wireless charger works fine with my iPhone.", date: "2026-06-15" }
    ]
  },
  {
    id: "p5",
    name: "Spectra Mechanical Keyboard",
    category: "computer",
    price: 149,
    originalPrice: 179,
    rating: 4.9,
    reviewsCount: 142,
    featured: true,
    trending: true,
    bestSeller: true,
    newArrival: false,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Compact 75% mechanical keyboard with hot-swappable tactile switches, pre-lubed stabilizers, double-shot PBT keycaps, and customizable dynamic RGB lighting backplates. Fully customizable via simple web editor.",
    specs: {
      "Layout": "75% ANSI layout",
      "Switches": "Gateron Brown Tactile (Hot-Swappable)",
      "Keycaps": "Double-shot PBT Cherry Profile",
      "Battery": "4000mAh Lithium Rechargeable",
      "Interface": "USB-C Wired, Bluetooth 5.1, 2.4Ghz Wireless"
    },
    reviews: [
      { user: "Chris B.", rating: 5, comment: "The keystroke sound is deep and clean. Built like a absolute tank.", date: "2026-05-19" },
      { user: "Sophie N.", rating: 5, comment: "Fast response, gorgeous lighting profiles. Extremely satisfied.", date: "2026-06-21" }
    ]
  },
  {
    id: "p6",
    name: "HydroFlask Elite Edition",
    category: "lifestyle",
    price: 39,
    originalPrice: 49,
    rating: 4.4,
    reviewsCount: 210,
    featured: false,
    trending: true,
    bestSeller: false,
    newArrival: false,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1589362492910-c7b714edec6b?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Keep your drinks ice-cold for 24 hours or steaming hot for 12. Double-wall vacuum insulated stainless steel with durable scratch-resistant powder coating and leakproof flexible straw lid.",
    specs: {
      "Capacity": "32 oz (946 ml)",
      "Material": "18/8 Professional-Grade Stainless Steel",
      "Insulation": "TempShield Double-Wall",
      "Coating": "Color Last Powder Coat",
      "BPA Free": "Yes"
    },
    reviews: [
      { user: "Alex F.", rating: 4, comment: "Keeps my iced tea cold all day. The straw is high quality.", date: "2026-06-11" }
    ]
  },
  {
    id: "p7",
    name: "Quantum Soundbar Cinema Pro",
    category: "audio",
    price: 450,
    originalPrice: 599,
    rating: 4.8,
    reviewsCount: 76,
    featured: true,
    trending: false,
    bestSeller: false,
    newArrival: true,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Bring the theater experience home. Dolby Atmos multidimensional sound signature, wireless subwoofer with deep low-end rumble, and simple HDMI eARC connectivity for perfect audio synchronization.",
    specs: {
      "Audio Channels": "5.1.2 Surround System",
      "Total Output": "550W",
      "Subwoofer Connection": "Wireless 8\" Driver",
      "HDR Passthrough": "4K Dolby Vision, HDR10+",
      "Voice Control": "Google Assistant & Alexa Support"
    },
    reviews: [
      { user: "Robert D.", rating: 5, comment: "Sounds bouncing off the ceiling are very noticeable. Room-filling surround!", date: "2026-06-03" }
    ]
  },
  {
    id: "p8",
    name: "Focus Ergonomic Office Chair",
    category: "home",
    price: 349,
    originalPrice: 429,
    rating: 4.7,
    reviewsCount: 115,
    featured: false,
    trending: true,
    bestSeller: true,
    newArrival: false,
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Prevent back fatigue during long workdays. Offers fully adjustable lumbar support, 3D armrests, dynamic mesh backrest for complete ventilation, and synchronous tilt mechanism.",
    specs: {
      "Back Type": "High-Breathability Elastic Mesh",
      "Seat Depth": "Adjustable (Slide Adjustment)",
      "Tilt Mechanism": "Recline with Tension Lock (90° - 135°)",
      "Weight Capacity": "Up to 300 lbs",
      "Base Type": "Aluminum Reinforced Alloy"
    },
    reviews: [
      { user: "Emma W.", rating: 5, comment: "Cured my lower back pain in three days. Highly adjustable.", date: "2026-05-14" }
    ]
  },
  {
    id: "p9",
    name: "Apex Gaming Mouse Pro",
    category: "computer",
    price: 89,
    originalPrice: 109,
    rating: 4.6,
    reviewsCount: 132,
    featured: false,
    trending: false,
    bestSeller: false,
    newArrival: true,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1527690718058-2934b7b7a1e5?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Ultra-lightweight gaming mouse weighing only 58g. Boasts pixel-perfect 26K DPI optical sensor, optical switches rated for 90 million clicks, and lag-free wireless response.",
    specs: {
      "Weight": "58 grams",
      "Sensor Type": "Focus Pro 26K Optical",
      "Switch Lifetime": "90 Million Clicks",
      "Max Speed": "750 IPS",
      "Wireless Tech": "Hyperspeed 2.4Ghz & Bluetooth"
    },
    reviews: [
      { user: "GamerX", rating: 5, comment: "Extremely lightweight and fast response. Sensor tracking is perfect.", date: "2026-06-25" }
    ]
  },
  {
    id: "p10",
    name: "Urban Explorer Trench Coat",
    category: "wearables",
    price: 180,
    originalPrice: 220,
    rating: 4.5,
    reviewsCount: 45,
    featured: false,
    trending: true,
    bestSeller: false,
    newArrival: true,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Stay protected in style. Features windproof and water-resistant nylon shell, tailored modern silhouette, premium zip closure with storm flap, and deep microfleece-lined pockets.",
    specs: {
      "Material": "70% Nylon, 30% Cotton Blend",
      "Waterproofing": "DWR Coating (Durable Water Repellent)",
      "Fit": "Modern Tailored Fit",
      "Pockets": "4 External, 2 Internal Zippered",
      "Care": "Machine wash cold, tumble dry low"
    },
    reviews: [
      { user: "Leo N.", rating: 4, comment: "Very stylish and repels light rain perfectly. Fits a bit slim around the chest.", date: "2026-06-02" }
    ]
  },
  {
    id: "p11",
    name: "Horizon Smart Sunglasses",
    category: "wearables",
    price: 150,
    originalPrice: 199,
    rating: 4.3,
    reviewsCount: 38,
    featured: false,
    trending: false,
    bestSeller: false,
    newArrival: true,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Polarized luxury sunglasses featuring open-ear directional audio speakers, Bluetooth connectivity, and dual noise-reducing microphones for clear hands-free voice calls.",
    specs: {
      "Lens UV Rating": "UV400 (100% UVA/UVB protection)",
      "Speakers": "Open-ear micro-speakers",
      "Battery Life": "Up to 5.5 hours listening time",
      "Frame Material": "TR-90 High-grade nylon polymer",
      "Weight": "45g"
    },
    reviews: [
      { user: "Jordan B.", rating: 4, comment: "Clear audio while keeping my ears open. Polarized lenses are great.", date: "2026-06-20" }
    ]
  },
  {
    id: "p12",
    name: "Nomad Canvas Duffle Bag",
    category: "bags",
    price: 95,
    originalPrice: 120,
    rating: 4.8,
    reviewsCount: 71,
    featured: true,
    trending: false,
    bestSeller: true,
    newArrival: false,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    ],
    description: "The ultimate weekender duffle. Made from rugged waterproof waxed canvas and genuine leather trims, with shoe compartments, organizer pockets, and heavy-duty brass zippers.",
    specs: {
      "Material": "18oz Waxed Cotton Canvas & Full-Grain Leather",
      "Capacity": "45 Liters (Carry-on friendly)",
      "Hardware": "Heavy-duty Solid Brass",
      "Shoe Pocket": "Dedicated side zippered pocket",
      "Strap": "Detachable padded canvas shoulder strap"
    },
    reviews: [
      { user: "Clara S.", rating: 5, comment: "Fabulous quality. Took it on a weekend flight and it easily fits in the overhead bin.", date: "2026-05-30" }
    ]
  }
];

// Export to window scope so other scripts can access it easily
window.products = products;
