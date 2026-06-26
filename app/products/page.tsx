import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { ProductGrid } from '@/components/product-grid'

export const metadata: Metadata = {
  title: 'Products — Hidden Makers',
  description:
    'Browse the full range of Hidden Makers clothing and health mix foods.',
}

export default function ProductsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Everything We Make"
        title="All Products"
        description="Filter by category to explore our complete range of premium clothing and natural health foods."
      />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <ProductGrid initial="all" />
      </section>
    </SiteShell>
  )
}
