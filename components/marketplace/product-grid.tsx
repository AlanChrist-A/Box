"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, MapPin, Star, Heart, Eye } from "@/components/ui/icons"
import { ChatManager } from "@/components/chat/chat-manager"
import { products } from "@/lib/mock-data"

interface ProductGridProps {
  category: string
  searchQuery: string
}

export function ProductGrid({ category, searchQuery }: ProductGridProps) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeChatProduct, setActiveChatProduct] = useState<{
    id: string
    sellerName: string
    productName: string
  } | null>(null)

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.supplier.toLowerCase().includes(searchLower) ||
      product.location.toLowerCase().includes(searchLower) ||
      Object.values(product.specifications).some((spec) => spec.toLowerCase().includes(searchLower))
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const startChat = (product: any) => {
    setActiveChatProduct({
      id: product.id.toString(),
      sellerName: product.supplier,
      productName: product.title,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">{filteredProducts.length} Products Found</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button variant="outline" size="sm">
            Price: Low to High
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-card"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
              </div>
              <div className="absolute top-3 right-3 flex space-x-2">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-background"
                  onClick={() => toggleFavorite(product.id)}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                    }`}
                  />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 bg-background/90 backdrop-blur-sm hover:bg-background"
                >
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Supplier:</span>
                  <span className="font-medium text-foreground">{product.supplier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{product.location}</span>
                  </div>
                  <span className="text-muted-foreground">{product.quantity}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-2xl font-bold text-primary">{product.price}</div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="transition-all duration-200 hover:bg-muted bg-transparent"
                    onClick={() => startChat(product)}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Link href={`/product/${product.id}`}>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all duration-200">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg">No products found matching your criteria</div>
          <Button variant="outline" className="mt-4 bg-transparent">
            Clear Filters
          </Button>
        </div>
      )}

      <ChatManager
        currentProductId={activeChatProduct?.id}
        currentSellerName={activeChatProduct?.sellerName}
        currentProductName={activeChatProduct?.productName}
      />
    </div>
  )
}
