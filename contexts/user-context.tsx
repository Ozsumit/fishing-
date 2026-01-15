"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Order {
  id: string
  date: string
  total: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  status: "pending" | "shipped" | "delivered"
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

export interface UserContextType {
  isLoggedIn: boolean
  profile: UserProfile | null
  orders: Order[]
  favorites: number[]
  login: (email: string, password: string) => void
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
  addOrder: (order: Order) => void
  toggleFavorite: (productId: number) => void
  isFavorite: (productId: number) => boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [mounted, setMounted] = useState(false)

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedOrders = localStorage.getItem("orders")
    const savedFavorites = localStorage.getItem("favorites")

    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setProfile(userData.profile)
        setIsLoggedIn(userData.isLoggedIn)
      } catch (e) {
        console.error("Failed to load user data:", e)
      }
    }

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error("Failed to load orders:", e)
      }
    }

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error("Failed to load favorites:", e)
      }
    }

    setMounted(true)
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      if (isLoggedIn && profile) {
        localStorage.setItem("user", JSON.stringify({ isLoggedIn, profile }))
      }
      localStorage.setItem("orders", JSON.stringify(orders))
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [isLoggedIn, profile, orders, favorites, mounted])

  const login = (email: string, password: string) => {
    // Placeholder: In a real app, this would authenticate against a backend
    if (email && password) {
      const newProfile: UserProfile = {
        ...DEFAULT_PROFILE,
        email,
        name: email.split("@")[0],
      }
      setProfile(newProfile)
      setIsLoggedIn(true)
    }
  }

  const logout = () => {
    setProfile(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  }

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (profile) {
      const updatedProfile = { ...profile, ...updates }
      setProfile(updatedProfile)
    }
  }

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [order, ...prevOrders])
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId],
    )
  }

  const isFavorite = (productId: number) => {
    return favorites.includes(productId)
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        profile,
        orders,
        favorites,
        login,
        logout,
        updateProfile,
        addOrder,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
