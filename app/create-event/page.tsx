"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Upload, Building2, Users, User, FileText, Image as ImageIcon, Loader2, CheckCircle } from "lucide-react"

const cities = [
  "Hyderabad", "Bangalore", "Mumbai", "Delhi", "Chennai", "Pune", "Kolkata", 
  "Ahmedabad", "Jaipur", "Gurgaon", "Noida", "Indore", "Lucknow", "Chandigarh",
  "Surat", "Vizag", "Vadodara", "Coimbatore"
]

const venueTypes = ["Hotel", "Convention Center", "Banquet Hall", "Open Ground", "Mall", "Exhibition Hall", "Club", "Other"]
const eventTypes = ["Indoor", "Outdoor", "Both"]
const stallModels = ["Open Table", "Canopy", "Octanorm", "Shell Scheme", "Raw Space", "Others"]
const stallTypes = ["With Tables", "With Chairs", "Tables & Chairs", "Empty Space"]
const categories = [
  "Apparels", "Jewellery", "Fashion Accessories", "Home Decor", "Handicrafts",
  "Food & Beverages", "Beauty & Wellness", "Electronics", "Art & Paintings",
  "Kids & Toys", "Leather Products", "Organic Products", "Stationery", "Others"
]
const facilities = [
  "Electricity", "WiFi", "Parking", "Security", "Air Conditioning", 
  "Sound System", "Projector", "Catering", "Registration Desk", "Washrooms"
]

