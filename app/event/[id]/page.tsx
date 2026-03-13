"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Calendar, MapPin, Users, Star, Phone, Mail, Clock, 
  Building2, Check, Wifi, Car, Shield, Zap, Wind, Volume2,
  ChevronLeft, Share2, Heart, Loader2
} from "lucide-react"
import { LoginModal } from "@/components/login-modal"

interface EventData {
  id: string
  title: string
  venue: string
  city: string
  address: string
  date: string
  timing: string
  type: string
  totalStalls: number
  availableStalls: number
  featured: boolean
  organizer: {
    name: string
    phone: string
    email: string
  }
  description: string
  stallPricing: Array<{ type: string; size: string; price: string; available: number }>
  categories: string[]
  facilities: string[]
  expectedVisitors: string
  lastYearVisitors: string
  highlights: string[]
}

// Mock event data
const mockEventData: EventData = {
  id: 1,
  title: "A Luxury Wedding Exhibition",
  venue: "Hyatt Regency, Bhikaji Cama Palace",
  city: "New Delhi",
  address: "Ring Road, Bhikaji Cama Place, New Delhi - 110066",
  date: "March 15-17, 2026",
  timing: "10:00 AM - 8:00 PM",
  type: "Wedding & Lifestyle",
  totalStalls: 120,
  availableStalls: 45,
  featured: true,
  organizer: {
    name: "Elite Events India",
    phone: "+91-9876543210",
    email: "info@eliteevents.in",
  },
  description: `Experience the grandeur of our Luxury Wedding Exhibition at Hyatt Regency, New Delhi. This premium 3-day event brings together the finest wedding vendors, designers, and service providers under one roof.

Whether you're planning a traditional Indian wedding, a destination celebration, or a contemporary ceremony, you'll find everything you need at this exclusive exhibition. From bridal couture and jewelry to wedding planners, caterers, and decorators - discover the best in the business.

The exhibition features curated displays, live demonstrations, and exclusive offers for attendees. Meet face-to-face with top vendors and get personalized consultations for your special day.`,
  stallPricing: [
    { type: "Open Table", size: "6x6 ft", price: "15,000", available: 20 },
    { type: "Canopy Stall", size: "9x9 ft", price: "25,000", available: 15 },
    { type: "Premium Shell", size: "12x12 ft", price: "40,000", available: 10 },
  ],
  categories: ["Bridal Wear", "Jewelry", "Wedding Planners", "Catering", "Photography", "Decorators", "Makeup Artists", "Entertainment"],
  facilities: ["Electricity", "WiFi", "Parking", "Security", "Air Conditioning", "Sound System"],
  expectedVisitors: "5000+",
  lastYearVisitors: "4200",
  highlights: [
    "3 Days of Wedding Shopping",
    "100+ Premium Brands",
    "Live Fashion Shows",
    "Exclusive Discounts",
    "Free Entry for Visitors",
  ],
}

const facilityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Electricity": Zap,
  "WiFi": Wifi,
  "Parking": Car,
  "Security": Shield,
  "Air Conditioning": Wind,
  "Sound System": Volume2,
}

