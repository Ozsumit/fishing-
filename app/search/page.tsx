"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart, SearchIcon, Sliders } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"

const allProducts = [
  {
    id: 1,
    name: "Shimano Twin Power Reel",
    price: 289.99,
    category: "reels",
    rating: 4.8,
    reviews: 42,
    image: "/shimano-fishing-reel.jpg",
    description: "High-performance fishing reel for saltwater and freshwater",
    tags: ["reel", "shimano", "premium", "saltwater"],
  },
  {
    id: 2,
    name: "Premium Graphite Rod",
    price: 199.99,
    category: "rods",
    rating: 4.6,
    reviews: 28,
    image: "/fishing-rod-graphite.jpg",
    description: "Professional graphite fishing rod with precision casting",
    tags: ["rod", "graphite", "casting", "professional"],
  },
  {
    id: 3,
    name: "Braided Fishing Line 300m",
    price: 34.99,
    category: "lines",
    rating: 4.7,
    reviews: 156,
    image: "/braided-fishing-line.jpg",
    description: "Strong braided line for reliable fishing",
    tags: ["line", "braided", "durable", "freshwater"],
  },
  {
    id: 4,
    name: "Assorted Lure Set",
    price: 49.99,
    category: "lures",
    rating: 4.5,
    reviews: 89,
    image: "/fishing-lure-set.jpg",
    description: "Complete set of fishing lures for various conditions",
    tags: ["lure", "set", "assorted", "versatile"],
  },
  {
    id: 5,
    name: "Digital Fish Finder",
    price: 149.99,
    category: "accessories",
    rating: 4.9,
    reviews: 112,
    image: "/fish-finder-device.jpg",
    description: "Advanced technology for locating fish",
    tags: ["fish finder", "electronics", "technology", "advanced"],
  },
  {
    id: 6,
    name: "Premium Tackle Backpack",
    price: 89.99,
    category: "accessories",
    rating: 4.6,
    reviews: 67,
    image: "/fishing-backpack-tactical.jpg",
    description: "Durable tactical backpack for gear organization",
    tags: ["backpack", "storage", "tactical", "organization"],
  },
  {
    id: 7,
    name: "Carbon Fiber Lightweight Rod",
    price: 249.99,
    category: "rods",
    rating: 4.7,
    reviews: 35,
    image: "/fishing-rod-graphite.jpg",
    description: "Ultra-lightweight carbon fiber construction",
    tags: ["rod", "carbon", "lightweight", "professional"],
  },
  {
    id: 8,
    name: "Abu Garcia Reel Pro",
    price: 199.99,
    category: "reels",
    rating: 4.4,
    reviews: 22,
    image: "/shimano-fishing-reel.jpg",
    description: "Professional baitcasting reel",
    tags: ["reel", "abu garcia", "baitcaster", "professional"],
  },
]

type SortOption = "relevance" | "price-low" | "price-high" | "rating" | "newest"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState<SortOption>("relevance")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [searchQuery, selectedCategory, priceRange])

  // Sorting logic
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => b.id - a.id)
      case "relevance":
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const categories = ["reels", "rods", "lines", "lures", "accessories"]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-6 animate-fadeInUp">Search Products</h1>

          {/* Search Bar */}
          <div className="relative mb-8 animate-fadeInUp">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by product name, features, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-lg"
            />
          </div>

          <div className="flex items-center justify-between animate-fadeInUp">
            <p className="text-muted-foreground">
              {sortedProducts.length} {sortedProducts.length === 1 ? "result" : "results"} found
            </p>
            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Sliders className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`transition-all duration-300 ${filtersOpen ? "w-full md:w-64 block" : "hidden md:block md:w-64"}`}
          >
            <div className="sticky top-24 space-y-6">
              {/* Category Filter */}
              <Card className="border border-border p-6 animate-fadeInUp">
                <h3 className="font-semibold text-foreground mb-4 text-lg">Category</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                      selectedCategory === null ? "bg-accent text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-4 py-3 rounded-lg transition-all font-medium capitalize ${
                        selectedCategory === cat ? "bg-accent text-primary" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Price Filter */}
              <Card className="border border-border p-6 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
                <h3 className="font-semibold text-foreground mb-4 text-lg">Price Range</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">${priceRange[0]}</span>
                    <span className="text-sm font-semibold text-foreground">${priceRange[1]}</span>
                  </div>
                </div>
              </Card>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sortedProducts.map((product, idx) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 flex flex-col group"
                    style={{ animationDelay: `${(idx % 6) * 0.1}s` }}
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${product.image}')` }}
                      />
                      <button className="absolute top-4 right-4 p-3 rounded-full bg-white/90 hover:bg-white text-primary transition-all duration-300 hover:scale-110 shadow-md">
                        <Heart className={`w-5 h-5 ${hoveredId === product.id ? "fill-accent text-accent" : ""}`} />
                      </button>
                    </div>

                    <div className="flex flex-col flex-1 p-5 bg-card">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300 text-lg">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                      <div className="flex items-center gap-2 mb-4">
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
                        <p className="text-2xl font-bold text-primary mb-3">${product.price}</p>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-primary rounded-lg font-semibold transition-all duration-300 gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <SearchIcon className="w-16 h-16 text-muted-foreground mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-2">No products found</h2>
                <p className="text-muted-foreground mb-8 max-w-sm">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                    setPriceRange([0, 500])
                  }}
                  className="bg-accent hover:bg-accent/90 text-primary px-8 py-3 font-semibold"
                >
                  Clear Filters
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
