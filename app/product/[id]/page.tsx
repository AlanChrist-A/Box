import { notFound } from "next/navigation"
import { ProductDetail } from "@/components/product/product-detail"
import { products } from "@/lib/mock-data"

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}
