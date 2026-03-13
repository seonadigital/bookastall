import { Calendar, Users, Building2, Trophy } from "lucide-react"

const stats = [
  {
    icon: Calendar,
    value: "13,500+",
    label: "Events Listed",
    description: "Exhibitions across India",
  },
  {
    icon: Users,
    value: "55,000+",
    label: "Exhibitors",
    description: "Connected till now",
  },
  {
    icon: Building2,
    value: "3,300+",
    label: "Organizers",
    description: "Using our platform",
  },
  {
    icon: Trophy,
    value: "100+",
    label: "Cities",
    description: "Covered nationwide",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            We are Growing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of exhibitors and organizers across India
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="h-14 w-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground">
                {stat.label}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
