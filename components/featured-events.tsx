"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowRight, Star, Loader2 } from "lucide-react"

interface EventItem {
  id: string
  title: string
  venue: string
  city: string
  date: string
  type: string
  stalls: number
  featured: boolean
}

const fallbackEvents: EventItem[] = [
  {
    id: "fb1",
    title: "A Luxury Wedding Exhibition",
    venue: "Hyatt Regency, Bhikaji Cama Palace",
    city: "New Delhi",
    date: "Mar 15-17, 2026",
    type: "Wedding & Lifestyle",
    stalls: 120,
    featured: true,
  },
  {
    id: "fb2",
    title: "Premium Fashion & Lifestyle Exhibition",
    venue: "Taj Krishna",
    city: "Hyderabad",
    date: "Mar 20-22, 2026",
    type: "Fashion & Lifestyle",
    stalls: 85,
    featured: true,
  },
  {
    id: "fb3",
    title: "Spring Edit - Fashion Exhibition",
    venue: "Holiday Inn",
    city: "Agra",
    date: "Mar 25-27, 2026",
    type: "Fashion & Lifestyle",
    stalls: 60,
    featured: true,
  },
  {
    id: "fb4",
    title: "Fashion & Lifestyle Exhibition",
    venue: "Hiland Hotel",
    city: "Siliguri",
    date: "Apr 1-3, 2026",
    type: "Lifestyle",
    stalls: 45,
    featured: false,
  },
  {
    id: "fb5",
    title: "Luxe Edit - Premium Exhibition",
    venue: "The Grand Bhagwati",
    city: "Ahmedabad",
    date: "Apr 5-7, 2026",
    type: "Premium",
    stalls: 100,
    featured: true,
  },
  {
    id: "fb6",
    title: "Summer Fiesta Exhibition",
    venue: "Double Tree By Hilton",
    city: "Mumbai",
    date: "Apr 10-12, 2026",
    type: "Lifestyle",
    stalls: 75,
    featured: false,
  },
]

function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${months[startDate.getMonth()]} ${startDate.getDate()}-${endDate.getDate()}, ${startDate.getFullYear()}`
}

export function FeaturedEvents() {
  const [events, setEvents] = useState<EventItem[]>(fallbackEvents)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?featured=true&limit=6")
        const data = await res.json()
        if (data.success && data.data.length > 0) {
          const apiEvents = data.data.map((e: { id: string; name: string; venue: string; city: string; startDate: string; endDate: string; eventType: string; availableStalls: number; featured: boolean }) => ({
            id: e.id,
            title: e.name,
            venue: e.venue,
            city: e.city,
            date: formatDateRange(e.startDate, e.endDate),
            type: e.eventType,
            stalls: e.availableStalls,
            featured: e.featured,
          }))
          setEvents([...apiEvents, ...fallbackEvents].slice(0, 6))
        }
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Featured Exhibitions
            </h2>
            <p className="text-muted-foreground">
              Discover the best upcoming exhibitions across India
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/events">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : events.map((event) => (
            <Card key={event.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-primary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-16 w-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-2">
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{event.type}</span>
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
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{event.venue}, {event.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    <span>{event.stalls} Stalls Available</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/event/${event.id}`}>
                    Book Stall
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/events">
              View All Events
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
