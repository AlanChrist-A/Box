import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users, Eye, MessageCircle } from "lucide-react"

const recentOrders = [
  {
    id: "ORD-001",
    product: "Steel Shavings - Grade A",
    buyer: "Industrial Corp",
    amount: "$2,250",
    status: "completed",
    date: "2 hours ago",
  },
  {
    id: "ORD-002",
    product: "Aluminum Scrap",
    buyer: "MetalWorks Ltd",
    amount: "$1,800",
    status: "processing",
    date: "5 hours ago",
  },
  {
    id: "ORD-003",
    product: "Cotton Textile Waste",
    buyer: "FabricCorp",
    amount: "$600",
    status: "pending",
    date: "1 day ago",
  },
]

const topProducts = [
  {
    name: "Steel Shavings - Grade A",
    views: 1247,
    inquiries: 23,
    revenue: "$8,450",
    trend: "up",
  },
  {
    name: "Aluminum Scrap - 6061",
    views: 892,
    inquiries: 18,
    revenue: "$6,200",
    trend: "up",
  },
  {
    name: "Cotton Textile Waste",
    views: 634,
    inquiries: 12,
    revenue: "$3,800",
    trend: "down",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8 page-transition">
      {/* Header */}
      <div className="space-y-2 stagger-item">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md stagger-item hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary transition-all duration-300 hover:scale-110" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$45,231</div>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+20.1% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md stagger-item hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            <Package className="h-4 w-4 text-secondary transition-all duration-300 hover:scale-110" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+3 new this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md stagger-item hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-accent transition-all duration-300 hover:scale-110" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">127</div>
            <div className="flex items-center space-x-1 text-xs text-red-600">
              <TrendingDown className="h-3 w-3" />
              <span>-5.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md stagger-item hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Buyers</CardTitle>
            <Users className="h-4 w-4 text-primary transition-all duration-300 hover:scale-110" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">89</div>
            <div className="flex items-center space-x-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+12 new this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card className="border-0 shadow-md stagger-item hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Recent Orders</CardTitle>
            <CardDescription>Your latest transactions and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={order.id}
                className={`flex items-center justify-between p-4 bg-muted/30 rounded-lg transition-all duration-300 hover:bg-muted/50 hover:scale-105 stagger-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-1">
                  <div className="font-medium text-foreground">{order.product}</div>
                  <div className="text-sm text-muted-foreground">
                    {order.buyer} • {order.date}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-semibold text-foreground">{order.amount}</div>
                  <Badge
                    variant={
                      order.status === "completed" ? "default" : order.status === "processing" ? "secondary" : "outline"
                    }
                    className="text-xs transition-all duration-300 hover:scale-105"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent button-press hover-lift focus-ring">
              View All Orders
            </Button>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="border-0 shadow-md stagger-item hover-lift">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Top Performing Products</CardTitle>
            <CardDescription>Your best-selling products this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 bg-muted/30 rounded-lg transition-all duration-300 hover:bg-muted/50 hover:scale-105 stagger-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-2">
                  <div className="font-medium text-foreground">{product.name}</div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{product.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{product.inquiries}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="font-semibold text-foreground">{product.revenue}</div>
                  <div
                    className={`flex items-center space-x-1 text-xs ${
                      product.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent button-press hover-lift focus-ring">
              View All Products
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
