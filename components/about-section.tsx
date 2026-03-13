import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Store, Users, CalendarCheck, BadgeCheck } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              India&apos;s Leading Exhibition Stall Booking Platform
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              BookaStall is India&apos;s trusted platform for discovering and booking exhibition stalls. 
              We connect exhibitors with organizers across 100+ cities, making it easy to find the 
              perfect opportunity for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="flex gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Store className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Wide Selection</h3>
                <p className="text-sm text-muted-foreground">
                  Browse through 10,000+ stalls across lifestyle exhibitions, flea markets, 
                  trade expos, and promotional events.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Trusted Network</h3>
                <p className="text-sm text-muted-foreground">
                  Join 55,000+ exhibitors and 3,300+ organizers who trust our platform 
                  for their exhibition needs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Easy Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Simple and secure booking process. Book your stall online and get 
                  instant confirmation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Verified Events</h3>
                <p className="text-sm text-muted-foreground">
                  All events are verified by our team. Get accurate information about 
                  venues, dates, and stall availability.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/create-event">
                List Your Event for Free
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
