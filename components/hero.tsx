"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export function Hero() {
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      title: "Deep Sea Fishing",
      subtitle: "Experience the ultimate adventure",
      image: "/professional-deep-sea-fishing-boat.jpg",
      cta: "Explore Reels",
      ctaLink: "/category/reels",
    },
    {
      title: "Premium Equipment",
      subtitle: "Precision engineered for success",
      image: "/high-end-fishing-reel-equipment.jpg",
      cta: "Shop Now",
      ctaLink: "/category/rods",
    },
    {
      title: "Water Sports Gear",
      subtitle: "Master the waves with confidence",
      image: "/water-sports-diving-equipment.jpg",
      cta: "Browse Collection",
      ctaLink: "/category/diving",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-96 md:h-[600px] overflow-hidden bg-background">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1200 ease-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <div className={`${index === current ? "animate-slowFade" : ""}`}>
              <p className="text-xs md:text-sm uppercase tracking-widest text-white/60 mb-4">Premium Collection</p>
              <h1 className="text-5xl md:text-7xl font-light mb-4 text-balance tracking-tight">{slide.title}</h1>
              <p className="text-base md:text-lg text-white/80 mb-12 font-light">{slide.subtitle}</p>
              <Link
                href={slide.ctaLink}
                className="inline-block px-8 py-3 bg-accent text-accent-foreground font-light tracking-wide rounded-sm hover:bg-accent/90 transition-all duration-500 hover:shadow-lg"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-none text-white/60 hover:text-white transition-colors duration-300 hover:bg-white/10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-none text-white/60 hover:text-white transition-colors duration-300 hover:bg-white/10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-500 rounded-none ${
              index === current ? "bg-white w-6 h-px" : "bg-white/40 w-2 h-px hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