function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  return `${months[startDate.getMonth()]} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`
}

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [selectedStall, setSelectedStall] = useState<string | null>(null)
  const [event, setEvent] = useState<EventData>(mockEventData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${id}`)
        const data = await res.json()
        if (data.success) {
          const e = data.data
          setEvent({
            id: e.id,
            title: e.name,
            venue: e.venue,
            city: e.city,
            address: e.venueAddress,
            date: formatDateRange(e.startDate, e.endDate),
            timing: "10:00 AM - 8:00 PM",
            type: e.eventType,
            totalStalls: e.totalStalls,
            availableStalls: e.availableStalls,
            featured: e.featured,
            organizer: {
              name: e.organizerName,
              phone: `+91-${e.organizerMobile}`,
              email: e.organizerEmail || "info@bookastall.in",
            },
            description: e.description || mockEventData.description,
            stallPricing: e.stallModels?.map((sm: { type: string; size: string; price: number; available: number }) => ({
              type: sm.type.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
              size: sm.size,
              price: sm.price.toLocaleString(),
              available: sm.available,
            })) || mockEventData.stallPricing,
            categories: e.categories || mockEventData.categories,
            facilities: e.facilities || mockEventData.facilities,
            expectedVisitors: e.expectedVisitors?.toLocaleString() || mockEventData.expectedVisitors,
            lastYearVisitors: mockEventData.lastYearVisitors,
            highlights: mockEventData.highlights,
          })
        }
      } catch (error) {
        console.error("Failed to fetch event:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  const handleBookStall = (stallType: string) => {
    setSelectedStall(stallType)
    setLoginModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        {/* Hero Section */}
        <section className="bg-primary">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
              <Link href="/" className="hover:text-primary-foreground">Home</Link>
              <span>/</span>
              <Link href={`/city/${event.city.toLowerCase().replace(" ", "-")}`} className="hover:text-primary-foreground">
                {event.city}
              </Link>
              <span>/</span>
              <span className="text-primary-foreground">{event.title}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Event Image */}
              <div className="lg:w-1/2">
                <div className="relative aspect-video bg-primary-foreground/10 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-20 w-20 mx-auto bg-primary-foreground/20 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="h-10 w-10 text-primary-foreground" />
                      </div>
                      <span className="text-primary-foreground/80">{event.type}</span>
                    </div>
                  </div>
                  {event.featured && (
                    <Badge className="absolute top-4 left-4 bg-accent text-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Featured Event
                    </Badge>
                  )}
                </div>
              </div>

              {/* Event Info */}
              <div className="lg:w-1/2 text-primary-foreground">
                <h1 className="text-2xl md:text-4xl font-bold mb-4 text-balance">
                  {event.title}
                </h1>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 flex-shrink-0" />
                    <span>{event.timing}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 flex-shrink-0" />
                    <span>{event.availableStalls} of {event.totalStalls} Stalls Available</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Button size="lg" className="bg-card text-foreground hover:bg-card/90">
                    Book Your Stall
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Organizer
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start mb-6 bg-card">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="stalls">Stall Options</TabsTrigger>
                    <TabsTrigger value="facilities">Facilities</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>About This Exhibition</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Event Highlights</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {event.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Check className="h-5 w-5 text-primary flex-shrink-0" />
                              <span className="text-foreground">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Categories Allowed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {event.categories.map((category) => (
                            <Badge key={category} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="stalls" className="space-y-4">
                    {event.stallPricing.map((stall, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 p-6 bg-primary/5 flex flex-col justify-center">
                            <Building2 className="h-10 w-10 text-primary mb-2" />
                            <h3 className="font-semibold text-lg text-foreground">{stall.type}</h3>
                            <p className="text-sm text-muted-foreground">Size: {stall.size}</p>
                          </div>
                          <CardContent className="flex-1 p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div>
                                <div className="text-2xl font-bold text-primary mb-1">
                                  Rs. {stall.price}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {stall.available} stalls available
                                </p>
                              </div>
                              <Button 
                                onClick={() => handleBookStall(stall.type)}
                                disabled={stall.available === 0}
                              >
                                {stall.available > 0 ? "Book This Stall" : "Sold Out"}
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="facilities">
                    <Card>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {event.facilities.map((facility) => {
                            const Icon = facilityIcons[facility] || Check
                            return (
                              <div key={facility} className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-foreground">{facility}</span>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="contact">
                    <Card>
                      <CardHeader>
                        <CardTitle>Organizer Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{event.organizer.name}</div>
                            <div className="text-sm text-muted-foreground">Event Organizer</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">Phone</div>
                              <a href={`tel:${event.organizer.phone}`} className="text-foreground hover:text-primary">
                                {event.organizer.phone}
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <div>
                              <div className="text-sm text-muted-foreground">Email</div>
                              <a href={`mailto:${event.organizer.email}`} className="text-foreground hover:text-primary">
                                {event.organizer.email}
                              </a>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full md:w-auto mt-4">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Now
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:w-1/3 space-y-6">
                {/* Quick Book */}
                <Card>
                  <CardHeader>
                    <CardTitle>Book Your Stall</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {event.availableStalls}
                      </div>
                      <div className="text-sm text-muted-foreground">Stalls Available</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Starting from <span className="text-xl font-bold text-foreground">Rs. 15,000</span>
                    </div>
                    <Button className="w-full" size="lg" onClick={() => setLoginModalOpen(true)}>
                      Book Now
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Book now and pay later. Free cancellation up to 7 days before event.
                    </p>
                  </CardContent>
                </Card>

                {/* Venue Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Venue Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-foreground">{event.venue}</div>
                          <div className="text-sm text-muted-foreground">{event.address}</div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View on Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Expected Footfall</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-foreground">{event.expectedVisitors}</div>
                        <div className="text-xs text-muted-foreground">Expected Visitors</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-foreground">{event.lastYearVisitors}</div>
                        <div className="text-xs text-muted-foreground">Last Year</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </div>
  )
}
