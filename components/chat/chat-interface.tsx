"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Send, Phone, Video, MoreVertical, Paperclip, User, Clock, CheckCircle2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  sender: "buyer" | "seller"
  content: string
  timestamp: string
  senderName: string
  status?: "sent" | "delivered" | "read"
}

interface ChatInterfaceProps {
  buyerName: string
  productName: string
  buyerEmail: string
}

export function ChatInterface({ buyerName, productName, buyerEmail }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "buyer",
      content: "Hi, I'm interested in your steel shavings. Can you tell me more about the grade and availability?",
      timestamp: "10:30 AM",
      senderName: buyerName,
      status: "read",
    },
    {
      id: "2",
      sender: "seller",
      content:
        "Hello! Thanks for your interest. We have Grade A steel shavings available. They're from precision machining operations with minimal contamination. We currently have 50 tons in stock.",
      timestamp: "10:32 AM",
      senderName: "You",
      status: "read",
    },
    {
      id: "3",
      sender: "buyer",
      content: "That sounds perfect. What's the minimum order quantity and what certifications do you provide?",
      timestamp: "10:35 AM",
      senderName: buyerName,
      status: "read",
    },
    {
      id: "4",
      sender: "seller",
      content:
        "Minimum order is 5 tons. We provide material certificates including chemical composition analysis and contamination reports. Would you like me to send you the detailed specs?",
      timestamp: "10:37 AM",
      senderName: "You",
      status: "delivered",
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "seller",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        senderName: "You",
        status: "sent",
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "read":
        return <CheckCircle2 className="w-3 h-3 text-blue-500" />
      case "delivered":
        return <CheckCircle2 className="w-3 h-3 text-gray-400" />
      case "sent":
        return <CheckCircle2 className="w-3 h-3 text-gray-300" />
      default:
        return null
    }
  }

  return (
    <Card className="h-full border-0 shadow-md flex flex-col">
      {/* Header */}
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{buyerName}</CardTitle>
              <CardDescription className="text-sm">
                Inquiring about: <span className="font-medium">{productName}</span>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="bg-transparent">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-transparent">
              <Video className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-transparent">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Send Quote</DropdownMenuItem>
                <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Block User</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-96 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    msg.sender === "seller" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="text-sm leading-relaxed">{msg.content}</div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-current/10">
                    <div className="text-xs opacity-70">{msg.senderName}</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-xs opacity-70">
                        <Clock className="w-3 h-3" />
                        <span>{msg.timestamp}</span>
                      </div>
                      {msg.sender === "seller" && getStatusIcon(msg.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" className="bg-transparent flex-shrink-0">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 min-h-[40px] max-h-32 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-primary hover:bg-primary/90 transition-all duration-200 flex-shrink-0"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <Badge variant="outline" className="text-xs">
            {buyerEmail}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