export default function CreateEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    mobile: "",
    organizerName: "",
    city: "",
    eventName: "",
    venue: "",
    venueAddress: "",
    venueType: "",
    eventType: "",
    startDate: "",
    endDate: "",
    totalStalls: "",
    availableStalls: "",
    stallModel: "",
    stallType: "",
    expectedVisitors: "",
    additionalDetails: "",
    termsAccepted: false,
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Map city name to city ID (using the index + 1 for simplicity)
    const cityMap: Record<string, string> = {
      "hyderabad": "1", "bangalore": "2", "mumbai": "3", "delhi": "4",
      "chennai": "5", "pune": "6", "kolkata": "7", "ahmedabad": "8",
      "jaipur": "9", "lucknow": "10", "kochi": "11", "chandigarh": "12"
    }

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.eventName,
          description: formData.additionalDetails,
          cityId: cityMap[formData.city] || "1",
          venue: formData.venue,
          venueAddress: formData.venueAddress || formData.venue,
          venueType: formData.venueType || "indoor",
          eventType: formData.eventType || "Lifestyle Exhibition",
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalStalls: formData.totalStalls,
          availableStalls: formData.availableStalls,
          categories: selectedCategories,
          facilities: selectedFacilities,
          expectedVisitors: formData.expectedVisitors,
          organizerName: formData.organizerName,
          organizerMobile: formData.mobile,
        }),
      })

      const data = await res.json()
      
      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/")
        }, 3000)
      } else {
        setError(data.error || "Failed to create event")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-muted">
        <Header />
        <main className="flex-1 flex items-center justify-center py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Event Submitted!</h2>
              <p className="text-muted-foreground mb-4">
                Your event has been submitted for review. Our team will approve it within 24 hours.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting to homepage...
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Create Your Event
            </h1>
            <p className="text-muted-foreground">
              List your exhibition or event and connect with thousands of exhibitors
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Organizer Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Organizer Information
                </CardTitle>
                <CardDescription>
                  Provide your contact details for exhibitor inquiries
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-muted rounded-md text-sm text-muted-foreground border border-input">
                      +91
                    </div>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizerName">Organizer / Company Name *</Label>
                  <Input
                    id="organizerName"
                    placeholder="Enter organizer name"
                    value={formData.organizerName}
                    onChange={(e) => handleInputChange("organizerName", e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Event Details
                </CardTitle>
                <CardDescription>
                  Provide information about your exhibition or event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Select 
                      value={formData.city} 
                      onValueChange={(value) => handleInputChange("city", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map(city => (
                          <SelectItem key={city} value={city.toLowerCase()}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventName">Event Name *</Label>
                    <Input
                      id="eventName"
                      placeholder="Enter event name"
                      value={formData.eventName}
                      onChange={(e) => handleInputChange("eventName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      placeholder="e.g., Hotel Taj, HITEX Convention Center"
                      value={formData.venue}
                      onChange={(e) => handleInputChange("venue", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="venueType">Venue Type *</Label>
                    <Select 
                      value={formData.venueType} 
                      onValueChange={(value) => handleInputChange("venueType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Venue Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {venueTypes.map(type => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type *</Label>
                    <Select 
                      value={formData.eventType} 
                      onValueChange={(value) => handleInputChange("eventType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Indoor/Outdoor/Both" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map(type => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange("startDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange("endDate", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stall Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Stall Information
                </CardTitle>
                <CardDescription>
                  Provide details about the stalls available at your event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalStalls">Total Stalls *</Label>
                    <Input
                      id="totalStalls"
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.totalStalls}
                      onChange={(e) => handleInputChange("totalStalls", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availableStalls">Available Stalls *</Label>
                    <Input
                      id="availableStalls"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.availableStalls}
                      onChange={(e) => handleInputChange("availableStalls", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stallModel">Stall Model *</Label>
                    <Select 
                      value={formData.stallModel} 
                      onValueChange={(value) => handleInputChange("stallModel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Stall Model" />
                      </SelectTrigger>
                      <SelectContent>
                        {stallModels.map(model => (
                          <SelectItem key={model} value={model.toLowerCase().replace(/ /g, "-")}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stallType">Stall Type *</Label>
                    <Select 
                      value={formData.stallType} 
                      onValueChange={(value) => handleInputChange("stallType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Stall Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {stallTypes.map(type => (
                          <SelectItem key={type} value={type.toLowerCase().replace(/ /g, "-")}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories Allowed */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Categories Allowed
                </CardTitle>
                <CardDescription>
                  Select the product categories allowed at your event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label 
                        htmlFor={`category-${category}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facilities Provided */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Facilities Provided
                </CardTitle>
                <CardDescription>
                  Select the facilities available at your event venue
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {facilities.map(facility => (
                    <div key={facility} className="flex items-center space-x-2">
                      <Checkbox
                        id={`facility-${facility}`}
                        checked={selectedFacilities.includes(facility)}
                        onCheckedChange={() => toggleFacility(facility)}
                      />
                      <Label 
                        htmlFor={`facility-${facility}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {facility}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upload Files */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Upload Files
                </CardTitle>
                <CardDescription>
                  Upload event poster and floor plan (optional but recommended)
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Event Poster</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="poster-upload"
                      onChange={(e) => setPosterFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="poster-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {posterFile ? posterFile.name : "Click to upload event poster"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Floor Plan</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="hidden"
                      id="floorplan-upload"
                      onChange={(e) => setFloorPlanFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="floorplan-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {floorPlanFile ? floorPlanFile.name : "Click to upload floor plan"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, PDF up to 5MB
                      </p>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedVisitors">Expected Visitor Count</Label>
                  <Input
                    id="expectedVisitors"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.expectedVisitors}
                    onChange={(e) => handleInputChange("expectedVisitors", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalDetails">Additional Event Details</Label>
                  <Textarea
                    id="additionalDetails"
                    placeholder="Provide any additional information about your event, special instructions, timings, etc."
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Terms & Submit */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2 mb-6">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    By submitting this form, I agree to the{" "}
                    <a href="/terms" className="text-primary hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>{" "}
                    of BookaStall.
                  </Label>
                </div>
                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-3 rounded mb-4">{error}</p>
                )}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={!formData.termsAccepted || loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Event for Review"
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Your event will be reviewed and published within 24 hours
                </p>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
