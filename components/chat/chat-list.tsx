"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MessageCircle, Clock, User } from "lucide-react"

interface ChatConversation {
  id: string
  buyerName: string
  buyerEmail: string
  productName: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  status: "active" | "archived"
}

const conversations: ChatConversation[] = [
  {
    id: "1",
    buyerName: "Industrial Corp",
    buyerEmail: "procurement@industrial.com",
    productName: "Steel Shavings - Grade A",
    lastMessage: "What's the minimum order quantity?",
    timestamp: "2 min ago",
    unreadCount: 2,
    status: "active",
  },
  {
    id: "2",
    buyerName: "MetalWorks Ltd",
    buyerEmail: "orders@metalworks.com",
    productName: "Aluminum Scrap - 6061",
    lastMessage: "Can you provide a certificate of analysis?",
    timestamp: "1 hour ago",
    unreadCount: 0,
    status: "active",
  },
  {
    id: "3",
    buyerName: "FabricCorp Inc",
    buyerEmail: "supply@fabriccorp.com",
    productName: "Cotton Textile Waste",
    lastMessage: "Thanks for the quick response!",
    timestamp: "3 hours ago",
    unreadCount: 1,
    status: "active",
  },
  {
    id: "4",
    buyerName: "ChemTech Solutions",
    buyerEmail: "purchasing@chemtech.com",
    productName: "Chemical Solvents Mix",
    lastMessage: "Order has been placed successfully",
    timestamp: "1 day ago",
    unreadCount: 0,
    status: "archived",
  },
]

interface ChatListProps {
  onSelectConversation?: (conversation: ChatConversation) => void
}

export function ChatList({ onSelectConversation }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.productName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeConversations = filteredConversations.filter((conv) => conv.status === "active")
  const archivedConversations = filteredConversations.filter((conv) => conv.status === "archived")

  const handleSelectConversation = (conversation: ChatConversation) => {
    setSelectedId(conversation.id)
    onSelectConversation?.(conversation)
  }

  return (
    <Card className="h-full border-0 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span>Messages</span>
          <Badge variant="secondary" className="ml-auto">
            {activeConversations.reduce((acc, conv) => acc + conv.unreadCount, 0)}
          </Badge>
        </CardTitle>
        <CardDescription>Manage conversations with potential buyers</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Active Conversations */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">Active ({activeConversations.length})</div>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {activeConversations.map((conversation) => (
                <Button
                  key={conversation.id}
                  variant={selectedId === conversation.id ? "secondary" : "ghost"}
                  className={`w-full p-4 h-auto justify-start transition-all duration-200 ${
                    selectedId === conversation.id ? "bg-primary/10 border-primary/20" : "hover:bg-muted"
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-foreground text-sm">{conversation.buyerName}</div>
                        {conversation.unreadCount > 0 && (
                          <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{conversation.productName}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{conversation.lastMessage}</div>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{conversation.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Archived Conversations */}
        {archivedConversations.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-muted-foreground">Archived ({archivedConversations.length})</div>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {archivedConversations.map((conversation) => (
                  <Button
                    key={conversation.id}
                    variant="ghost"
                    className="w-full p-3 h-auto justify-start opacity-60 hover:opacity-100 transition-all duration-200"
                    onClick={() => handleSelectConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 text-left space-y-1">
                        <div className="font-medium text-foreground text-sm">{conversation.buyerName}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{conversation.lastMessage}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
