import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Leaf, Sparkles, HeartHandshake } from 'lucide-react'
import { SiteShell } from '@/components/site-shell'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'About Us — Hidden Makers',
  description:
    'Hidden Makers brings together heritage, health, and style through traditional foods and authentic clothing.',
}

const values = [
  {
    Icon: Leaf,
    title: 'Heritage',
    text: 'Time-honoured recipes and weaves, preserved and passed down through generations.',
  },
  {
    Icon: HeartHandshake,
    title: 'Health',
    text: 'Naturally prepared foods that nourish the body and honour traditional wisdom.',
  },
  {
    Icon: Sparkles,
    title: 'Style',
    text: 'A modern, premium touch that brings tradition gracefully into contemporary life.',
  },
]

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Our Story"
        title="About Hidden Makers"
      />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div className="relative h-96 overflow-hidden rounded-sm border border-border">
          <Image
            src="/images/cat-clothing.png"
            alt="Traditional handwoven clothing"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Honouring the makers behind every craft
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Hidden Makers is a brand dedicated to delivering traditional foods
            and authentic clothing with a modern premium touch. We bring
            together heritage, health, and style.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            From handwoven lungis and pure silk pattu pudavai to naturally
            prepared health mixes and herbal powders, every product carries the
            care of skilled artisans and the goodness of time-tested tradition —
            delivered to your home with elegance.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ Icon, title, text }) => (
              <div
                key={title}
                className="rounded-sm border border-border bg-background p-8 text-center transition-colors hover:border-primary"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-2xl text-foreground">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="text-balance font-serif text-3xl text-foreground md:text-4xl">
          Experience tradition, reimagined
        </h2>
        <p className="mt-5 leading-relaxed text-muted-foreground">
          Discover our curated collection of clothing and health foods, made
          with heart and delivered with style.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3 text-sm uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Explore the Shop
        </Link>
      </section>
    </SiteShell>
  )
}
