import type { City, Event, User, Booking, Enquiry, StallModel } from "./types"

// Mock Cities Data
export const cities: City[] = [
  { id: "1", name: "Hyderabad", slug: "hyderabad", state: "Telangana", eventCount: 45, isPopular: true },
  { id: "2", name: "Bangalore", slug: "bangalore", state: "Karnataka", eventCount: 62, isPopular: true },
  { id: "3", name: "Mumbai", slug: "mumbai", state: "Maharashtra", eventCount: 78, isPopular: true },
  { id: "4", name: "Delhi", slug: "delhi", state: "Delhi", eventCount: 55, isPopular: true },
  { id: "5", name: "Chennai", slug: "chennai", state: "Tamil Nadu", eventCount: 38, isPopular: true },
  { id: "6", name: "Pune", slug: "pune", state: "Maharashtra", eventCount: 42, isPopular: true },
  { id: "7", name: "Kolkata", slug: "kolkata", state: "West Bengal", eventCount: 35, isPopular: true },
  { id: "8", name: "Ahmedabad", slug: "ahmedabad", state: "Gujarat", eventCount: 48, isPopular: true },
  { id: "9", name: "Jaipur", slug: "jaipur", state: "Rajasthan", eventCount: 25, isPopular: false },
  { id: "10", name: "Lucknow", slug: "lucknow", state: "Uttar Pradesh", eventCount: 18, isPopular: false },
  { id: "11", name: "Kochi", slug: "kochi", state: "Kerala", eventCount: 22, isPopular: false },
  { id: "12", name: "Chandigarh", slug: "chandigarh", state: "Punjab", eventCount: 15, isPopular: false },
  { id: "13", name: "Indore", slug: "indore", state: "Madhya Pradesh", eventCount: 20, isPopular: false },
  { id: "14", name: "Nagpur", slug: "nagpur", state: "Maharashtra", eventCount: 16, isPopular: false },
  { id: "15", name: "Coimbatore", slug: "coimbatore", state: "Tamil Nadu", eventCount: 14, isPopular: false },
  { id: "16", name: "Vizag", slug: "vizag", state: "Andhra Pradesh", eventCount: 12, isPopular: false },
]

// Stall Models Template
const createStallModels = (basePrice: number): StallModel[] => [
  {
    id: "sm1",
    type: "open_table",
    name: "Open Table",
    size: "3x3 ft",
    price: basePrice,
    available: 20,
    amenities: ["Table", "2 Chairs", "Power Socket"],
  },
  {
    id: "sm2",
    type: "canopy",
    name: "Canopy Stall",
    size: "6x6 ft",
    price: basePrice * 2,
    available: 15,
    amenities: ["Canopy Tent", "Table", "2 Chairs", "Power Socket", "Light"],
  },
  {
    id: "sm3",
    type: "octanorm",
    name: "Octanorm Stall",
    size: "9x9 ft",
    price: basePrice * 3.5,
    available: 10,
    amenities: ["Octanorm Structure", "Fascia Board", "Table", "3 Chairs", "Power Socket", "Spot Lights", "Carpet"],
  },
  {
    id: "sm4",
    type: "shell_scheme",
    name: "Shell Scheme",
    size: "12x12 ft",
    price: basePrice * 5,
    available: 5,
    amenities: ["Shell Scheme Booth", "Fascia Board", "Counter", "4 Chairs", "Power Socket", "Spot Lights", "Carpet", "Storage"],
  },
]

