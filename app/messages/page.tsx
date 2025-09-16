"use client"

import { useState } from "react"
import { Navbar } from "@/components/navigation/navbar"
import { ChatList } from "@/components/chat/chat-list"
import { ChatInterface } from "@/components/chat/chat-interface"
import { MessageCircle } from "lucide-react"

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

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
          <div className="lg:col-span-1">
            <ChatList onSelectConversation={setSelectedConversation} />
          </div>
          <div className="lg:col-span-2">
            {selectedConversation ? (
              <ChatInterface
                buyerName={selectedConversation.buyerName}
                productName={selectedConversation.productName}
                buyerEmail={selectedConversation.buyerEmail}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-card rounded-lg border-0 shadow-md">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground">Select a conversation</h3>
                    <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
