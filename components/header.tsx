"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Menu, X, Phone, MapPin, Plus, User, LogIn } from "lucide-react"
import { LoginModal } from "@/components/login-modal"

const popularCities = [
  { name: "Hyderabad", count: 61 },
  { name: "Bangalore", count: 50 },
  { name: "Mumbai", count: 30 },
  { name: "Delhi", count: 27 },
  { name: "Chennai", count: 17 },
  { name: "Pune", count: 57 },
  { name: "Kolkata", count: 17 },
  { name: "Ahmedabad", count: 15 },
  { name: "Jaipur", count: 12 },
  { name: "Gurgaon", count: 15 },
  { name: "Noida", count: 10 },
  { name: "Indore", count: 8 },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        {/* Top Bar */}
        <div className="bg-primary text-primary-foreground text-sm py-2">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/featured" className="hover:underline">
                For Featured Exhibitions Click here
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Call: 999-256-2456</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-foreground">BookaStall</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Cities
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4">
                  <div className="mb-2 font-semibold text-sm text-muted-foreground">Popular Cities</div>
                  <div className="grid grid-cols-2 gap-2">
                    {popularCities.map((city) => (
                      <DropdownMenuItem key={city.name} asChild>
                        <Link href={`/city/${city.name.toLowerCase()}`} className="flex items-center justify-between w-full">
                          <span>{city.name}</span>
                          <span className="text-muted-foreground text-xs">{city.count}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem asChild>
                    <Link href="/cities" className="font-medium text-primary">
                      View All Cities
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Services
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/promote">Promote Event</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/membership">Join As Member</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/enquiry">Enquiry</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="outline" onClick={() => setLoginModalOpen(true)}>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button asChild>
                <Link href="/create-event">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div>
                <div className="font-semibold mb-2 text-sm text-muted-foreground">Popular Cities</div>
                <div className="grid grid-cols-2 gap-2">
                  {popularCities.slice(0, 8).map((city) => (
                    <Link
                      key={city.name}
                      href={`/city/${city.name.toLowerCase()}`}
                      className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted text-sm"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{city.name}</span>
                      <span className="text-muted-foreground text-xs">{city.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <Link
                  href="/promote"
                  className="block px-3 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Promote Event
                </Link>
                <Link
                  href="/membership"
                  className="block px-3 py-2 rounded-md hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join As Member
                </Link>
              </div>
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                <Button variant="outline" onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }}>
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button asChild>
                  <Link href="/create-event" onClick={() => setMobileMenuOpen(false)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  )
}
