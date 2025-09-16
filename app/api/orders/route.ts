import { type NextRequest, NextResponse } from "next/server"

// Simulated orders database
const orders: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newOrder = {
      id: `ORD-${Date.now()}`,
      ...body,
      status: "pending",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    }

    orders.push(newOrder)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: "Order placed successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to place order",
      },
      { status: 400 },
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  let userOrders = orders
  if (userId) {
    userOrders = orders.filter((order) => order.userId === userId)
  }

  return NextResponse.json({
    success: true,
    data: userOrders,
    total: userOrders.length,
  })
}
