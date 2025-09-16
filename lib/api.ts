// API utility functions for frontend

export class ApiClient {
  private baseUrl = "/api"

  async get(endpoint: string, params?: Record<string, string>) {
    const url = new URL(endpoint, window.location.origin + this.baseUrl)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const response = await fetch(url.toString())
    return response.json()
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async patch(endpoint: string, data: any) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  // Product methods
  async getProducts(filters?: { category?: string; search?: string; featured?: boolean }) {
    return this.get("/products", filters as Record<string, string>)
  }

  async createProduct(productData: any) {
    return this.post("/products", productData)
  }

  // Order methods
  async createOrder(orderData: any) {
    return this.post("/orders", orderData)
  }

  async getOrders(userId?: string) {
    return this.get("/orders", userId ? { userId } : undefined)
  }

  // Chat methods
  async getChatMessages(chatId: string) {
    return this.get("/chat", { chatId })
  }

  async sendMessage(messageData: any) {
    return this.post("/chat", messageData)
  }

  // Notification methods
  async getNotifications(userId?: string) {
    return this.get("/notifications", userId ? { userId } : undefined)
  }

  async createNotification(notificationData: any) {
    return this.post("/notifications", notificationData)
  }

  async markNotificationRead(notificationId: string, read = true) {
    return this.patch("/notifications", { notificationId, read })
  }
}

export const api = new ApiClient()

// Utility functions for local storage management
export const storage = {
  get: (key: string) => {
    if (typeof window === "undefined") return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },

  set: (key: string, value: any) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, JSON.stringify(value))
      // Dispatch custom event for cross-component updates
      window.dispatchEvent(new CustomEvent(`${key}Updated`))
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
    }
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return
    localStorage.removeItem(key)
    window.dispatchEvent(new CustomEvent(`${key}Updated`))
  },
}

// Cart management utilities
export const cartUtils = {
  addItem: (item: any) => {
    const cart = storage.get("cart") || []
    const existingIndex = cart.findIndex((cartItem: any) => cartItem.id === item.id)

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity || 1
    } else {
      cart.push({ ...item, quantity: item.quantity || 1 })
    }

    storage.set("cart", cart)
    return cart
  },

  removeItem: (itemId: number) => {
    const cart = storage.get("cart") || []
    const updatedCart = cart.filter((item: any) => item.id !== itemId)
    storage.set("cart", updatedCart)
    return updatedCart
  },

  updateQuantity: (itemId: number, quantity: number) => {
    const cart = storage.get("cart") || []
    const updatedCart = cart.map((item: any) => (item.id === itemId ? { ...item, quantity } : item))
    storage.set("cart", updatedCart)
    return updatedCart
  },

  clear: () => {
    storage.set("cart", [])
    return []
  },

  getTotal: () => {
    const cart = storage.get("cart") || []
    return cart.reduce((total: number, item: any) => {
      const price = Number.parseFloat(item.price.replace("₹", "").replace(",", ""))
      return total + price * item.quantity
    }, 0)
  },
}
