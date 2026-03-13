export interface User {
  id: string
  mobile: string
  name: string
  email?: string
  role: "visitor" | "exhibitor" | "organizer" | "admin"
  createdAt: Date
  updatedAt: Date
}

export interface City {
  id: string
  name: string
  slug: string
  state: string
  eventCount: number
  image?: string
  isPopular: boolean
}

export interface Event {
  id: string
  name: string
  slug: string
  description: string
  cityId: string
  city: string
  venue: string
  venueAddress: string
  venueType: "indoor" | "outdoor" | "both"
  eventType: string
  startDate: Date
  endDate: Date
  totalStalls: number
  availableStalls: number
  stallModels: StallModel[]
  categories: string[]
  facilities: string[]
  posterUrl?: string
  floorPlanUrl?: string
  expectedVisitors: number
  organizerId: string
  organizerName: string
  organizerMobile: string
  organizerEmail?: string
  status: "draft" | "pending" | "approved" | "rejected" | "completed"
  featured: boolean
  trending: boolean
  createdAt: Date
  updatedAt: Date
}

export interface StallModel {
  id: string
  type: "open_table" | "canopy" | "octanorm" | "shell_scheme" | "custom"
  name: string
  size: string
  price: number
  available: number
  amenities: string[]
}

export interface Booking {
  id: string
  eventId: string
  userId: string
  stallModelId: string
  stallNumber?: string
  quantity: number
  totalAmount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  paymentStatus: "pending" | "paid" | "refunded"
  paymentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Enquiry {
  id: string
  eventId?: string
  name: string
  email: string
  mobile: string
  message: string
  type: "general" | "event" | "stall" | "organizer"
  status: "new" | "contacted" | "resolved"
  createdAt: Date
}

export interface OTP {
  id: string
  mobile: string
  code: string
  expiresAt: Date
  verified: boolean
  createdAt: Date
}

export type EventFilters = {
  city?: string
  eventType?: string
  dateFrom?: Date
  dateTo?: Date
  minPrice?: number
  maxPrice?: number
  categories?: string[]
}
