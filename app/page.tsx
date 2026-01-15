import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { CategoryGrid } from "@/components/category-grid"
import { NewArrivals } from "@/components/new-arrivals"
import { FeaturedCollection } from "@/components/featured-collection"
import { Brands } from "@/components/brands"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <FeaturedCollection />
      <Brands />
      <Footer />
    </div>
  )
}
