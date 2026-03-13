"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, User, Mail, Check, Loader2 } from "lucide-react"

interface LoginModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [demoOtp, setDemoOtp] = useState("")

  const handleSendOtp = async () => {
    if (phone.length !== 10) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone }),
      })
      const data = await res.json()
      if (data.success) {
        setOtpSent(true)
        if (data.demo_otp) setDemoOtp(data.demo_otp)
      } else {
        setError(data.error || "Failed to send OTP")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async () => {
    if (otp.length !== 6) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone, otp }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.data.user))
        localStorage.setItem("token", data.data.token)
        onOpenChange(false)
        resetForm()
        window.location.reload()
      } else {
        setError(data.error || "Invalid OTP")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    if (phone.length !== 10 || !name) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phone }),
      })
      const data = await res.json()
      if (data.success) {
        setOtpSent(true)
        if (data.demo_otp) setDemoOtp(data.demo_otp)
      } else {
        setError(data.error || "Failed to send OTP")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setPhone("")
    setOtp("")
    setOtpSent(false)
    setName("")
    setEmail("")
    setError("")
    setDemoOtp("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Welcome to BookaStall</DialogTitle>
          <DialogDescription className="text-center">
            Sign in or create an account to book stalls and create events
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile Number</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-muted rounded-md text-sm text-muted-foreground">
                  +91
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="flex-1"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 p-2 rounded">{error}</p>
            )}

            {!otpSent ? (
              <Button className="w-full" onClick={handleSendOtp} disabled={phone.length !== 10 || loading}>
                {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Phone className="h-4 w-4 mr-2" />}
                Send OTP
              </Button>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    OTP sent to +91 {phone}
                  </p>
                  {demoOtp && (
                    <p className="text-xs text-primary bg-primary/10 p-2 rounded">
                      Demo OTP: {demoOtp}
                    </p>
                  )}
                </div>
                <Button className="w-full" onClick={handleLogin} disabled={otp.length !== 6 || loading}>
                  {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                  Verify & Login
                </Button>
                <Button variant="ghost" className="w-full text-sm" onClick={() => { setOtpSent(false); setError(""); }}>
                  Change Number / Resend OTP
                </Button>
              </>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Continue as Guest
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="signup-phone">Mobile Number *</Label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 bg-muted rounded-md text-sm text-muted-foreground">
                  +91
                </div>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email (Optional)</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By clicking Sign Up, you are accepting our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms & Conditions
              </a>
            </p>

            <Button className="w-full" onClick={handleSignUp} disabled={phone.length !== 10 || !name || loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
              Create Account
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
