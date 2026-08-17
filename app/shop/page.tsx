import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop — Hidden Makers',
  description:
    'Shop authentic traditional clothing and natural health mix foods from Hidden Makers.',
}

const sections = [
  {
    id: 'clothing',
    eyebrow: 'Heritage Weaves',
    title: 'Clothing',
    description:
      'Authentic handwoven garments rooted in South Indian tradition.',
  },
  {
    id: 'food',
    eyebrow: 'Natural Wellness',
    title: 'Health Mix Food',
    description:
      'Naturally prepared health mixes and herbal powders for everyday vitality.',
  },
] as const

export default function ShopPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Collection"
        title="The Shop"
        description="Two distinct worlds — timeless clothing and nourishing health foods — each crafted with care and delivered with style."
      />
      {sections.map((section) => {
        const items = products.filter((p) => p.category === section.id)
        return (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16"
          >
            <div className="mb-10 border-l-2 border-primary pl-5">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">
                {section.eyebrow}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-foreground md:text-4xl">
                {section.title}
              </h2>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                {section.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )
      })}
    </SiteShell>
  )
}
