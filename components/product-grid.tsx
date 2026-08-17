'use client'

import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { products, type Category } from '@/lib/products'
import { cn } from '@/lib/utils'

type Filter = 'all' | Category

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'food', label: 'Health Mix Food' },
]

export function ProductGrid({ initial = 'all' }: { initial?: Filter }) {
  const [active, setActive] = useState<Filter>(initial)

  const visible = useMemo(
    () =>
      active === 'all'
        ? products
        : products.filter((p) => p.category === active),
    [active],
  )

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActive(f.value)}
            className={cn(
              'rounded-sm border px-6 py-2 text-xs uppercase tracking-[0.15em] transition-colors',
              active === f.value
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:border-primary hover:text-primary',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
