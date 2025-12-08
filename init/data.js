

const sampleListings = [
  {
    title: "Sky-High Penthouse with Infinity Pool",
    description: "Experience luxury at its peak in this breathtaking penthouse featuring a private infinity pool overlooking the city skyline. Perfect for those seeking opulence and panoramic views.",
    image: {
      filename: "penthouse-skyline",
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 4500,
    location: "Singapore",
    country: "Singapore",
  },
  {
    title: "Arctic Glass Igloo Retreat",
    description: "Sleep under the Northern Lights in this heated glass igloo. Witness the Aurora Borealis from the comfort of your warm, cozy bed in the heart of Finnish Lapland.",
    image: {
      filename: "arctic-igloo",
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 3200,
    location: "Rovaniemi",
    country: "Finland",
  },
  {
    title: "Floating Eco-Pod on Amazon River",
    description: "Immerse yourself in the Amazon rainforest from this sustainable floating pod. Wake up to sounds of exotic wildlife and cruise through tributaries with private guides.",
    image: {
      filename: "amazon-float",
      url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 2800,
    location: "Amazon Rainforest",
    country: "Brazil",
  },
  {
    title: "Converted Medieval Castle",
    description: "Live like royalty in this authentically restored 14th-century castle. Complete with original stone walls, secret passages, and a working drawbridge.",
    image: {
      filename: "medieval-castle",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 5200,
    location: "Loire Valley",
    country: "France",
  },
  {
    title: "Minimalist Desert Dome",
    description: "Find tranquility in this geometric concrete dome located in the Joshua Tree desert. Stargaze from the rooftop deck and experience surreal desert sunrises.",
    image: {
      filename: "desert-dome",
      url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 950,
    location: "Joshua Tree",
    country: "United States",
  },
  {
    title: "Traditional Japanese Ryokan",
    description: "Experience authentic Japanese hospitality in this traditional ryokan. Sleep on tatami mats, enjoy kaiseki meals, and relax in natural hot spring onsens.",
    image: {
      filename: "japanese-ryokan",
      url: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1800,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Treehouse Village in Costa Rica",
    description: "Stay in interconnected treehouses suspended 40 feet above the rainforest canopy. Connected by suspension bridges with monkey sightings guaranteed.",
    image: {
      filename: "rainforest-treehouse",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1650,
    location: "Monteverde",
    country: "Costa Rica",
  },
  {
    title: "Converted Lighthouse Cottage",
    description: "Stay in a historic lighthouse keeper's cottage with 360° ocean views. Watch ships pass by from your private perch on dramatic coastal cliffs.",
    image: {
      filename: "lighthouse-cottage",
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1400,
    location: "Cornwall",
    country: "United Kingdom",
  },
  {
    title: "Luxury Safari Tent in Serengeti",
    description: "Experience the wild in comfort with this luxurious glamping tent. Private butler service, outdoor shower, and front-row seats to the Great Migration.",
    image: {
      filename: "safari-tent",
      url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 3800,
    location: "Serengeti",
    country: "Tanzania",
  },
  
  {
    title: "Bamboo Eco Villa in Bali",
    description: "Stay in an architecturally stunning bamboo villa surrounded by rice terraces. Open-air design with natural ventilation and infinity pool overlooking jungle.",
    image: {
      filename: "bamboo-villa",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1900,
    location: "Ubud",
    country: "Indonesia",
  },
  {
    title: "Converted Water Tower Loft",
    description: "Unique circular living in a converted 19th-century water tower. Original industrial features preserved with modern luxury additions and rooftop garden.",
    image: {
      filename: "water-tower",
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 2100,
    location: "Copenhagen",
    country: "Denmark",
  },
  {
    title: "Cliffside Cave House in Santorini",
    description: "Carved into volcanic cliffs, this traditional cave house offers stunning caldera views. Whitewashed interiors with blue accents and private sunset terrace.",
    image: {
      filename: "santorini-cave",
      url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 2700,
    location: "Oia, Santorini",
    country: "Greece",
  },
  {
    title: "Floating Houseboat in Amsterdam",
    description: "Live on the canals in this charming houseboat with modern amenities. Watch boats pass by from your floating deck in the heart of Amsterdam.",
    image: {
      filename: "amsterdam-houseboat",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1600,
    location: "Amsterdam Canals",
    country: "Netherlands",
  },
 
  {
    title: "Rooftop Oasis in Marrakech",
    description: "Traditional riad with stunning rooftop terrace featuring plunge pool, Berber lounge areas, and panoramic views of the Atlas Mountains.",
    image: {
      filename: "marrakech-riad",
      url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1250,
    location: "Medina, Marrakech",
    country: "Morocco",
  },
  {
    title: "Converted Vintage Airstream",
    description: "Retro-chic accommodation in a fully restored 1960s Airstream. Located on a private beach with outdoor shower and fire pit under the stars.",
    image: {
      filename: "vintage-airstream",
      url: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 850,
    location: "Big Sur",
    country: "United States",
  },
  {
    title: "Lakeside Geodesic Dome",
    description: "Modern geodesic dome with transparent ceiling for stargazing. Situated on private lakefront property with kayaks and fishing gear provided.",
    image: {
      filename: "geodesic-dome",
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1350,
    location: "Lake District",
    country: "United Kingdom",
  },
  {
    title: "Heritage Railway Carriage",
    description: "Unique stay in a beautifully restored 1920s railway carriage. Original features maintained with modern comforts, set in peaceful countryside.",
    image: {
      filename: "railway-carriage",
      url: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 950,
    location: "Cotswolds",
    country: "United Kingdom",
  },
  {
    title: "Modern Cliff House in Norway",
    description: "Architectural masterpiece cantilevered over Norwegian fjords. Floor-to-ceiling glass walls, heated outdoor pool, and private boat dock.",
    image: {
      filename: "norway-cliff-house",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 4200,
    location: "Geirangerfjord",
    country: "Norway",
  },
  {
    title: "Tropical Overwater Bungalow",
    description: "Classic overwater bungalow with glass floor panels for marine viewing. Direct ladder access to coral gardens and private deck for sunrise yoga.",
    image: {
      filename: "overwater-bungalow",
      url: "https://images.unsplash.com/photo-1516496636080-14fb876e029d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 3100,
    location: "Bora Bora",
    country: "French Polynesia",
  },
  {
    title: "Converted Chapel in Tuscany",
    description: "Stay in a beautifully converted 16th-century chapel. Original frescoes preserved with modern Italian design and vineyard views.",
    image: {
      filename: "tuscan-chapel",
      url: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 2400,
    location: "Chianti Region",
    country: "Italy",
  },
  {
    title: "Desert Adobe Casita",
    description: "Authentic adobe house in New Mexican desert. Traditional construction keeps interiors cool, with outdoor courtyard for stargazing around fire pit.",
    image: {
      filename: "desert-adobe",
      url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1100,
    location: "Santa Fe",
    country: "United States",
  },
  {
    title: "Floating Eco-Cabin in Sweden",
    description: "Self-sustainable cabin floating on remote lake. Solar powered, composting toilet, and rowboat for exploring untouched wilderness.",
    image: {
      filename: "floating-cabin",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1250,
    location: "Swedish Archipelago",
    country: "Sweden",
  },
  {
    title: "Historic Windmill Stay",
    description: "Unique accommodation in converted 18th-century Dutch windmill. Original machinery preserved, with circular living spaces and countryside views.",
    image: {
      filename: "dutch-windmill",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1650,
    location: "Kinderdijk",
    country: "Netherlands",
  },
  {
    title: "Mountain Observatory Retreat",
    description: "Stay in a former astronomical observatory converted to luxury accommodation. Professional telescope included for unparalleled stargazing.",
    image: {
      filename: "observatory-retreat",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 2900,
    location: "Atacama Desert",
    country: "Chile",
  },
  {
    title: "Traditional Mongolian Ger",
    description: "Authentic Mongolian ger (yurt) on the steppes. Experience nomadic lifestyle with modern comforts, horseback riding, and traditional meals.",
    image: {
      filename: "mongolian-ger",
      url: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 850,
    location: "Gobi Desert",
    country: "Mongolia",
  },
  {
    title: "Luxury Train Car Suite",
    description: "Orient Express-style luxury on stationary train car. Original 1920s features with modern amenities, private chef, and butler service.",
    image: {
      filename: "luxury-train-suite",
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 3800,
    location: "Venice Simplon",
    country: "Italy",
  },{
    title: "Floating River Cabin in Norway",
    description: "A minimalist wooden cabin suspended over a crystal-clear river in the Norwegian fjords. Perfect for fishing, meditation, and connecting with nature.",
    image: {
      filename: "norway-river-cabin",
      url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1850,
    location: "Sognefjord",
    country: "Norway",
  },
  {
    title: "Desert Star Observatory",
    description: "An architect-designed observatory in Arizona's dark sky preserve. Professional telescopes, heated outdoor seating, and astronomer-led night tours included.",
    image: {
      filename: "desert-observatory",
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 2200,
    location: "Sedona",
    country: "United States",
  },
  {
    title: "Traditional Thai Stilt House",
    description: "Authentic teak stilt house over a tranquil klong (canal) in rural Thailand. Experience local village life with modern comforts and private longtail boat.",
    image: {
      filename: "thai-stilt-house",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 950,
    location: "Ayutthaya",
    country: "Thailand",
  },
  {
    title: "Converted Grain Silo Apartment",
    description: "Industrial-chic accommodation in a converted 1920s grain silo. Circular living spaces, original machinery features, and panoramic rural views.",
    image: {
      filename: "grain-silo-apartment",
      url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1350,
    location: "Kansas Plains",
    country: "United States",
  },
  {
    title: "Cliffside Monastery Retreat",
    description: "Stay in a restored 15th-century monastery carved into cliff faces. Meditation gardens, ancient frescoes, and breathtaking valley views.",
    image: {
      filename: "cliff-monastery",
      url: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1750,
    location: "Meteora",
    country: "Greece",
  },
  {
    title: "Floating Solar-Powered Eco Home",
    description: "Sustainable floating home powered entirely by solar energy. Located on a peaceful lake with wildlife observation deck and electric boat.",
    image: {
      filename: "floating-eco-home",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1650,
    location: "Lake Constance",
    country: "Germany",
  },
  {
    title: "Traditional Icelandic Turf House",
    description: "Authentic reconstruction of Viking-era turf house with modern insulation. Geothermal hot tub, Northern Lights alerts, and volcanic landscape views.",
    image: {
      filename: "icelandic-turf-house",
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    price: 1950,
    location: "Þingvellir",
    country: "Iceland",
  },
];

module.exports = { data: sampleListings };