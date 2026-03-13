import { Search, Calendar, CheckCircle, Store } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse Events",
    description: "Search for exhibitions and events in your preferred city or category",
  },
  {
    icon: Calendar,
    title: "Select Date & Stall",
    description: "Choose your preferred dates and stall type based on your requirements",
  },
  {
    icon: Store,
    title: "Book Your Stall",
    description: "Complete the booking process with secure payment options",
  },
  {
    icon: CheckCircle,
    title: "Get Confirmation",
    description: "Receive instant confirmation and start preparing for the event",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book your exhibition stall in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 bg-accent rounded-full flex items-center justify-center text-sm font-bold text-foreground">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-foreground mt-6 mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
