import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, MapPin, Star } from "lucide-react"
import { ChatWidget } from "@/components/chat/chat-widget"

const featuredProducts = [
  {
    id: 1,
    title: "Steel Shavings - Grade A",
    supplier: "MetalWorks Industries",
    location: "Detroit, MI",
    price: "₹450/ton",
    rating: 4.8,
    image: "/steel-shavings-industrial-metal.jpg",
    category: "Metals",
    quantity: "50 tons available",
    description: "High-quality steel shavings from precision machining operations",
  },
  {
    id: 2,
    title: "Cotton Textile Waste",
    supplier: "FabricCorp Ltd",
    location: "Charlotte, NC",
    price: "₹120/ton",
    rating: 4.6,
    image: "/cotton-textile-waste-fabric.jpg",
    category: "Textiles",
    quantity: "25 tons available",
    description: "Clean cotton waste suitable for recycling and upcycling",
  },
  {
    id: 3,
    title: "Chemical Solvents Mix",
    supplier: "ChemTech Solutions",
    location: "Houston, TX",
    price: "₹800/barrel",
    rating: 4.9,
    image: "/chemical-solvents-industrial-barrels.jpg",
    category: "Chemicals",
    quantity: "100 barrels available",
    description: "Mixed solvents from pharmaceutical manufacturing",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 page-transition">
      <div className="space-y-8">
        <div className="text-center space-y-4 stagger-item">
          <h2 className="text-3xl font-bold text-foreground">Featured By-Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover high-quality materials from trusted suppliers. All products are verified and ready for immediate
            purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <Card
              key={product.id}
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-card stagger-item hover-lift`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground transition-all duration-300 group-hover:scale-105">
                  {product.category}
                </Badge>
                <div className="absolute top-3 right-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 transition-all duration-300 group-hover:bg-background">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-medium">{product.rating}</span>
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Supplier:</span>
                    <span className="text-sm font-medium">{product.supplier}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{product.location}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{product.quantity}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-105">
                      {product.price}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="transition-all duration-200 hover:bg-muted bg-transparent button-press hover:scale-105 focus-ring"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 transition-all duration-200 button-press hover:scale-105 focus-ring"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8 stagger-item">
          <Button
            size="lg"
            variant="outline"
            className="border-2 hover:bg-muted transition-all duration-200 bg-transparent button-press hover-lift focus-ring"
          >
            View All Products
          </Button>
        </div>
      </div>
      <ChatWidget />
    </section>
  )
}
