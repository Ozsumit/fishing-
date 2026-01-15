"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"

const brands = [
  { name: "Shimano", logo: "SHIMANO" },
  { name: "Nomad", logo: "NOMAD" },
  { name: "Yozuri", logo: "YOZURI" },
  { name: "Airflo", logo: "AIRFLO" },
  { name: "Rapala", logo: "RAPALA" },
  { name: "BKK", logo: "BKK" },
  { name: "Kamana", logo: "KAMANA" },
  { name: "Black Minnow", logo: "BLACK M." },
  { name: "Costa", logo: "COSTA" },
  { name: "Mustad", logo: "MUSTAD" },
  { name: "Daiwa", logo: "DAIWA" },
  { name: "Berkley", logo: "BERKLEY" },
]

export function Brands() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Premium Brands</h2>
          <p className="text-muted-foreground">Trusted by anglers worldwide</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link key={brand.name} href="#" className="group">
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/50 bg-card">
                <div className="font-bold text-sm text-foreground group-hover:text-accent transition-colors">
                  {brand.logo}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
