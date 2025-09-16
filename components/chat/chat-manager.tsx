"use client"

import { useState, useEffect } from "react"
import { ChatWidget } from "./chat-widget"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Minimize2, Maximize2 } from "lucide-react"

interface ChatSession {
  id: string
  productId: string
  sellerId: string
  sellerName: string
  productName: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isActive: boolean
}

interface ChatManagerProps {
  currentProductId?: string
  currentSellerName?: string
  currentProductName?: string
}

export function ChatManager({ currentProductId, currentSellerName, currentProductName }: ChatManagerProps) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "1",
      productId: "1",
      sellerId: "seller1",
      sellerName: "Precision Metals Co.",
      productName: "Aluminum Scrap - 6061 Grade",
      lastMessage: "Thanks for your interest! How can I help?",
      timestamp: "2:30 PM",
      unreadCount: 1,
      isActive: false,
    },
    {
      id: "2",
      productId: "2",
      sellerId: "seller2",
      sellerName: "PlastiCorp Industries",
      productName: "Polyethylene Pellets",
      lastMessage: "The pellets are available for immediate shipping",
      timestamp: "1:45 PM",
      unreadCount: 0,
      isActive: false,
    },
  ])

  const [isManagerOpen, setIsManagerOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  // Add current product chat if not exists
  useEffect(() => {
    if (currentProductId && currentSellerName && currentProductName) {
      const existingChat = chatSessions.find((chat) => chat.productId === currentProductId)
      if (!existingChat) {
        const newChat: ChatSession = {
          id: `chat-${currentProductId}`,
          productId: currentProductId,
          sellerId: `seller-${currentProductId}`,
          sellerName: currentSellerName,
          productName: currentProductName,
          lastMessage: "Chat started",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          unreadCount: 0,
          isActive: true,
        }
        setChatSessions((prev) => [newChat, ...prev])
        setIsManagerOpen(true)
      }
    }
  }, [currentProductId, currentSellerName, currentProductName])

  const activateChat = (chatId: string) => {
    setChatSessions((prev) =>
      prev.map((chat) => ({
        ...chat,
        isActive: chat.id === chatId,
        unreadCount: chat.id === chatId ? 0 : chat.unreadCount,
      })),
    )
  }

  const closeChat = (chatId: string) => {
    setChatSessions((prev) => prev.filter((chat) => chat.id !== chatId))
  }

  const totalUnreadCount = chatSessions.reduce((sum, chat) => sum + chat.unreadCount, 0)
  const activeChat = chatSessions.find((chat) => chat.isActive)

  return (
    <>
      {/* Chat Manager Toggle Button */}
      {!isManagerOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsManagerOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-2xl transition-all duration-300 transform hover:scale-110 button-press bounce-in focus-ring"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          {totalUnreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-accent text-accent-foreground pulse-glow">
              {totalUnreadCount}
            </Badge>
          )}
        </div>
      )}

      {/* Chat Manager Interface */}
      {isManagerOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex space-x-4">
          {/* Chat List */}
          <Card
            className={`w-80 shadow-2xl border-0 transition-all duration-500 ${
              isMinimized ? "h-16" : "h-96"
            } bg-card/95 backdrop-blur-sm scale-in`}
          >
            <CardHeader className="pb-3 border-b bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Messages ({chatSessions.length})</CardTitle>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-200 button-press"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-200 button-press"
                    onClick={() => setIsManagerOpen(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {!isMinimized && (
              <CardContent className="p-0">
                <ScrollArea className="h-80">
                  <div className="p-2 space-y-1">
                    {chatSessions.map((chat) => (
                      <div
                        key={chat.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                          chat.isActive ? "bg-primary/10 border border-primary/20" : ""
                        }`}
                        onClick={() => activateChat(chat.id)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">{chat.sellerName}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                            {chat.unreadCount > 0 && (
                              <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mb-1">{chat.productName}</p>
                        <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                    ))}

                    {chatSessions.length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">
                        <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No active conversations</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            )}
          </Card>

          {/* Active Chat Widget */}
          {activeChat && !isMinimized && (
            <div className="relative">
              <ChatWidget
                key={activeChat.id}
                productId={activeChat.productId}
                sellerName={activeChat.sellerName}
                productName={activeChat.productName}
                isEmbedded={true}
                onClose={() => closeChat(activeChat.id)}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}
