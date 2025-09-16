import { type NextRequest, NextResponse } from "next/server"

// Simulated chat messages database
const chatMessages: any[] = [
  {
    id: "1",
    chatId: "chat-1",
    senderId: "seller1",
    senderName: "Precision Metals Co.",
    message: "Hello! Thanks for your interest in our aluminum scrap. How can I help you today?",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    isSupplier: true,
  },
  {
    id: "2",
    chatId: "chat-1",
    senderId: "buyer1",
    senderName: "You",
    message: "Hi! I'm interested in purchasing 5 tons. What's your best price?",
    timestamp: new Date(Date.now() - 3000000).toISOString(), // 50 minutes ago
    isSupplier: false,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const chatId = searchParams.get("chatId")

  let messages = chatMessages
  if (chatId) {
    messages = chatMessages.filter((msg) => msg.chatId === chatId)
  }

  return NextResponse.json({
    success: true,
    data: messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newMessage = {
      id: `msg-${Date.now()}`,
      ...body,
      timestamp: new Date().toISOString(),
    }

    chatMessages.push(newMessage)

    // Simulate supplier auto-response after a delay
    if (!body.isSupplier) {
      setTimeout(() => {
        const autoResponse = {
          id: `msg-${Date.now() + 1}`,
          chatId: body.chatId,
          senderId: body.supplierId || "seller1",
          senderName: body.supplierName || "Supplier",
          message: generateAutoResponse(body.message),
          timestamp: new Date().toISOString(),
          isSupplier: true,
        }
        chatMessages.push(autoResponse)
      }, 2000)
    }

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: "Message sent successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message",
      },
      { status: 400 },
    )
  }
}

function generateAutoResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  if (message.includes("price") || message.includes("cost")) {
    return "Thanks for your inquiry! Our current pricing is competitive and we offer volume discounts. Let me prepare a detailed quote for you."
  }

  if (message.includes("quality") || message.includes("specification")) {
    return "Our products meet the highest industry standards. I can provide detailed specifications and quality certificates. What specific requirements do you have?"
  }

  if (message.includes("shipping") || message.includes("delivery")) {
    return "We offer flexible shipping options including standard (5-7 days) and express (2-3 days) delivery. Where would you like the materials shipped?"
  }

  if (message.includes("quantity") || message.includes("ton")) {
    return "Great! We can accommodate that quantity. Let me check our current inventory and prepare a quote. What's your preferred delivery timeline?"
  }

  return "Thank you for your message! I'll get back to you with detailed information shortly. Is there anything specific you'd like to know about our products?"
}
