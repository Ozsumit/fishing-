"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const categories = [
  { name: "Reels", image: "/fishing-reel.jpg", path: "/category/reels" },
  { name: "Rods", image: "/fishing-rod.jpg", path: "/category/rods" },
  { name: "Lines", image: "/fishing-line.jpg", path: "/category/lines" },
  { name: "Lures", image: "/fishing-lure.jpg", path: "/category/lures" },
  { name: "Accessories", image: "/fishing-accessories.jpg", path: "/category/accessories" },
  { name: "Apparel", image: "/fishing-apparel.jpg", path: "/category/apparel" },
]

export function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12 animate-fadeInUp">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">Shop Fishing Gear</h2>
            <p className="text-muted-foreground text-lg">Explore our complete collection of premium equipment</p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-lg transition-all duration-300 hover:gap-3"
          >
            View all <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, idx) => (
            <Link key={category.name} href={category.path} className="group">
              <Card
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 h-full border-0 bg-card cursor-pointer"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-125 transition-transform duration-500"
                    style={{ backgroundImage: `url('${category.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition-all duration-300" />
                </div>
                <div className="p-4 text-center bg-card group-hover:bg-primary/5 transition-colors duration-300">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 text-base">
                    {category.name}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
