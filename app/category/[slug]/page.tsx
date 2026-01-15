"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useUser } from "@/contexts/user-context"
import { getProductsByCategory } from "@/lib/products"
import type { Product } from "@/lib/products"

const categoryInfo: Record<string, { title: string; description: string }> = {
  reels: {
    title: "Fishing Reels",
    description: "High-performance reels for every fishing style",
  },
  rods: {
    title: "Fishing Rods",
    description: "Premium quality rods engineered for precision",
  },
  lines: {
    title: "Fishing Lines",
    description: "Strong and reliable fishing lines",
  },
  lures: {
    title: "Fishing Lures",
    description: "Authentic lures to attract your catch",
  },
  accessories: {
    title: "Accessories",
    description: "Essential accessories for fishing",
  },
  diving: {
    title: "Diving Gear",
    description: "Complete diving equipment for water sports",
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const categoryMeta = categoryInfo[slug]

  const [products, setProducts] = useState<Product[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500])
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useUser()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  useEffect(() => {
    getProductsByCategory(slug).then(setProducts)
  }, [slug])

  if (!categoryMeta) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Category not found</h1>
            <Link href="/shop" className="text-accent hover:text-accent/80 font-semibold">
              Back to shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  const filteredProducts = products.filter((product) => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
    const typeMatch = !typeFilter || product.type === typeFilter
    return priceMatch && typeMatch
  })

  const uniqueTypes = products.map((p) => p.type).filter((type): type is string => Boolean(type))
  const uniqueTypesSet = [...new Set(uniqueTypes)]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="mb-12 animate-fadeInUp">
          <Link href="/shop" className="text-accent hover:text-accent/80 font-semibold text-sm mb-4 inline-block">
            ← Back to shop
          </Link>
          <h1 className="text-5xl font-bold text-foreground mb-3">{categoryMeta.title}</h1>
          <p className="text-xl text-muted-foreground">{categoryMeta.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {uniqueTypesSet.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg p-6 border border-border sticky top-20">
                <h3 className="text-lg font-semibold text-foreground mb-6">Filters</h3>

                {/* Price Filter */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-foreground mb-3">Price Range</label>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Type</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setTypeFilter(null)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        typeFilter === null ? "bg-accent text-primary" : "hover:bg-muted text-foreground"
                      }`}
                    >
                      All Types
                    </button>
                    {uniqueTypesSet.map((type) => (
                      <button
                        key={type}
                        onClick={() => setTypeFilter(type)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          typeFilter === type ? "bg-accent text-primary" : "hover:bg-muted text-foreground"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className={uniqueTypesSet.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products match your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredProducts.map((product, idx) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 flex flex-col group"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      />
                      {product.badge && (
                        <div className="absolute top-4 left-4 px-4 py-2 bg-accent text-primary text-xs font-bold rounded-full shadow-lg">
                          {product.badge}
                        </div>
                      )}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white text-primary transition-all duration-300 hover:scale-110 shadow-md"
                      >
                        <Heart className={`w-5 h-5 ${isFavorite(product.id) ? "fill-accent text-accent" : ""}`} />
                      </button>
                    </div>

                    <div className="flex flex-col flex-1 p-6 bg-card">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300 text-lg">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">({product.reviews})</span>
                      </div>

                      <div className="mt-auto">
                        <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-accent hover:bg-accent/90 text-primary rounded-lg font-semibold transition-all duration-300 gap-2"
                        >
                          {addedToCart === product.id ? (
                            <>
                              <span>✓</span>
                              Added!
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
