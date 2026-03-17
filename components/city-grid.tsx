"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"

const cities = [
  { name: "Hyderabad", count: 61, featured: true },
  { name: "Bangalore", count: 50, featured: true },
  { name: "Mumbai", count: 30, featured: true },
  { name: "Delhi", count: 27, featured: true },
  { name: "Chennai", count: 17, featured: true },
  { name: "Pune", count: 57, featured: true },
  { name: "Jaipur", count: 12, featured: false },
  { name: "Vadodara", count: 8, featured: false },
  { name: "Kolkata", count: 17, featured: true },
  { name: "Vizag", count: 5, featured: false },
  { name: "Surat", count: 6, featured: false },
  { name: "Gurgaon", count: 15, featured: false },
  { name: "Indore", count: 8, featured: false },
  { name: "Ahmedabad", count: 15, featured: true },
  { name: "Coimbatore", count: 4, featured: false },
  { name: "Noida", count: 10, featured: false },
  { name: "Lucknow", count: 7, featured: false },
  { name: "Chandigarh", count: 9, featured: false },
]

export function CityGrid() {
  const featuredCities = cities.filter(city => city.featured)
  const otherCities = cities.filter(city => !city.featured)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Select Your City
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse exhibitions and events happening in major cities across India
          </p>
        </div>

        {/* Featured Cities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {featuredCities.map((city) => (
            <Link
              key={city.name}
              href={`/city/${city.name.toLowerCase()}`}
              className="group relative bg-card rounded-xl border border-border p-6 hover:border-primary hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {city.count} Events
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="absolute top-2 right-2">
              <!--  <span className="bg-accent text-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Popular
                </span> --!>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Cities */}
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {otherCities.map((city) => (
            <Link
              key={city.name}
              href={`/city/${city.name.toLowerCase()}`}
              className="bg-card rounded-lg border border-border p-3 text-center hover:border-primary hover:shadow-md transition-all duration-300"
            >
              <h3 className="font-medium text-sm text-foreground truncate">
                {city.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {city.count}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/cities"
            className="text-primary font-medium hover:underline"
          >
            View All Cities →
          </Link>
        </div>
      </div>
    </section>
  )
}
