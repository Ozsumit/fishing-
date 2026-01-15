"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart()

  const subtotal = cartTotal
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2 animate-fadeInUp">Shopping Cart</h1>
          <p className="text-muted-foreground text-lg">{items.length} items in your cart</p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-sm">
              Discover our amazing collection of fishing gear and add items to get started.
            </p>
            <Link href="/shop">
              <Button className="bg-accent hover:bg-accent/90 text-primary px-8 py-3 text-lg font-semibold">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 animate-fadeInUp">
              <Card className="border border-border p-6">
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex gap-6 pb-6 border-b border-border last:border-b-0"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {/* Product Image */}
                      <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${item.image}')` }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-semibold text-foreground text-lg hover:text-accent transition-colors mb-2">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-2xl font-bold text-primary">${item.price}</p>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 hover:bg-muted transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 hover:bg-muted transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Link
                href="/shop"
                className="text-accent hover:text-accent/80 font-semibold mt-6 inline-flex items-center gap-2"
              >
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="animate-slideInRight">
              <Card className="border border-border p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-2xl font-bold text-foreground mb-8">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-primary text-lg py-6 font-semibold rounded-lg mb-3 transition-all duration-300 hover:shadow-lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button variant="outline" className="w-full py-6 font-semibold bg-transparent">
                  Continue Shopping
                </Button>

                {subtotal < 100 && (
                  <p className="text-sm text-muted-foreground mt-4 text-center bg-muted p-3 rounded-lg">
                    Free shipping on orders over $100
                  </p>
                )}
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
