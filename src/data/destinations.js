
export const destinations = [
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Asia",
    mood: ["discover", "recharge"],
    tagline: "Where ancient traditions meet quiet moments.",
    description:
      "A city of temples, tea houses, cherry blossoms, and timeless streets.",

    highlights: [
      {
        name: "Fushimi Inari Shrine",
        description:
          "Walk beneath thousands of vermilion torii gates at Kyoto's iconic shrine.",
        image:
          "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Gion",
        description:
          "Explore Kyoto's historic district of wooden machiya houses and traditional streets.",
        image:
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Arashiyama Bamboo Grove",
        description:
          "Wander through the peaceful bamboo paths of scenic Arashiyama.",
        image:
          "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80",
      },
    ],

    bestTime: "March – May, October – November",
    idealFor: "Culture lovers & slow travellers",

    image:"https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=85",

    coordinates: {
      lat: 35.0116,
      lon: 135.7681,
    },
  },

  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    mood: ["escape", "recharge"],
    tagline: "Slow down and let the island set the pace.",
    description:
      "A tropical escape of rice terraces, temples, beaches, and soulful sunsets.",

    highlights: [
      {
        name: "Tegallalang Rice Terraces",
        description:
          "Take in Bali's famous layered rice fields surrounded by lush tropical landscapes.",
        image:
          "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Uluwatu Temple",
        description:
          "Visit the dramatic cliffside temple overlooking Bali's Indian Ocean coastline.",
        image:
          "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Kuta Beach",
        description:
          "Relax by the ocean and experience Bali's famous sunset atmosphere.",
        image:
          "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=900&q=80",
      },
    ],

    bestTime: "April – October",
    idealFor: "Beach lovers & wellness seekers",

    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",

    coordinates: {
      lat: -8.3405,
      lon: 115.092,
    },
  },

  {
    id: "iceland",
    name: "Iceland",
    country: "Iceland",
    region: "Europe",
    mood: ["wander", "escape"],
    tagline: "A land where nature feels beautifully unreal.",
    description:
      "Waterfalls, glaciers, volcanoes, and landscapes made for wandering.",

    highlights: [
      {
        name: "Skógafoss",
        description:
          "Stand before one of Iceland's most spectacular waterfalls along the southern coast.",
        image:
          "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Jökulsárlón Glacier Lagoon",
        description:
          "See floating icebergs drifting across Iceland's remarkable glacier lagoon.",
        image:
          "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Northern Lights",
        description:
          "Watch the aurora illuminate Iceland's dark winter skies.",
        image:
          "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=900&q=80",
      },
    ],

    bestTime: "June – August",
    idealFor: "Nature lovers & adventure seekers",

    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",

    coordinates: {
      lat: 64.9631,
      lon: -19.0208,
    },
  },

  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    region: "Asia",
    mood: ["discover", "wander"],
    tagline: "A city painted in stories, colour, and history.",
    description:
      "Royal palaces, ancient forts, vibrant markets, and unforgettable architecture.",

    highlights: [
      {
        name: "Amber Fort",
        description:
          "Explore the grand hilltop fort known for its artistic architecture and royal history.",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Hawa Mahal",
        description:
          "Admire Jaipur's iconic Palace of Winds with its distinctive honeycomb façade.",
        image:
          "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Johari Bazaar",
        description:
          "Discover colourful streets filled with jewellery, textiles, handicrafts, and local life.",
        image:
          "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80",
      },
    ],

    bestTime: "October – March",
    idealFor: "History lovers & cultural explorers",

    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85",

    coordinates: {
      lat: 26.9124,
      lon: 75.7873,
    },
  },

  {
    id: "kerala",
    name: "Kerala",
    country: "India",
    region: "Asia",
    mood: ["escape", "recharge"],
    tagline: "Where nature moves at its own peaceful rhythm.",
    description:
      "Backwaters, lush landscapes, misty hills, and peaceful coastal experiences.",

    highlights: [
      {
        name: "Alleppey Backwaters",
        description:
          "Cruise through Kerala's peaceful network of palm-lined canals and waterways.",
        image:
          "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Munnar",
        description:
          "Escape into misty hills, tea plantations, and cool mountain landscapes.",
        image:
          "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Varkala Beach",
        description:
          "Relax along Kerala's dramatic cliffside coastline and golden beach.",
        image:
          "https://images.unsplash.com/photo-1677216713977-50421d083abf?auto=format&fit=crop&w=900&q=80",
      },
    ],

    bestTime: "September – March",
    idealFor: "Slow travellers & nature lovers",

    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=85",

    coordinates: {
      lat: 10.8505,
      lon: 76.2711,
    },
  },

  {
    id: "switzerland",
    name: "Switzerland",
    country: "Switzerland",
    region: "Europe",
    mood: ["wander", "recharge"],
    tagline: "Wake up where every direction feels like a postcard.",
    description:
      "Alpine villages, dramatic peaks, clear lakes, and unforgettable train journeys.",

    highlights: [
      {
        name: "Interlaken",
        description:
          "Explore the scenic gateway between two lakes surrounded by dramatic Alpine peaks.",
        image:
          "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Jungfraujoch",
        description:
          "Travel high into the Alps for spectacular mountain and glacier views.",
        image:
          "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Lake Lucerne",
        description:
          "Enjoy clear alpine waters surrounded by picturesque mountains and villages.",
        image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
      },
    ],

    bestTime: "June – September",
    idealFor: "Mountain lovers & scenic travellers",

    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85",

    coordinates: {
      lat: 46.8182,
      lon: 8.2275,
    },
  },
];

