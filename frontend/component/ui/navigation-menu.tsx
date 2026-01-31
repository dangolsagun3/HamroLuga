"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCart, Search, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NavigationMenuProps {
  cartCount?: number;
  onSearch?: (query: string) => void;
}

export function NavigationMenuItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

export function NavigationMenuTrigger({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button className="relative text-sm font-semibold text-gray-700 hover:text-blue-600 transition after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full">
      {children}
    </button>
  )
}

export function NavigationMenuDemo({ cartCount = 0, onSearch }: NavigationMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">🛍️</span>
            <span>HamroLuga</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-black hover:text-blue-600 transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-black hover:text-blue-600 transition font-medium">
              Products
            </Link>
            <Link href="/about" className="text-black hover:text-blue-600 transition font-medium">
              About
            </Link>
            <Link href="/contact" className="text-black hover:text-blue-600 transition font-medium">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </form>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Account */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User size={20} />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" className="relative bg-blue-600 hover:bg-blue-700 transition text-black">
                <ShoppingCart size={20} />
                <span className="ml-2 hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
                Contact
              </Link>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Search size={20} />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavigationMenuDemo
