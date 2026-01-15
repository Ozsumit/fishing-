"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, Filter, X, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useUser } from "@/contexts/user-context"
import { getProducts } from "@/lib/products"
import type { Product } from "@/lib/products"

export default function ShopPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useUser()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  useEffect(() => {
    getProducts().then(setAllProducts)
  }, [])

  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false
    return true
  })

  const categories = ["reels", "rods", "lines", "lures", "accessories"]

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

  const handleToggleFavorite = (productId: number) => {
    toggleFavorite(productId)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Shop All Products</h1>
          <p className="text-lg text-muted-foreground">{filteredProducts.length} products found</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filter */}
          <aside
            className={`transition-all duration-300 ${filterOpen ? "w-full md:w-64 block" : "hidden md:block md:w-64"}`}
          >
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between md:hidden">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Category</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all ${
                      selectedCategory === null ? "bg-accent text-primary font-semibold" : "hover:bg-muted"
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all capitalize ${
                        selectedCategory === cat ? "bg-accent text-primary font-semibold" : "hover:bg-muted"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="bg-card rounded-lg p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    ${priceRange[0]} - ${priceRange[1]}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="md:hidden mb-6 flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      onClick={() => handleToggleFavorite(product.id)}
                      className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white text-primary transition-all duration-300 hover:scale-110 shadow-md"
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(product.id) ? "fill-accent text-accent" : ""}`} />
                    </button>
                  </div>

                  <div className="flex flex-col flex-1 p-5 bg-card">
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No products found matching your filters</p>
                <Button
                  onClick={() => {
                    setSelectedCategory(null)
                    setPriceRange([0, 1500])
                  }}
                  className="bg-accent hover:bg-accent/90 text-primary"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
