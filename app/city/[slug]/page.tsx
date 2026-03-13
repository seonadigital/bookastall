"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar, MapPin, Users, Star, Search, Grid, List, Loader2 } from "lucide-react"
import type { Event } from "@/lib/types"

interface ApiEvent {
  id: string
  name: string
  venue: string
  startDate: string
  endDate: string
  eventType: string
  availableStalls: number
  featured: boolean
  stallModels: Array<{ price: number }>
}

// Fallback mock data for display
const mockEvents = [
  {
    id: "mock1",
    title: "A Luxury Wedding Exhibition",
    venue: "Hyatt Regency",
    date: "Mar 15-17, 2026",
    type: "Wedding & Lifestyle",
    stalls: 120,
    featured: true,
    price: "15,000",
  },
  {
    id: "mock2",
    title: "Premium Fashion & Lifestyle Exhibition",
    venue: "Taj Hotel",
    date: "Mar 20-22, 2026",
    type: "Fashion & Lifestyle",
    stalls: 85,
    featured: true,
    price: "12,000",
  },
  {
    id: "mock3",
    title: "Spring Edit - Fashion Exhibition",
    venue: "ITC Grand",
    date: "Mar 25-27, 2026",
    type: "Fashion",
    stalls: 60,
    featured: false,
    price: "10,000",
  },
  {
    id: "mock4",
    title: "Handicrafts & Artisan Fair",
    venue: "HITEX Convention Center",
    date: "Apr 1-3, 2026",
    type: "Handicrafts",
    stalls: 150,
    featured: false,
    price: "8,000",
  },
  {
    id: "mock5",
    title: "Food & Lifestyle Festival",
    venue: "Westin Hotel",
    date: "Apr 5-7, 2026",
    type: "Food & Lifestyle",
    stalls: 100,
    featured: true,
    price: "18,000",
  },
  {
    id: "mock6",
    title: "Summer Fashion Fiesta",
    venue: "Marriott Hotel",
    date: "Apr 10-12, 2026",
    type: "Fashion",
    stalls: 75,
    featured: false,
    price: "11,000",
  },
  {
    id: "mock7",
    title: "Kids & Family Expo",
    venue: "Convention Center",
    date: "Apr 15-17, 2026",
    type: "Kids & Family",
    stalls: 90,
    featured: false,
    price: "9,000",
  },
  {
    id: "mock8",
    title: "Home Decor & Furniture Exhibition",
    venue: "Trade Center",
    date: "Apr 20-22, 2026",
    type: "Home Decor",
    stalls: 110,
    featured: true,
    price: "14,000",
  },
]

const cityData: Record<string, { name: string; eventCount: number }> = {
  hyderabad: { name: "Hyderabad", eventCount: 61 },
  bangalore: { name: "Bangalore", eventCount: 50 },
  mumbai: { name: "Mumbai", eventCount: 30 },
  delhi: { name: "Delhi", eventCount: 27 },
  chennai: { name: "Chennai", eventCount: 17 },
  pune: { name: "Pune", eventCount: 57 },
  kolkata: { name: "Kolkata", eventCount: 17 },
  ahmedabad: { name: "Ahmedabad", eventCount: 15 },
  jaipur: { name: "Jaipur", eventCount: 12 },
}

const eventTypes = ["All Types", "Fashion & Lifestyle", "Wedding & Lifestyle", "Handicrafts", "Food & Lifestyle", "Home Decor", "Kids & Family"]

function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[startDate.getMonth()]} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`
}

export default function CityEventsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All Types")
  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [events, setEvents] = useState<Array<{
    id: string
    title: string
    venue: string
    date: string
    type: string
    stalls: number
    featured: boolean
    price: string
  }>>(mockEvents)
  const [loading, setLoading] = useState(true)

  const city = cityData[slug] || { name: slug.charAt(0).toUpperCase() + slug.slice(1), eventCount: mockEvents.length }

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`/api/events?city=${slug}`)
        const data = await res.json()
        if (data.success && data.data.length > 0) {
          const apiEvents = data.data.map((e: ApiEvent) => ({
            id: e.id,
            title: e.name,
            venue: e.venue,
            date: formatDateRange(e.startDate, e.endDate),
            type: e.eventType,
            stalls: e.availableStalls,
            featured: e.featured,
            price: e.stallModels?.[0]?.price?.toLocaleString() || "5,000",
          }))
          setEvents([...apiEvents, ...mockEvents])
        }
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [slug])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All Types" || event.type.includes(selectedType.replace(" & Lifestyle", ""))
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-2">
              <Link href="/" className="hover:text-primary-foreground">Home</Link>
              <span>/</span>
              <Link href="/cities" className="hover:text-primary-foreground">Cities</Link>
              <span>/</span>
              <span className="text-primary-foreground">{city.name}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Exhibitions in {city.name}
            </h1>
            <p className="text-primary-foreground/80">
              Browse {city.eventCount} upcoming exhibitions and book your stall
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-card border-b border-border py-4 sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 w-full md:w-auto">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events or venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="stalls">Stalls Available</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border border-border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="rounded-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events List */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredEvents.length} events in {city.name}
              </p>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-40 bg-primary/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-12 w-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <span className="text-xs text-muted-foreground">{event.type}</span>
                        </div>
                      </div>
                      {event.featured && (
                        <Badge className="absolute top-3 left-3 bg-accent text-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3 flex-shrink-0" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-3 w-3 flex-shrink-0" />
                          <span>{event.stalls} Stalls</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Starting from</span>
                        <span className="font-semibold text-primary">Rs. {event.price}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button asChild className="w-full">
                        <Link href={`/event/${event.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-32 md:h-auto bg-primary/10 flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Calendar className="h-8 w-8 text-primary" />
                        </div>
                        {event.featured && (
                          <Badge className="absolute top-2 left-2 bg-accent text-foreground text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardContent className="flex-1 p-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-foreground mb-2 hover:text-primary transition-colors">
                              {event.title}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.venue}, {city.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{event.stalls} Stalls Available</span>
                              </div>
                            </div>
                            <Badge variant="secondary" className="mt-2">{event.type}</Badge>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div className="text-right">
                              <span className="text-sm text-muted-foreground">Starting from</span>
                              <div className="text-xl font-bold text-primary">Rs. {event.price}</div>
                            </div>
                            <Button asChild>
                              <Link href={`/event/${event.id}`}>
                                Book Stall
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="h-16 w-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
