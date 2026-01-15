"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Package, Heart, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useUser } from "@/contexts/user-context"

export default function AccountPage() {
  const { isLoggedIn, profile, orders, logout, updateProfile } = useUser()
  const [activeTab, setActiveTab] = useState("orders")
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(
    profile || {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  )

  if (!isLoggedIn || !profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Sign in to your account</h1>
          <p className="text-muted-foreground mb-8">Access your orders and profile information</p>
          <Link href="/checkout">
            <Button className="bg-accent hover:bg-accent/90 text-primary px-8 py-3">Checkout to Create Account</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSaveProfile = () => {
    updateProfile(editData)
    setEditMode(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Account</h1>
          <p className="text-muted-foreground">Welcome, {profile.name || "Customer"}!</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border border-border p-6 sticky top-24">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "orders" ? "bg-accent text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Package className="w-4 h-4" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile" ? "bg-accent text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "favorites" ? "bg-accent text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  Favorites
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors mt-4"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <Card className="border border-border p-8 text-center">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No orders yet</p>
                  </Card>
                ) : (
                  orders.map((order) => (
                    <Card key={order.id} className="border border-border p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                          <p
                            className={`text-sm font-semibold ${
                              order.status === "delivered"
                                ? "text-green-600"
                                : order.status === "shipped"
                                  ? "text-blue-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="border-t border-border pt-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-muted-foreground">
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Profile Information</h2>
                  <Button onClick={() => setEditMode(!editMode)} variant="outline" className="bg-transparent">
                    {editMode ? "Cancel" : "Edit"}
                  </Button>
                </div>

                <Card className="border border-border p-8">
                  {editMode ? (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          value={editData.name}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <input
                        type="tel"
                        placeholder="Phone"
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />

                      <input
                        type="text"
                        placeholder="Address"
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={editData.city}
                          onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                          className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          value={editData.state}
                          onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                          className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <input
                          type="text"
                          placeholder="ZIP"
                          value={editData.zipCode}
                          onChange={(e) => setEditData({ ...editData, zipCode: e.target.value })}
                          className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>

                      <Button
                        onClick={handleSaveProfile}
                        className="w-full bg-accent hover:bg-accent/90 text-primary text-lg py-6 font-semibold rounded-lg"
                      >
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                        <p className="text-lg font-semibold text-foreground">{profile.name || "—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="text-lg font-semibold text-foreground">{profile.email || "—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <p className="text-lg font-semibold text-foreground">{profile.phone || "—"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                        <p className="text-lg font-semibold text-foreground">{profile.address || "—"}</p>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">City</p>
                          <p className="text-lg font-semibold text-foreground">{profile.city || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">State</p>
                          <p className="text-lg font-semibold text-foreground">{profile.state || "—"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">ZIP</p>
                          <p className="text-lg font-semibold text-foreground">{profile.zipCode || "—"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Favorite Items</h2>
                <Card className="border border-border p-8 text-center">
                  <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No favorite items yet</p>
                  <Link href="/shop" className="text-accent hover:text-accent/80 font-semibold mt-4 inline-block">
                    Continue Shopping →
                  </Link>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
