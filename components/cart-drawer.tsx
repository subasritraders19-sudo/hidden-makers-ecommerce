'use client'

import Image from 'next/image'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import CheckoutForm from "@/components/checkout-form"

// 🔥 IMPORT THIS
import { useCountry } from '@/components/CountryContext'

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

  // 🔥 COUNTRY DATA
  const { country } = useCountry()

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
            className="text-muted-foreground hover:text-primary"
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

            <Button onClick={() => setCartOpen(false)}>
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
                    <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-base font-medium">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-lg font-semibold text-primary">
                            {formatPrice(product.price)}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-muted-foreground hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Quantity */}
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="h-8 w-8 border rounded-md flex items-center justify-center"
                        >
                          <Minus className="h-3 w-3" />
                        </button>

                        <span className="w-5 text-center">
                          {quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="h-8 w-8 border rounded-md flex items-center justify-center"
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
            <div className="border-t px-6 py-5">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Subtotal
                </span>

                <span className="text-2xl text-primary">
                  {formatPrice(cartTotal)}
                </span>
              </div>

              {/* 🔥 IMPORTANT FIX */}
              {country.code !== "IN" && (
                <p className="mb-4 text-xs text-muted-foreground">
                  You will be charged in INR (₹{cartTotal.toFixed(2)})
                </p>
              )}

              <CheckoutForm />

              <button
                onClick={clearCart}
                className="mt-3 w-full text-xs text-muted-foreground hover:text-red-500"
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