"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"

const products: Record<string, any> = {
  "1": {
    id: 1,
    name: "Shimano Twin Power Reel",
    price: 289.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviews: 42,
    inStock: true,
    category: "Reels",
    sku: "SHIMANO-TP-2024",
    description:
      "Experience the ultimate in fishing reel performance with the Shimano Twin Power. Engineered with precision ball bearings and a robust drag system, this reel delivers smooth, reliable performance in any condition.",
    longDescription: `The Shimano Twin Power Reel represents the pinnacle of modern fishing reel engineering. Designed for both freshwater and saltwater applications, this powerhouse features advanced drag technology that provides smooth, consistent pressure on your line.

Key Features:
- 5 ball bearings with corrosion-resistant stainless steel construction
- Shimano's Hagane Body for ultimate durability
- Smooth drag system with fine adjustments
- Lightweight yet robust aluminum body
- Perfect for saltwater and freshwater fishing

Whether you're tackling trophy bass or deep-sea fishing, the Twin Power delivers the reliability and performance you need to land that catch of a lifetime.`,
    image: "/shimano-fishing-reel.jpg",
    images: ["/shimano-fishing-reel.jpg", "/shimano-fishing-reel.jpg", "/shimano-fishing-reel.jpg"],
    badge: "New",
    specs: {
      "Drag Type": "Carbon Fiber",
      "Ball Bearings": "5",
      "Max Drag": "18 lbs",
      "Retrieve Rate": "5.8:1",
      Weight: "8.5 oz",
      Material: "Aluminum",
    },
    relatedProducts: [2, 3, 5],
  },
  "2": {
    id: 2,
    name: "Premium Graphite Rod",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 28,
    inStock: true,
    category: "Rods",
    sku: "GRAPH-PREM-2024",
    description: "High-performance graphite fishing rod designed for precision casting and maximum sensitivity.",
    longDescription: `Engineered with premium graphite composite material, this rod offers exceptional strength-to-weight ratio. Whether you're casting lures or fishing with live bait, this rod provides the sensitivity you need to detect even the slightest bite.`,
    image: "/fishing-rod-graphite.jpg",
    images: ["/fishing-rod-graphite.jpg", "/fishing-rod-graphite.jpg"],
    badge: "Popular",
    specs: {
      Material: "Graphite Composite",
      Length: "6.6 feet",
      Weight: "4.2 oz",
      Action: "Medium",
      "Line Weight": "8-17 lbs",
      Guides: "Ceramic",
    },
    relatedProducts: [1, 4],
  },
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const product = products[id]
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useUser()
  const router = useRouter()
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Product not found</h1>
            <Link href="/shop" className="text-accent hover:text-accent/80 font-semibold">
              Back to shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const isProductFavorite = isFavorite(product.id)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8 animate-fadeInUp">
          <Link href="/" className="text-accent hover:text-accent/80">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/shop" className="text-accent hover:text-accent/80">
            Shop
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href={`/category/${product.category.toLowerCase()}`} className="text-accent hover:text-accent/80">
            {product.category}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-semibold">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="animate-fadeInUp">
            <div className="relative aspect-square mb-6 bg-muted rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                style={{ backgroundImage: `url('${product.images[selectedImage]}')` }}
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-accent text-primary text-xs font-bold rounded-full shadow-lg">
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-destructive text-white text-sm font-bold rounded-lg">
                  -{discount}%
                </div>
              )}
            </div>

            <div className="flex gap-3">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-accent" : "border-border"
                  }`}
                >
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-slideInRight">
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">{product.category}</p>
                  <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    isProductFavorite ? "bg-accent text-primary" : "bg-muted text-foreground"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isProductFavorite ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-4xl font-bold text-primary">${product.price}</p>
                {product.originalPrice > product.price && (
                  <p className="text-xl text-muted-foreground line-through">${product.originalPrice}</p>
                )}
              </div>

              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">{product.description}</p>

              {product.inStock ? (
                <div className="flex items-center gap-2 text-green-600 font-semibold mb-8">
                  <div className="w-3 h-3 bg-green-600 rounded-full" />
                  In Stock
                </div>
              ) : (
                <div className="flex items-center gap-2 text-destructive font-semibold mb-8">
                  <div className="w-3 h-3 bg-destructive rounded-full" />
                  Out of Stock
                </div>
              )}
            </div>

            {/* Purchase Options */}
            <Card className="p-6 border border-border mb-8 bg-card">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-muted-foreground">({quantity} available)</span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className={`w-full text-lg py-6 rounded-lg font-semibold gap-2 transition-all duration-300 ${
                    addedToCart
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-accent hover:bg-accent/90 text-primary hover:shadow-lg"
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="w-full py-6 rounded-lg font-semibold bg-transparent"
                >
                  Buy Now
                </Button>
              </div>
            </Card>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Truck className="w-6 h-6 mx-auto mb-2 text-accent" />
                <p className="text-sm font-semibold">Free Shipping</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Shield className="w-6 h-6 mx-auto mb-2 text-accent" />
                <p className="text-sm font-semibold">Warranty</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-accent" />
                <p className="text-sm font-semibold">Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-16 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-bold text-foreground mb-6">Specifications</h2>
          <Card className="border border-border p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center pb-4 border-b border-border last:border-b-0"
                >
                  <span className="text-muted-foreground font-semibold">{key}</span>
                  <span className="text-foreground font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Description */}
        <div className="mb-16 animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-3xl font-bold text-foreground mb-6">Product Details</h2>
          <Card className="border border-border p-8 bg-card">
            <p className="text-foreground text-lg leading-relaxed whitespace-pre-line">{product.longDescription}</p>
          </Card>
        </div>

        {/* Related Products */}
        <div className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-3xl font-bold text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedId, idx) => {
              const relatedProduct = products[String(relatedId)]
              if (!relatedProduct) return null
              return (
                <Link key={relatedId} href={`/product/${relatedId}`}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 group cursor-pointer h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${relatedProduct.image}')` }}
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-5 bg-card">
                      <h3 className="font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-2xl font-bold text-primary mt-auto">${relatedProduct.price}</p>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
