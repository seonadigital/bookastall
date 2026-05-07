import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import CityGrid from "@/components/home/CityGrid";
import FeaturedEvents from "@/components/home/FeaturedEvents";
import FAQ from "@/components/home/FAQ";
import OrganizerCTA from "@/components/home/OrganizerCTA";
import { getCities, getFeaturedEvents } from "@/lib/directus";

export default async function HomePage() {
  const [cities, featuredEvents] = await Promise.all([
    getCities(),
    getFeaturedEvents(),
  ]);

  return (
    <>
      <Hero />
      {/* <TrustedMarquee /> */}
      <HowItWorks />
      <CityGrid cities={cities} />
      <FeaturedEvents events={featuredEvents} />
      <FAQ />
      <OrganizerCTA />
    </>
  );
}