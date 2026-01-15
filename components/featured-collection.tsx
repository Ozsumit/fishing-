"use client"

import { Button } from "@/components/ui/button"

export function FeaturedCollection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image Side */}
          <div className="relative h-96 md:h-full min-h-96 rounded-xl overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
              style={{
                backgroundImage: "url('/placeholder.svg?height=500&width=500')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-3xl font-bold mb-2">Ready for Dream Catch</h3>
              <p className="text-white/90 mb-4">Shimano's finest collection</p>
              <Button className="bg-accent text-primary hover:bg-accent/90 font-bold">View Collection</Button>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-4">Shimano Excellence</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Discover the legendary Shimano collection, engineered for professional anglers and enthusiasts alike.
                From precision reels to durable rods, every piece is crafted for excellence on the water.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Advanced bearing systems for smooth performance",
                "Lightweight yet durable materials",
                "Designed for saltwater and freshwater",
                "Backed by 50+ years of expertise",
              ].map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <p className="text-foreground">{feature}</p>
                </div>
              ))}
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-lg">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
