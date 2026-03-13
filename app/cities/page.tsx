import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, ArrowRight } from "lucide-react"

const allCities = [
  { name: "Hyderabad", state: "Telangana", count: 61, featured: true },
  { name: "Bangalore", state: "Karnataka", count: 50, featured: true },
  { name: "Mumbai", state: "Maharashtra", count: 30, featured: true },
  { name: "Delhi", state: "Delhi NCR", count: 27, featured: true },
  { name: "Chennai", state: "Tamil Nadu", count: 17, featured: true },
  { name: "Pune", state: "Maharashtra", count: 57, featured: true },
  { name: "Kolkata", state: "West Bengal", count: 17, featured: true },
  { name: "Ahmedabad", state: "Gujarat", count: 15, featured: true },
  { name: "Jaipur", state: "Rajasthan", count: 12, featured: false },
  { name: "Gurgaon", state: "Haryana", count: 15, featured: false },
  { name: "Noida", state: "Uttar Pradesh", count: 10, featured: false },
  { name: "Indore", state: "Madhya Pradesh", count: 8, featured: false },
  { name: "Lucknow", state: "Uttar Pradesh", count: 7, featured: false },
  { name: "Chandigarh", state: "Punjab", count: 9, featured: false },
  { name: "Surat", state: "Gujarat", count: 6, featured: false },
  { name: "Vizag", state: "Andhra Pradesh", count: 5, featured: false },
  { name: "Vadodara", state: "Gujarat", count: 8, featured: false },
  { name: "Coimbatore", state: "Tamil Nadu", count: 4, featured: false },
  { name: "Kochi", state: "Kerala", count: 5, featured: false },
  { name: "Nagpur", state: "Maharashtra", count: 6, featured: false },
  { name: "Patna", state: "Bihar", count: 3, featured: false },
  { name: "Bhopal", state: "Madhya Pradesh", count: 4, featured: false },
  { name: "Ludhiana", state: "Punjab", count: 6, featured: false },
  { name: "Agra", state: "Uttar Pradesh", count: 4, featured: false },
  { name: "Nashik", state: "Maharashtra", count: 3, featured: false },
  { name: "Rajkot", state: "Gujarat", count: 5, featured: false },
  { name: "Vijayawada", state: "Andhra Pradesh", count: 4, featured: false },
  { name: "Madurai", state: "Tamil Nadu", count: 3, featured: false },
  { name: "Varanasi", state: "Uttar Pradesh", count: 2, featured: false },
  { name: "Meerut", state: "Uttar Pradesh", count: 2, featured: false },
]

const states = [...new Set(allCities.map(city => city.state))].sort()

export default function CitiesPage() {
  const featuredCities = allCities.filter(city => city.featured)
  const citiesByState = states.map(state => ({
    state,
    cities: allCities.filter(city => city.state === state && !city.featured)
  })).filter(group => group.cities.length > 0)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted">
        {/* Hero */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Browse All Cities
            </h1>
            <p className="text-primary-foreground/80">
              Discover exhibitions and events happening across {allCities.length}+ cities in India
            </p>
          </div>
        </section>

        {/* Featured Cities */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Popular Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredCities.map((city) => (
                <Link key={city.name} href={`/city/${city.name.toLowerCase()}`}>
                  <Card className="h-full hover:shadow-lg hover:border-primary transition-all group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                            {city.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{city.state}</p>
                          <p className="text-sm font-medium text-primary mt-2">
                            {city.count} Events
                          </p>
                        </div>
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-4 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Browse Events</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cities by State */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Browse by State
            </h2>
            <div className="space-y-8">
              {citiesByState.map((group) => (
                <div key={group.state}>
                  <h3 className="font-semibold text-lg text-foreground mb-4 border-b border-border pb-2">
                    {group.state}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {group.cities.map((city) => (
                      <Link
                        key={city.name}
                        href={`/city/${city.name.toLowerCase()}`}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-primary/10 transition-colors group"
                      >
                        <span className="text-foreground group-hover:text-primary transition-colors">
                          {city.name}
                        </span>
                        <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                          {city.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
