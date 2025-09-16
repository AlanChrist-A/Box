"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Droplets, Hammer, Shirt, Cpu, Leaf } from "lucide-react"

const categories = [
  { id: "all", name: "All Categories", icon: null, count: 1247 },
  { id: "metals", name: "Metals", icon: Hammer, count: 324 },
  { id: "chemicals", name: "Chemicals", icon: Droplets, count: 189 },
  { id: "textiles", name: "Textiles", icon: Shirt, count: 156 },
  { id: "electronics", name: "Electronics", icon: Cpu, count: 98 },
  { id: "energy", name: "Energy", icon: Zap, count: 234 },
  { id: "organic", name: "Organic Waste", icon: Leaf, count: 246 },
]

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Browse Categories</h2>
        <Badge variant="secondary" className="text-sm">
          {categories.find((c) => c.id === selectedCategory)?.count || 0} products
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id

          return (
            <Button
              key={category.id}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`transition-all duration-200 ${
                isSelected ? "bg-primary text-primary-foreground shadow-lg scale-105" : "hover:bg-muted hover:scale-105"
              }`}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {category.name}
              <Badge variant={isSelected ? "secondary" : "outline"} className="ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
