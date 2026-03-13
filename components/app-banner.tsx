"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Smartphone, Download } from "lucide-react"

export function AppBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!isVisible) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length === 10) {
      setSubmitted(true)
    }
  }

  return (
    <div className="bg-accent/20 border-b border-accent/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Smartphone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="font-medium text-foreground text-sm">
                Get instant Exhibition Updates in our Mobile App
              </p>
              <p className="text-xs text-muted-foreground">
                Download now for exclusive deals and notifications
              </p>
            </div>
            <p className="sm:hidden font-medium text-foreground text-sm">
              Download our App
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                type="tel"
                placeholder="Enter mobile"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-32 md:w-40 h-9 text-sm"
              />
              <Button type="submit" size="sm" disabled={phone.length !== 10}>
                <Download className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Get Link</span>
              </Button>
            </form>
          ) : (
            <p className="text-sm text-primary font-medium">
              Link sent to your mobile!
            </p>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
