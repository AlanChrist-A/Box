"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Package, ShoppingCart, BarChart3, Settings, Plus, Bell, HelpCircle } from "lucide-react"

interface DashboardSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, badge: null },
  { id: "products", label: "Products", icon: Package, badge: "24" },
  { id: "orders", label: "Orders", icon: ShoppingCart, badge: "8" },
  { id: "analytics", label: "Analytics", icon: BarChart3, badge: null },
  { id: "settings", label: "Settings", icon: Settings, badge: null },
]

export function DashboardSidebar({ activeTab, onTabChange }: DashboardSidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
      <div className="p-6 space-y-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-primary hover:bg-primary/90 transition-all duration-200">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
              <HelpCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Dashboard</div>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start transition-all duration-200 ${
                  isActive ? "bg-primary/10 text-primary border-primary/20" : "hover:bg-muted"
                }`}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            )
          })}
        </nav>

        {/* Stats Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="text-sm font-medium text-foreground">This Month</div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Revenue</span>
              <span className="font-medium text-foreground">$12,450</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Orders</span>
              <span className="font-medium text-foreground">47</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Products</span>
              <span className="font-medium text-foreground">24</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
