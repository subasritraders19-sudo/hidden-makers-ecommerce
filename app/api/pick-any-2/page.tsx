'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { SiteShell } from '@/components/site-shell'
import { products } from '@/lib/products'

const comboProducts = products.filter(
  (product) =>
    product.category === 'food' &&
    product.comboEligible === true
)

export default function PickAny2Page() {
  const [selected, setSelected] = useState<string[]>([])

  function toggleProduct(id: string) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id))
      return
    }

    if (selected.length >= 2) return

    setSelected([...selected, id])
  }

  const selectedProducts = comboProducts.filter((product) =>
    selected.includes(product.id)
  )

  const canAdd = selected.length === 2

  return (
    <SiteShell>

      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* HEADER */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs uppercase tracking-[0.25em] text-primary">
            Mix & Match Offer
          </p>

          <h1 className="mt-3 font-serif text-4xl md:text-5xl">
            Pick Any 2 Pouches
          </h1>

          <p className="mt-4 text-muted-foreground">
            Choose any 2 selected health food pouches for just ₹399.
          </p>

          <div className="mt-6 text-3xl font-semibold">
            ₹399
          </div>

        </div>


        {/* SELECTION COUNT */}

        <div className="mt-10 text-center">

          <span className="rounded-full border px-5 py-2 text-sm">
            {selected.length} / 2 Selected
          </span>

        </div>


        {/* PRODUCTS */}

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

          {comboProducts.map((product) => {

            const isSelected = selected.includes(product.id)

            return (

              <button
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`group overflow-hidden rounded-sm border text-left transition ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary'
                    : 'border-border hover:border-primary'
                }`}
              >

                <div className="relative aspect-square bg-muted">

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition group-hover:scale-105"
                  />

                  {isSelected && (
                    <div className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                      ✓ Selected
                    </div>
                  )}

                </div>


                <div className="p-4">

                  <h2 className="font-medium">
                    {product.name}
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.subtitle}
                  </p>

                  <p className="mt-3 text-sm line-through text-muted-foreground">
                    ₹{product.price}
                  </p>

                  <p className="mt-1 text-sm font-medium text-primary">
                    Combo eligible
                  </p>

                </div>

              </button>

            )
          })}

        </div>


        {/* SUMMARY */}

        <div className="sticky bottom-4 mx-auto mt-12 max-w-xl rounded-sm border bg-background/95 p-5 shadow-lg backdrop-blur">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium">
                Your Combo
              </p>

              <p className="mt-1 text-xs text-muted-foreground">

                {selectedProducts.length === 0
                  ? 'Choose any 2 pouches'
                  : selectedProducts
                      .map((product) => product.name)
                      .join(' + ')
                }

              </p>

            </div>

            <div className="text-right">

              <p className="text-xl font-semibold">
                ₹399
              </p>

              <p className="text-xs text-muted-foreground">
                2 pouches
              </p>

            </div>

          </div>


          <button
            disabled={!canAdd}
            className="mt-4 w-full rounded-sm bg-primary px-6 py-3 text-sm uppercase tracking-wide text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
          >
            {canAdd
              ? 'Add Combo to Cart'
              : `Select ${2 - selected.length} More`
            }
          </button>

        </div>

      </section>

    </SiteShell>
  )
}