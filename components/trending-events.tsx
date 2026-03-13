"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, ArrowRight, TrendingUp } from "lucide-react"

const trendingEvents = [
  {
    id: 1,
    title: "The February Fair",
    venue: "FORT Hotel",
    city: "Jaipur",
    date: "Feb 25-27, 2026",
  },
  {
    id: 2,
    title: "Fashion & Lifestyle Exhibition",
    venue: "Double Tree By Hilton",
    city: "Dubai",
    date: "Mar 1-3, 2026",
  },
  {
    id: 3,
    title: "Wedding & Lifestyle Exhibition",
    venue: "Hotel Country Inn & Suites",
    city: "Kota",
    date: "Mar 5-7, 2026",
  },
  {
    id: 4,
    title: "Summer Fiesta",
    venue: "Hotel Sapphire",
    city: "Yamuna Nagar",
    date: "Mar 10-12, 2026",
  },
  {
    id: 5,
    title: "Luxury Fashion & Lifestyle Exhibition",
    venue: "Hotel Sayaji",
    city: "Indore",
    date: "Mar 15-17, 2026",
  },
  {
    id: 6,
    title: "The Madras Summer Bazaar",
    venue: "The Folly-Amethyst",
    city: "Chennai",
    date: "Mar 20-22, 2026",
  },
]

export function TrendingEvents() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Trending Now
              </h2>
              <p className="text-muted-foreground text-sm">
                Most viewed exhibitions this week
              </p>
            </div>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/events">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingEvents.map((event, index) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <Card className="hover:shadow-md hover:border-primary transition-all group">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{event.venue}, {event.city}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3 flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" asChild>
            <Link href="/events">
              View All Trending
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
