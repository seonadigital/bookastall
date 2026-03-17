import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CityGrid } from "@/components/city-grid"
import { FeaturedEvents } from "@/components/featured-events"
import { StatsSection } from "@/components/stats-section"
import { HowItWorks } from "@/components/how-it-works"
import { AppBanner } from "@/components/app-banner"
import { TrendingEvents } from "@/components/trending-events"
import { AboutSection } from "@/components/about-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CityGrid />
        <FeaturedEvents />
        <TrendingEvents />
        <HowItWorks />
        <AboutSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  )
}
