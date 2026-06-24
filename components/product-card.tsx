'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { formatPrice, type Product } from '@/lib/products'
import { useStore } from '@/components/store-provider'

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore()

  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors duration-300 hover:border-primary">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-background/80 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-primary backdrop-blur">
          {product.category === 'clothing' ? 'Clothing' : 'Health Mix'}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {product.subtitle}
        </p>
        <h3 className="mt-1 font-serif text-xl text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-serif text-lg text-primary">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 rounded-sm border border-primary px-4 py-2 text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
