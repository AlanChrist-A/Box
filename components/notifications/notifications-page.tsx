"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bell,
  Package,
  MessageCircle,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  Settings,
  Filter,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  type: "stock" | "message" | "order" | "price" | "system"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  productId?: string
  productName?: string
  actionUrl?: string
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "stock",
      title: "Product Back in Stock",
      message: "Aluminum Scrap - 6061 Grade is now available with 20 tons in stock",
      timestamp: "2 hours ago",
      isRead: false,
      productId: "1",
      productName: "Aluminum Scrap - 6061 Grade",
      actionUrl: "/product/1",
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: "Precision Metals Co. sent you a message about your inquiry",
      timestamp: "4 hours ago",
      isRead: false,
      actionUrl: "/messages",
    },
    {
      id: "3",
      type: "order",
      title: "Quote Request Received",
      message: "You have a new quote request for Steel Shavings - Grade A",
      timestamp: "6 hours ago",
      isRead: true,
      productName: "Steel Shavings - Grade A",
      actionUrl: "/dashboard",
    },
    {
      id: "4",
      type: "price",
      title: "Price Alert",
      message: "Polyethylene Pellets price dropped by 15% - Now ₹720/ton",
      timestamp: "1 day ago",
      isRead: true,
      productId: "2",
      productName: "Polyethylene Pellets",
      actionUrl: "/product/2",
    },
    {
      id: "5",
      type: "system",
      title: "Account Verification",
      message: "Your supplier account has been successfully verified",
      timestamp: "2 days ago",
      isRead: true,
      actionUrl: "/dashboard",
    },
  ])

  const [activeTab, setActiveTab] = useState("all")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <Package className="w-5 h-5 text-green-500" />
      case "message":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "order":
        return <TrendingUp className="w-5 h-5 text-purple-500" />
      case "price":
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case "system":
        return <Bell className="w-5 h-5 text-gray-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== notificationId))
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notif.isRead
    return notif.type === activeTab
  })

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your marketplace activity and product alerts</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Stock Alerts</p>
                  <p className="text-2xl font-bold">{notifications.filter((n) => n.type === "stock").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Messages</p>
                  <p className="text-2xl font-bold">{notifications.filter((n) => n.type === "message").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Notifications</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveTab("all")}>All Notifications</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("unread")}>Unread Only</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("stock")}>Stock Alerts</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("message")}>Messages</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("order")}>Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("price")}>Price Alerts</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  All ({notifications.length})
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Unread ({unreadCount})
                </TabsTrigger>
                <TabsTrigger
                  value="stock"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Stock Alerts
                </TabsTrigger>
                <TabsTrigger
                  value="message"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Messages
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                <ScrollArea className="h-96">
                  <div className="space-y-1">
                    {filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer ${
                          !notification.isRead ? "bg-primary/5 border-l-4 border-l-primary" : ""
                        }`}
                        onClick={() => {
                          markAsRead(notification.id)
                          if (notification.actionUrl) {
                            window.open(notification.actionUrl, "_blank")
                          }
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4
                                className={`text-sm font-medium ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3" />
                                  <span>{notification.timestamp}</span>
                                </div>
                                {!notification.isRead && (
                                  <Badge className="h-2 w-2 p-0 bg-primary text-white rounded-full" />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                            {notification.productName && (
                              <Badge variant="secondary" className="text-xs">
                                {notification.productName}
                              </Badge>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteNotification(notification.id)
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {filteredNotifications.length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No notifications found</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
