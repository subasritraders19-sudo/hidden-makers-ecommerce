'use client'

import { useStore } from '@/components/store-provider'
import type { Product } from '@/lib/products'

export default function AddToCartButton({
  product,
}: {
  product: Product
}) {
  const { addToCart, cartCount } = useStore()

  return (
    <>
      <p className="mb-4 text-red-500">
        Cart Count: {cartCount}
      </p>

      <button
        onClick={() => {
          console.log("Clicked")
          console.log(product)
          addToCart(product)
        }}
        className="mt-8 rounded-lg bg-black px-8 py-4 text-white"
      >
        Add to Cart
      </button>
    </>
  )
}