"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Minimize2, User, Clock } from "lucide-react"

interface Message {
  id: string
  sender: "buyer" | "seller"
  content: string
  timestamp: string
  senderName: string
}

interface ChatWidgetProps {
  productId?: string
  sellerName?: string
  productName?: string
  isEmbedded?: boolean
  showHeader?: boolean
  onClose?: () => void
}

export function ChatWidget({
  productId,
  sellerName = "MetalWorks Industries",
  productName = "Steel Shavings - Grade A",
  isEmbedded = false,
  showHeader = true,
  onClose,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(isEmbedded)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "seller",
      content: `Hello! Thanks for your interest in ${productName}. How can I help you today?`,
      timestamp: "2:30 PM",
      senderName: sellerName,
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "buyer",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        senderName: "You",
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate seller response
      setTimeout(() => {
        const responses = [
          "I'd be happy to provide more details. What specific information do you need?",
          "Great question! Let me check our current inventory and get back to you.",
          "We have excellent quality materials available. Would you like to discuss pricing?",
          "I can arrange a sample shipment if you're interested. What quantity are you looking for?",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const sellerResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "seller",
          content: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          senderName: sellerName,
        }
        setMessages((prev) => [...prev, sellerResponse])
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClose = () => {
    if (isEmbedded && onClose) {
      onClose()
    } else {
      setIsOpen(false)
    }
  }

  if (!isEmbedded && !isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 bg-primary hover:bg-primary/90 shadow-2xl transition-all duration-300 transform hover:scale-110 button-press bounce-in focus-ring"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-accent text-accent-foreground pulse-glow">
          1
        </Badge>
      </div>
    )
  }

  return (
    <div className={isEmbedded ? "h-full" : "fixed bottom-6 right-6 z-50"}>
      <Card
        className={`${isEmbedded ? "w-full h-full" : "w-80"} shadow-2xl border-0 transition-all duration-500 ${isMinimized ? "h-16" : isEmbedded ? "h-full" : "h-96"} bg-card/95 backdrop-blur-sm scale-in`}
      >
        {showHeader && (
          <CardHeader className="pb-3 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary-foreground/30">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-medium">{sellerName}</CardTitle>
                  <CardDescription className="text-xs text-primary-foreground/80 truncate max-w-[180px]">
                    {productName}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {!isEmbedded && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-200 button-press"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    <Minimize2 className="h-3 w-3" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-200 button-press"
                  onClick={handleClose}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
        )}

        {!isMinimized && (
          <>
            <CardContent className="p-0 flex-1">
              <ScrollArea className={`${isEmbedded ? "h-80" : "h-64"} p-4`}>
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "buyer" ? "justify-end" : "justify-start"} stagger-item`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 transition-all duration-300 hover:scale-105 ${
                          msg.sender === "buyer"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <div className="text-sm">{msg.content}</div>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs opacity-70">{msg.senderName}</div>
                          <div className="flex items-center space-x-1 text-xs opacity-70">
                            <Clock className="w-3 h-3" />
                            <span>{msg.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus-ring"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 transition-all duration-200 button-press hover:scale-105"
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
