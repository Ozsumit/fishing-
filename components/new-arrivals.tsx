"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useUser } from "@/contexts/user-context"
import { getProducts } from "@/lib/products"
import type { Product } from "@/lib/products"

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useUser()
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.filter((p) => p.badge === "New").slice(0, 6))
    })
  }, [])

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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12 animate-fadeInUp">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-2">New Arrivals</h2>
            <p className="text-muted-foreground text-lg">Just added to our collection</p>
          </div>
          <Link
            href="/shop"
            className="text-accent hover:text-accent/80 font-semibold flex items-center gap-2 text-lg transition-all duration-300 hover:gap-3"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
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
                  <div className="absolute top-4 left-4 px-4 py-2 bg-accent text-primary text-xs font-bold rounded-full shadow-lg animate-scaleIn">
                    {product.badge}
                  </div>
                )}
                <button
                  onClick={() => handleToggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white text-primary transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
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
                        className={`w-4 h-4 transition-colors ${
                          i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">({product.reviews})</span>
                </div>

                <div className="mt-auto">
                  <p className="text-3xl font-bold text-primary mb-4">${product.price}</p>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-accent hover:bg-accent/90 text-primary rounded-lg font-semibold transition-all duration-300 gap-2 group/btn"
                  >
                    {addedToCart === product.id ? (
                      <>
                        <span>✓</span>
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
