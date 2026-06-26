'use client'

import Image from 'next/image'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import CheckoutForm from "@/components/checkout-form"

export function CartDrawer() {
  const {
    cart,
    cartTotal,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useStore()

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!isCartOpen}
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 flex h-screen w-full md:w-[650px] flex-col border-l border-border bg-card transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
          <h2 className="font-serif text-2xl text-foreground">
            Your Cart
          </h2>

          <button
            type="button"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />

            <p className="text-muted-foreground">
              Your cart is empty.
            </p>

            <Button
              onClick={() => setCartOpen(false)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Products */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="space-y-4 pb-32">
                {cart.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex gap-3 border-b border-border pb-4"
                  >
                    {/* Image */}
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="text-base font-medium leading-6 text-foreground">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-lg font-semibold text-primary">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          className="text-muted-foreground transition-colors hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors hover:border-primary hover:text-primary"
                        >
                          <Minus className="h-3 w-3" />
                        </button>

                        <span className="w-5 text-center text-sm text-foreground">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors hover:border-primary hover:text-primary"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-border bg-card px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">
                  Subtotal
                </span>

                <span className="font-serif text-2xl text-primary">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              <CheckoutForm />

              <button
                type="button"
                onClick={clearCart}
                className="mt-3 w-full text-center text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-red-500"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}