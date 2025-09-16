"use client"

import { useState } from "react"
import { Navbar } from "@/components/navigation/navbar"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { ProductManagement } from "@/components/dashboard/product-management"
import { OrderManagement } from "@/components/dashboard/order-management"
import { Analytics } from "@/components/dashboard/analytics"
import { Settings } from "@/components/dashboard/settings"

export function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "products":
        return <ProductManagement />
      case "orders":
        return <OrderManagement />
      case "analytics":
        return <Analytics />
      case "settings":
        return <Settings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
