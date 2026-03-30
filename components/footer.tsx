import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

const topCities = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Chennai",
  "Pune",
  "Delhi",
  "Kolkata",
  "Ahmedabad",
]

const helpfulLinks = [
  { name: "About BMS", href: "/about" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQs", href: "/faqs" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Refund Policy", href: "/refund" },
  { name: "Disclaimer", href: "/disclaimer" },
]

const services = [
  { name: "Bulk Stall Booking", href: "#" },
  { name: "Loan for Stall", href: "/stall-loan" },
  { name: "Promote Event", href: "/promote" },
  { name: "Bulk SMS Ads", href: "/sms-ads" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold">Book A Stall</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Discover over 10,000+ stalls in various Lifestyle Exhibitions, Flea markets, 
              and Promotional events. India&apos;s leading stall booking platform connecting 
              organizers, exhibitors, and visitors.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Top Cities */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Top Cities for Exhibitions</h3>
            <ul className="space-y-2">
              {topCities.map((city) => (
                <li key={city}>
                  <Link
                    href={`/city/${city.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <MapPin className="h-3 w-3" />
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Helpful Links</h3>
            <ul className="space-y-2">
              {helpfulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="h-4 w-4" />
                <span>+91-970-39-49-871</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="h-4 w-4" />
                <span>support@bookastall.in</span>
              </li>
            </ul>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted-foreground/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2026 BookaStall. All Rights Reserved.</p>
            <p>Made with care for exhibitors and organizers across India</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
