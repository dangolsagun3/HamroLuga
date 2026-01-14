"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export function NavigationMenu({ children }: { children: React.ReactNode }) {
  return (
    <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {children}
      </div>
    </nav>
  )
}

export function NavigationMenuList({ children }: { children: React.ReactNode }) {
  return <ul className="flex items-center gap-8">{children}</ul>
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

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <Link href="/" className="text-xl font-bold text-blue-600">
        🛍️ MyShop
      </Link>

      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <button className="relative flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            <ShoppingCart size={18} />
            <span className="text-sm font-medium">Cart</span>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              
            </span>
          </button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavigationMenuDemo
