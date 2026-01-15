"use client"

import { Mail, MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-medium text-xs">
                A
              </div>
              <span className="font-light text-lg tracking-wide">AnglersBay</span>
            </div>
            <p className="text-foreground/50 text-sm font-light leading-relaxed">
              Premium fishing and water sports equipment for the discerning angler.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-light text-sm tracking-wide uppercase text-foreground mb-6">Shop</h4>
            <ul className="space-y-3">
              {["Reels", "Rods", "Lures", "Apparel"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-light text-sm tracking-wide uppercase text-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-foreground/60 hover:text-foreground transition-colors text-sm font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-light text-sm tracking-wide uppercase text-foreground mb-6">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-foreground/50" />
                <span className="text-foreground/60 font-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-foreground/50" />
                <span className="text-foreground/60 font-light">support@anglersbay.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-3.5 h-3.5 text-foreground/50" />
                <span className="text-foreground/60 font-light">123 Harbor St, Coastal City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/50 text-xs tracking-wide">© 2026 ANGLERSBAY. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="text-foreground/50 hover:text-foreground transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
