import { type NextRequest, NextResponse } from "next/server"

// Simulated product database
const products = [
  {
    id: 1,
    title: "Aluminum Scrap - 6061 Grade",
    supplier: "Precision Metals Co.",
    location: "Phoenix, AZ",
    price: "₹1,200/ton",
    rating: 4.7,
    reviews: 23,
    image: "/aluminum-scrap-metal-industrial.jpg",
    images: [
      "/aluminum-scrap-metal-industrial.jpg",
      "/steel-shavings-industrial-metal.jpg",
      "/chemical-solvents-industrial-barrels.jpg",
    ],
    category: "metals",
    quantity: "15 tons",
    minOrder: "1 ton",
    description:
      "High-grade aluminum scrap from aerospace manufacturing. Perfect for recycling into new aluminum products.",
    specifications: {
      Grade: "6061-T6",
      Purity: "99.5%",
      "Moisture Content": "<0.1%",
      Contamination: "Minimal",
      Processing: "Clean, sorted",
    },
    supplierInfo: {
      name: "Precision Metals Co.",
      established: "1995",
      certifications: ["ISO 9001", "ISO 14001"],
      rating: 4.8,
      totalReviews: 156,
    },
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    title: "Polyethylene Pellets",
    supplier: "PlastiCorp Industries",
    location: "Atlanta, GA",
    price: "₹850/ton",
    rating: 4.5,
    reviews: 18,
    image: "/plastic-pellets-polyethylene.jpg",
    images: ["/plastic-pellets-polyethylene.jpg", "/cotton-textile-waste-fabric.jpg"],
    category: "chemicals",
    quantity: "30 tons",
    minOrder: "2 tons",
    description: "Clean PE pellets from packaging production. Suitable for manufacturing new plastic products.",
    specifications: {
      Type: "HDPE",
      Density: "0.95 g/cm³",
      "Melt Index": "0.3 g/10min",
      Color: "Natural/Clear",
      Contamination: "<0.05%",
    },
    supplierInfo: {
      name: "PlastiCorp Industries",
      established: "2001",
      certifications: ["FDA Approved", "ISO 9001"],
      rating: 4.6,
      totalReviews: 89,
    },
    inStock: true,
    featured: true,
  },
  // Add more products...
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const featured = searchParams.get("featured")

  let filteredProducts = [...products]

  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.supplier.toLowerCase().includes(searchLower),
    )
  }

  if (featured === "true") {
    filteredProducts = filteredProducts.filter((p) => p.featured)
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Simulate creating a new product
    const newProduct = {
      id: products.length + 1,
      ...body,
      rating: 0,
      reviews: 0,
      inStock: true,
      featured: false,
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create product",
      },
      { status: 400 },
    )
  }
}
