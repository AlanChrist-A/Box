"use client"

import { useState } from "react"
import { Navbar } from "@/components/navigation/navbar"
import { ProductGrid } from "@/components/marketplace/product-grid"
import { CategoryFilter } from "@/components/marketplace/category-filter"
import { HeroSection } from "@/components/marketplace/hero-section"
import { FeaturedProducts } from "@/components/marketplace/featured-products"

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 page-transition">
        <HeroSection />
        <FeaturedProducts />
        <div className="py-8">
          <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
          <ProductGrid category={selectedCategory} searchQuery={searchQuery} />
        </div>
      </main>
    </div>
  )
}
