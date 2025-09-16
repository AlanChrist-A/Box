"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChatWidget } from "@/components/chat/chat-widget"
import { NotificationDialog } from "@/components/notifications/notification-dialog"
import {
  Star,
  MapPin,
  Truck,
  Shield,
  MessageCircle,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Package,
  Clock,
  Award,
  Bell,
  ShoppingCart,
} from "lucide-react"

interface Product {
  id: number
  title: string
  supplier: string
  location: string
  price: string
  rating: number
  reviews: number
  image: string
  images: string[]
  category: string
  quantity: string
  minOrder: string
  description: string
  specifications: Record<string, string>
  supplierInfo: {
    name: string
    established: string
    certifications: string[]
    rating: number
    totalReviews: number
  }
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showNotifyDialog, setShowNotifyDialog] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const startChat = () => {
    setShowChat(true)
  }

  const addToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      supplier: product.supplier,
      image: product.image,
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += quantity
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem("cart", JSON.stringify(existingCart))

    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: existingCart }))

    // Show success notification with better styling
    const notification = document.createElement("div")
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right"
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>Added ${quantity} ton(s) of ${product.title} to cart!</span>
      </div>
    `
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => window.close()}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.title}</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{product.location}</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price per ton:</span>
                <span className="text-3xl font-bold text-primary">{product.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Available quantity:</span>
                <span className="font-semibold">{product.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Minimum order:</span>
                <span className="font-semibold">{product.minOrder}</span>
              </div>
            </div>

            {/* Order Form */}
            <Card>
              <CardHeader>
                <CardTitle>Place Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity (tons)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Estimate:</span>
                  <span className="text-primary">
                    ₹{(Number.parseFloat(product.price.replace("₹", "").replace(",", "")) * quantity).toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="col-span-2">
                    <Package className="w-4 h-4 mr-2" />
                    Request Quote
                  </Button>
                  <Button variant="outline" onClick={addToCart}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      // Switch to chat tab
                      const chatTab = document.querySelector('[data-value="chat"]') as HTMLElement
                      if (chatTab) {
                        chatTab.click()
                      }
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Supplier
                  </Button>
                </div>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowNotifyDialog(true)}>
                  <Bell className="w-4 h-4 mr-2" />
                  Notify When Available
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="supplier">Supplier Info</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="chat" data-value="chat">
              Chat with Supplier
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supplier" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Supplier Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{product.supplierInfo.name}</h3>
                    <p className="text-muted-foreground">Established {product.supplierInfo.established}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{product.supplierInfo.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.supplierInfo.totalReviews} reviews</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.supplierInfo.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary">
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock reviews */}
                  <div className="border-b pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="font-semibold">John D.</span>
                      <span className="text-muted-foreground text-sm">2 weeks ago</span>
                    </div>
                    <p className="text-muted-foreground">
                      Excellent quality aluminum scrap. Very clean and well-sorted. Will definitely order again.
                    </p>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                      <span className="font-semibold">Sarah M.</span>
                      <span className="text-muted-foreground text-sm">1 month ago</span>
                    </div>
                    <p className="text-muted-foreground">Good product, fast delivery. Packaging could be improved.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Standard Shipping</h4>
                    <p className="text-muted-foreground">5-7 business days • Free for orders over 10 tons</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Express Shipping</h4>
                    <p className="text-muted-foreground">2-3 business days • Additional charges apply</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Secure Packaging</h4>
                    <p className="text-muted-foreground">All products are securely packaged and insured</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Chat with {product.supplierInfo.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Discuss pricing, specifications, and shipping details directly with the supplier
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96">
                  <ChatWidget
                    productId={product.id.toString()}
                    sellerName={product.supplierInfo.name}
                    productName={product.title}
                    isEmbedded={true}
                    showHeader={false}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Notification Dialog */}
      <NotificationDialog
        isOpen={showNotifyDialog}
        onClose={() => setShowNotifyDialog(false)}
        productName={product.title}
        productId={product.id.toString()}
      />
    </div>
  )
}