// Mock Events Data
export const events: Event[] = [
  {
    id: "evt1",
    name: "Hyderabad Lifestyle Expo 2026",
    slug: "hyderabad-lifestyle-expo-2026",
    description: "The biggest lifestyle exhibition in Hyderabad featuring fashion, jewelry, home decor, and more. Over 200 exhibitors showcasing premium products from across India.",
    cityId: "1",
    city: "Hyderabad",
    venue: "HITEX Exhibition Center",
    venueAddress: "Trade Fair Office Building, Izzat Nagar, Hyderabad, Telangana 500084",
    venueType: "indoor",
    eventType: "Lifestyle Exhibition",
    startDate: new Date("2026-03-20"),
    endDate: new Date("2026-03-23"),
    totalStalls: 200,
    availableStalls: 45,
    stallModels: createStallModels(5000),
    categories: ["Apparels", "Jewelry", "Home Decor", "Handicrafts", "Beauty", "Food"],
    facilities: ["AC Hall", "Parking", "WiFi", "Food Court", "Security", "Housekeeping"],
    expectedVisitors: 50000,
    organizerId: "org1",
    organizerName: "EventsGram Exhibitions",
    organizerMobile: "9876543210",
    organizerEmail: "info@eventsgram.in",
    status: "approved",
    featured: true,
    trending: true,
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
  },
  {
    id: "evt2",
    name: "Bangalore Fashion & Lifestyle Fair",
    slug: "bangalore-fashion-lifestyle-fair",
    description: "A premium fashion and lifestyle exhibition showcasing the latest trends in clothing, accessories, and lifestyle products.",
    cityId: "2",
    city: "Bangalore",
    venue: "Bangalore International Exhibition Centre",
    venueAddress: "10th Mile, Tumkur Road, Madavara Post, Bangalore 562162",
    venueType: "indoor",
    eventType: "Fashion Exhibition",
    startDate: new Date("2026-03-25"),
    endDate: new Date("2026-03-28"),
    totalStalls: 150,
    availableStalls: 32,
    stallModels: createStallModels(6000),
    categories: ["Apparels", "Fashion Accessories", "Footwear", "Jewelry", "Beauty"],
    facilities: ["AC Hall", "Parking", "WiFi", "Food Court", "Security"],
    expectedVisitors: 40000,
    organizerId: "org2",
    organizerName: "Prestige Exhibitions",
    organizerMobile: "9876543211",
    status: "approved",
    featured: true,
    trending: false,
    createdAt: new Date("2026-01-20"),
    updatedAt: new Date("2026-01-20"),
  },
  {
    id: "evt3",
    name: "Mumbai Wedding & Festive Exhibition",
    slug: "mumbai-wedding-festive-exhibition",
    description: "India's largest wedding and festive exhibition featuring bridal wear, jewelry, trousseau, and wedding services.",
    cityId: "3",
    city: "Mumbai",
    venue: "Bombay Exhibition Centre",
    venueAddress: "NSE Complex, Goregaon East, Mumbai 400063",
    venueType: "indoor",
    eventType: "Wedding Exhibition",
    startDate: new Date("2026-04-01"),
    endDate: new Date("2026-04-05"),
    totalStalls: 300,
    availableStalls: 78,
    stallModels: createStallModels(8000),
    categories: ["Bridal Wear", "Jewelry", "Wedding Services", "Trousseau", "Gifts"],
    facilities: ["AC Hall", "VIP Lounge", "Parking", "WiFi", "Food Court", "Security", "Housekeeping"],
    expectedVisitors: 75000,
    organizerId: "org3",
    organizerName: "Grand Events Mumbai",
    organizerMobile: "9876543212",
    status: "approved",
    featured: true,
    trending: true,
    createdAt: new Date("2026-01-25"),
    updatedAt: new Date("2026-01-25"),
  },
  {
    id: "evt4",
    name: "Delhi Home & Garden Expo",
    slug: "delhi-home-garden-expo",
    description: "Explore innovative home decor, furniture, gardening solutions, and smart home technologies at this premier expo.",
    cityId: "4",
    city: "Delhi",
    venue: "Pragati Maidan",
    venueAddress: "Pragati Maidan, New Delhi 110001",
    venueType: "both",
    eventType: "Home Expo",
    startDate: new Date("2026-04-10"),
    endDate: new Date("2026-04-13"),
    totalStalls: 250,
    availableStalls: 95,
    stallModels: createStallModels(7000),
    categories: ["Furniture", "Home Decor", "Garden", "Smart Home", "Kitchen"],
    facilities: ["AC Hall", "Outdoor Space", "Parking", "WiFi", "Food Court", "Security"],
    expectedVisitors: 60000,
    organizerId: "org4",
    organizerName: "Delhi Expo Group",
    organizerMobile: "9876543213",
    status: "approved",
    featured: false,
    trending: true,
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-02-01"),
  },
  {
    id: "evt5",
    name: "Chennai Handicrafts & Art Fair",
    slug: "chennai-handicrafts-art-fair",
    description: "Celebrate Indian craftsmanship with traditional handicrafts, artwork, and artisanal products from across the country.",
    cityId: "5",
    city: "Chennai",
    venue: "Chennai Trade Centre",
    venueAddress: "Nandambakkam, Chennai 600089",
    venueType: "indoor",
    eventType: "Art & Craft Fair",
    startDate: new Date("2026-03-28"),
    endDate: new Date("2026-03-30"),
    totalStalls: 120,
    availableStalls: 28,
    stallModels: createStallModels(4000),
    categories: ["Handicrafts", "Art", "Pottery", "Textiles", "Jewelry"],
    facilities: ["AC Hall", "Parking", "WiFi", "Security"],
    expectedVisitors: 25000,
    organizerId: "org5",
    organizerName: "Tamil Nadu Craft Council",
    organizerMobile: "9876543214",
    status: "approved",
    featured: false,
    trending: false,
    createdAt: new Date("2026-02-05"),
    updatedAt: new Date("2026-02-05"),
  },
  {
    id: "evt6",
    name: "Pune Food & Beverage Expo",
    slug: "pune-food-beverage-expo",
    description: "A culinary extravaganza featuring food brands, beverages, kitchen equipment, and gourmet products.",
    cityId: "6",
    city: "Pune",
    venue: "Pune International Exhibition Centre",
    venueAddress: "Moshi, Pune 412105",
    venueType: "indoor",
    eventType: "Food Expo",
    startDate: new Date("2026-04-15"),
    endDate: new Date("2026-04-17"),
    totalStalls: 180,
    availableStalls: 55,
    stallModels: createStallModels(5500),
    categories: ["Food Products", "Beverages", "Kitchen Equipment", "Bakery", "Organic"],
    facilities: ["AC Hall", "Parking", "WiFi", "Live Demo Area", "Security"],
    expectedVisitors: 35000,
    organizerId: "org6",
    organizerName: "Foodie Events",
    organizerMobile: "9876543215",
    status: "approved",
    featured: true,
    trending: false,
    createdAt: new Date("2026-02-10"),
    updatedAt: new Date("2026-02-10"),
  },
  {
    id: "evt7",
    name: "Kolkata Durga Puja Shopping Fest",
    slug: "kolkata-durga-puja-shopping-fest",
    description: "Get ready for Durga Puja with this mega shopping festival featuring ethnic wear, jewelry, and festive decor.",
    cityId: "7",
    city: "Kolkata",
    venue: "Milan Mela Prangan",
    venueAddress: "Eastern Metropolitan Bypass, Kolkata 700107",
    venueType: "outdoor",
    eventType: "Shopping Festival",
    startDate: new Date("2026-09-20"),
    endDate: new Date("2026-09-28"),
    totalStalls: 350,
    availableStalls: 180,
    stallModels: createStallModels(4500),
    categories: ["Ethnic Wear", "Jewelry", "Home Decor", "Handicrafts", "Food"],
    facilities: ["Open Air", "Parking", "Food Court", "Security", "Stage"],
    expectedVisitors: 100000,
    organizerId: "org7",
    organizerName: "Bengal Events",
    organizerMobile: "9876543216",
    status: "approved",
    featured: true,
    trending: true,
    createdAt: new Date("2026-02-15"),
    updatedAt: new Date("2026-02-15"),
  },
  {
    id: "evt8",
    name: "Ahmedabad Textile & Fashion Week",
    slug: "ahmedabad-textile-fashion-week",
    description: "Gujarat's premier textile and fashion event showcasing traditional and contemporary fabrics and designs.",
    cityId: "8",
    city: "Ahmedabad",
    venue: "Gujarat University Exhibition Hall",
    venueAddress: "Gujarat University, Ahmedabad 380009",
    venueType: "indoor",
    eventType: "Textile Exhibition",
    startDate: new Date("2026-05-01"),
    endDate: new Date("2026-05-04"),
    totalStalls: 200,
    availableStalls: 68,
    stallModels: createStallModels(5000),
    categories: ["Textiles", "Fabrics", "Apparels", "Fashion Accessories"],
    facilities: ["AC Hall", "Parking", "WiFi", "Security", "Buyers Lounge"],
    expectedVisitors: 45000,
    organizerId: "org8",
    organizerName: "Gujarat Textile Association",
    organizerMobile: "9876543217",
    status: "approved",
    featured: false,
    trending: false,
    createdAt: new Date("2026-02-20"),
    updatedAt: new Date("2026-02-20"),
  },
]

// In-memory stores for runtime data
export const users: User[] = []
export const bookings: Booking[] = []
export const enquiries: Enquiry[] = []

// Helper functions
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id)
}

export function getEventsByCity(citySlug: string): Event[] {
  const city = getCityBySlug(citySlug)
  if (!city) return []
  return events.filter((e) => e.cityId === city.id)
}

export function getFeaturedEvents(): Event[] {
  return events.filter((e) => e.featured && e.status === "approved")
}

export function getTrendingEvents(): Event[] {
  return events.filter((e) => e.trending && e.status === "approved")
}

export function getPopularCities(): City[] {
  return cities.filter((c) => c.isPopular)
}

export function searchEvents(query: string): Event[] {
  const lowerQuery = query.toLowerCase()
  return events.filter(
    (e) =>
      e.name.toLowerCase().includes(lowerQuery) ||
      e.city.toLowerCase().includes(lowerQuery) ||
      e.venue.toLowerCase().includes(lowerQuery) ||
      e.categories.some((c) => c.toLowerCase().includes(lowerQuery))
  )
}
