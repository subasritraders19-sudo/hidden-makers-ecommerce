'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEMO_CREDENTIALS, type Product } from '@/lib/products'

type CartItem = { product: Product; quantity: number }

type StoreContextValue = {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (product: Product) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  user: string | null
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setCartOpen] = useState(false)
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    const savedUser = window.localStorage.getItem('hm_user')
    if (savedUser) setUser(savedUser)
  }, [])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((i) => i.product.id !== id))

  const updateQuantity = (id: string, quantity: number) =>
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) =>
            i.product.id === id ? { ...i, quantity } : i,
          ),
    )

  const clearCart = () => setCart([])

  const login = (email: string, password: string) => {
    if (
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      setUser(email)
      window.localStorage.setItem('hm_user', email)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid email or password.' }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('hm_user')
  }

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)
    const cartTotal = cart.reduce(
      (sum, i) => sum + i.quantity * i.product.price,
      0,
    )
    return {
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setCartOpen,
      user,
      login,
      logout,
    }
  }, [cart, isCartOpen, user])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
