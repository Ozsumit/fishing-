"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="py-16 text-center mb-20 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Get in Touch</h1>
          <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Info Cards */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0s" }}>
            <Card className="border border-border p-8 h-full hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Phone</h3>
              <p className="text-muted-foreground mb-4">+1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Monday - Friday, 9am - 6pm EST</p>
            </Card>
          </div>

          <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <Card className="border border-border p-8 h-full hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground mb-4">support@anglersbay.com</p>
              <p className="text-sm text-muted-foreground">We'll reply within 24 hours</p>
            </Card>
          </div>

          <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            <Card className="border border-border p-8 h-full hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Address</h3>
              <p className="text-muted-foreground mb-4">123 Harbor Street</p>
              <p className="text-sm text-muted-foreground">Coastal City, CA 90210</p>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <Card className="border border-border p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-primary text-lg py-6 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg gap-2 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Business Hours & FAQ */}
          <div className="space-y-8">
            {/* Business Hours */}
            <Card className="border border-border p-8 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Business Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-foreground font-semibold">Monday - Friday</span>
                      <span className="text-muted-foreground">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground font-semibold">Saturday</span>
                      <span className="text-muted-foreground">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground font-semibold">Sunday</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* FAQs */}
            <Card className="border border-border p-8 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl font-bold text-foreground mb-4">Common Questions</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-1">What is your return policy?</p>
                  <p className="text-sm text-muted-foreground">
                    We offer 30 days returns on all products in original condition.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">How long does shipping take?</p>
                  <p className="text-sm text-muted-foreground">Standard shipping typically takes 5-7 business days.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Do you offer warranties?</p>
                  <p className="text-sm text-muted-foreground">Yes, all products come with manufacturer warranties.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
