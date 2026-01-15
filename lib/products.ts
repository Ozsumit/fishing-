export interface Product {
  id: number
  name: string
  price: number
  category: string
  type?: string
  rating: number
  reviews: number
  image: string
  badge?: string
  description: string
  specs: Record<string, string | number>
}

let cachedProducts: Product[] | null = null

export async function getProducts(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts
  }

  const response = await fetch("/data/products.json")
  cachedProducts = await response.json()
  return cachedProducts
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((p) => p.category === category)
}

export async function getProductsByType(type: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((p) => p.type === type)
}
