import { type NextRequest, NextResponse } from "next/server"

// Simulated notifications database
const notifications: any[] = [
  {
    id: "1",
    userId: "user1",
    title: "New Message from Precision Metals Co.",
    message: "You have a new message regarding Aluminum Scrap inquiry",
    type: "message",
    read: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
  },
  {
    id: "2",
    userId: "user1",
    title: "Price Drop Alert",
    message: "Polyethylene Pellets price dropped by 5%",
    type: "price_alert",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "3",
    userId: "user1",
    title: "Order Confirmation",
    message: "Your order #ORD-12345 has been confirmed",
    type: "order",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId") || "user1"

  const userNotifications = notifications.filter((n) => n.userId === userId)

  return NextResponse.json({
    success: true,
    data: userNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    unreadCount: userNotifications.filter((n) => !n.read).length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newNotification = {
      id: `notif-${Date.now()}`,
      userId: body.userId || "user1",
      ...body,
      read: false,
      createdAt: new Date().toISOString(),
    }

    notifications.push(newNotification)

    return NextResponse.json({
      success: true,
      data: newNotification,
      message: "Notification created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create notification",
      },
      { status: 400 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { notificationId, read } = body

    const notification = notifications.find((n) => n.id === notificationId)
    if (notification) {
      notification.read = read
    }

    return NextResponse.json({
      success: true,
      message: "Notification updated successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update notification",
      },
      { status: 400 },
    )
  }
}
