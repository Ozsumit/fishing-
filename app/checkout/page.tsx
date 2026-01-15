"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart()
  const { addOrder, updateProfile } = useUser()
  const router = useRouter()
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [orderId, setOrderId] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNextStep = () => {
    if (step === "shipping") {
      if (!formData.firstName || !formData.email || !formData.address) {
        alert("Please fill in all shipping fields")
        return
      }
      updateProfile({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
      })
      setStep("payment")
    } else if (step === "payment") {
      if (!formData.cardNumber || !formData.expiry || !formData.cvc) {
        alert("Please fill in all payment fields")
        return
      }

      const newOrderId = `#ORD-${Date.now()}`
      const order = {
        id: newOrderId,
        date: new Date().toLocaleDateString(),
        total,
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        status: "pending" as const,
      }

      addOrder(order)
      setOrderId(newOrderId)
      clearCart()
      setStep("confirmation")
    }
  }

  const subtotal = cartTotal
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0 && step === "shipping") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add items to proceed with checkout</p>
          <Link href="/shop">
            <Button className="bg-accent hover:bg-accent/90 text-primary px-8 py-3">Continue Shopping</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-8 animate-fadeInUp">Checkout</h1>

          {/* Progress Indicator */}
          <div className="flex items-center gap-4 mb-12">
            {["shipping", "payment", "confirmation"].map((s, idx) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    step === s
                      ? "bg-accent text-primary scale-110"
                      : idx < ["shipping", "payment", "confirmation"].indexOf(step)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {idx < ["shipping", "payment", "confirmation"].indexOf(step) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className="flex-1 h-0.5 mx-2 bg-border" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border border-border p-8 animate-fadeInUp">
              {step === "shipping" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Shipping Address</h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      placeholder="ZIP"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <Button
                    onClick={handleNextStep}
                    className="w-full bg-accent hover:bg-accent/90 text-primary text-lg py-6 font-semibold rounded-lg mt-8"
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">Payment Method</h2>

                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border-2 border-accent">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <span className="font-semibold text-foreground">Credit Card</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      name="cvc"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    Your payment information is secure and encrypted
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setStep("shipping")}
                      variant="outline"
                      className="flex-1 py-6 font-semibold bg-transparent"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="flex-1 bg-accent hover:bg-accent/90 text-primary text-lg py-6 font-semibold rounded-lg"
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {step === "confirmation" && (
                <div className="text-center py-12 animate-scaleIn">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Thank you for your purchase. Your order has been received.
                  </p>

                  <div className="bg-muted p-6 rounded-lg mb-8 text-left space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Number:</span>
                      <span className="font-semibold text-foreground">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Delivery:</span>
                      <span className="font-semibold text-foreground">5-7 Business Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Amount:</span>
                      <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Link href="/" className="flex-1">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-primary px-8 py-3 text-lg font-semibold">
                        Back to Home
                      </Button>
                    </Link>
                    <Link href="/account" className="flex-1">
                      <Button variant="outline" className="w-full py-3 text-lg font-semibold bg-transparent">
                        View Orders
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="animate-slideInRight">
            <Card className="border border-border p-6 sticky top-24">
              <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm text-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm text-foreground">
                  <span>Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
