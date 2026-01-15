"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Users, Globe, Zap } from "lucide-react"
import Link from "next/link"

const team = [
  {
    name: "Captain Marcus",
    role: "Founder & CEO",
    bio: "30+ years of fishing expertise",
    image: "/professional-man-fishing.jpg",
  },
  {
    name: "Sarah Chen",
    role: "Head of Product",
    bio: "Marine biology specialist",
    image: "/woman-scientist-marine.jpg",
  },
  {
    name: "James Wilson",
    role: "Operations Manager",
    bio: "Supply chain expert",
    image: "/businessman-professional.jpg",
  },
  {
    name: "Elena Rodriguez",
    role: "Customer Success",
    bio: "Dedicated to excellence",
    image: "/woman-customer-service.jpg",
  },
]

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We source only premium fishing gear from trusted manufacturers worldwide.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "Supporting anglers of all levels with expert guidance and resources.",
  },
  {
    icon: Globe,
    title: "Sustainable Practices",
    description: "Committed to environmental conservation and responsible fishing.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Bringing cutting-edge fishing technology to our customers.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 text-center animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">About AnglersBay</h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your ultimate destination for premium fishing and water sports equipment since 2010
          </p>
        </div>

        {/* Story Section */}
        <section className="py-16 mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              AnglersBay was founded by a group of passionate fishermen who recognized a gap in the market. We wanted to
              create a place where anglers of all skill levels could find premium equipment, expert advice, and a
              thriving community of fellow enthusiasts.
            </p>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              From our humble beginnings as a small local shop, we've grown to become a trusted source for fishing gear
              across the region. Today, we proudly serve thousands of customers who share our passion for the sport.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our commitment to quality, customer service, and conservation remains unchanged. Every product in our
              collection is hand-selected by our team of experts to ensure you get the best equipment for your needs.
            </p>
          </div>
          <div
            className="h-96 rounded-lg overflow-hidden animate-slideInRight"
            style={{
              backgroundImage: "url('/fishing-boat-ocean-sunset.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </section>

        {/* Values Section */}
        <section className="py-20 mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center animate-fadeInUp">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <Card
                  key={idx}
                  className="border border-border p-8 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 mb-20">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center animate-fadeInUp">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <Card
                key={idx}
                className="border border-border overflow-hidden hover:shadow-xl transition-all duration-500 group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className="aspect-square overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('${member.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-accent font-semibold mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 mb-20 bg-primary/5 rounded-2xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-fadeInUp" style={{ animationDelay: "0s" }}>
              <p className="text-5xl font-bold text-accent mb-2">10K+</p>
              <p className="text-foreground text-lg">Happy Customers</p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              <p className="text-5xl font-bold text-accent mb-2">5K+</p>
              <p className="text-foreground text-lg">Products</p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              <p className="text-5xl font-bold text-accent mb-2">14+</p>
              <p className="text-foreground text-lg">Years in Business</p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              <p className="text-5xl font-bold text-accent mb-2">50+</p>
              <p className="text-foreground text-lg">Expert Staff</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-4xl font-bold text-foreground mb-6">Join Our Community</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with fellow anglers, share your experiences, and stay updated on the latest products and tips.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/shop">
              <Button className="bg-accent hover:bg-accent/90 text-primary px-8 py-3 text-lg font-semibold">
                Start Shopping
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="px-8 py-3 text-lg font-semibold bg-transparent">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
