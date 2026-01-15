"use client";

import { useState } from "react";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Rods", href: "/category/rods" },
    { label: "Reels", href: "/category/reels" },
    { label: "Lures", href: "/category/lures" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 text-foreground border-b border-border backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-3 font-light text-xl tracking-wide hover:opacity-70 transition-opacity duration-300"
          >
            <div className="w-7 h-7 rounded bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm">
              F
            </div>
            <span className="hidden sm:inline text-foreground">Fishing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-light tracking-wide text-foreground/70 hover:text-foreground transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link
              href="/search"
              className="p-2 text-foreground/60 hover:text-foreground transition-all duration-300 hover:bg-muted rounded-md"
            >
              <Search className="w-4 h-4" />
            </Link>
            <Link
              href="/account"
              className="p-2 text-foreground/60 hover:text-foreground transition-all duration-300 hover:bg-muted rounded-md"
            >
              <User className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              className="p-2 text-foreground/60 hover:text-foreground transition-all duration-300 hover:bg-muted rounded-md relative"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground/60 hover:text-foreground transition-all duration-300 hover:bg-muted rounded-md"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-border animate-slowFade">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2 text-sm font-light text-foreground/70 hover:text-foreground hover:bg-muted rounded-md transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
