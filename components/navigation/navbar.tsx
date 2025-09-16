"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Factory, Search, ShoppingCart, MessageCircle, User, Menu, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const totalQuantity = cart.reduce((total: number, item: any) => total + (item.quantity || 1), 0)
      setCartItemCount(totalQuantity)
    }

    updateCartCount()

    // Listen for storage changes to update cart count
    window.addEventListener("storage", updateCartCount)

    // Custom event for cart updates within the same tab
    window.addEventListener("cartUpdated", updateCartCount)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", updateCartCount)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to browse page with search query
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-all duration-300 slide-in-right">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Factory className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary font-poppins tracking-tight">
              Utilix
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
              <Input
                type="search"
                placeholder="Search by-products, materials, or suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full transition-all duration-300 focus:ring-2 focus:ring-primary/20 hover:border-primary/30 focus-ring pr-52"
              />
            </form>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/browse">
              <Button
                variant="ghost"
                size="sm"
                className="transition-all duration-200 hover:bg-muted button-press focus-ring"
              >
                Browse
              </Button>
            </Link>
            <Link href="/sell">
              <Button
                variant="ghost"
                size="sm"
                className="transition-all duration-200 hover:bg-muted button-press focus-ring"
              >
                Sell
              </Button>
            </Link>

            <ThemeToggle />

            {/* Notifications */}
            <Link href="/notifications">
              <Button variant="ghost" size="icon" className="relative button-press focus-ring">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white pulse-glow">
                  3
                </Badge>
              </Button>
            </Link>

            {/* Messages */}
            <Link href="/messages">
              <Button variant="ghost" size="icon" className="relative button-press focus-ring">
                <MessageCircle className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-500 text-white pulse-glow">
                  2
                </Badge>
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative button-press focus-ring">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-green-500 text-white bounce-in">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full button-press focus-ring">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 scale-in">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-muted focus:bg-muted">
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-muted focus:bg-muted">
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-muted focus:bg-muted">
                  Orders
                </DropdownMenuItem>
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-muted focus:bg-muted">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="transition-colors duration-200 hover:bg-muted focus:bg-muted">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden button-press focus-ring"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-sm slide-in-left">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full focus-ring"
                />
              </form>
              <Link href="/browse">
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-200 hover:bg-muted button-press"
                >
                  Browse
                </Button>
              </Link>
              <Link href="/sell">
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-200 hover:bg-muted button-press"
                >
                  Sell
                </Button>
              </Link>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-200 hover:bg-muted button-press"
                >
                  Cart ({cartItemCount})
                </Button>
              </Link>
              <Link href="/messages">
                <Button
                  variant="ghost"
                  className="w-full justify-start transition-all duration-200 hover:bg-muted button-press"
                >
                  Messages
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="w-full justify-start transition-all duration-200 hover:bg-muted button-press"
              >
                Profile
              </Button>
              <div className="flex justify-start pt-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
