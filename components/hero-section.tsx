"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="Exhibition hall with colorful stalls"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance leading-tight">
            Find and Book the Perfect Stall for Your Next Event
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 text-pretty">
            Discover thousands of lifestyle exhibitions, flea markets, and trade expos across India. 
            Connect with organizers and book your stall in minutes.
          </p>

          {/* Search Bar */}
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by city or event..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                />
              </div>
              <Button size="lg" className="md:px-8">
                <Search className="h-5 w-5 mr-2" />
                Search Events
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">13,500+</div>
              <div className="text-sm md:text-base text-primary-foreground/70 mt-1">Events Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">55,000+</div>
              <div className="text-sm md:text-base text-primary-foreground/70 mt-1">Exhibitors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground">3,300+</div>
              <div className="text-sm md:text-base text-primary-foreground/70 mt-1">Organizers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
