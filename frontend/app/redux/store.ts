import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slice/counterslice'
import cartSlice from './slice/cartSlice'

// Load cart from localStorage (only in browser)
const loadCart = () => {
  try {
    if (typeof window === 'undefined') return undefined
    const raw = localStorage.getItem('cart')
    if (!raw) return undefined
    const parsed = JSON.parse(raw)
    // Normalize parsed data into items with quantity
    if (Array.isArray(parsed)) {
      // If items already have quantity, keep as-is
      if (parsed.length > 0 && typeof parsed[0].quantity === 'number') {
        return { cart: { items: parsed } }
      }
      // Otherwise, parsed is likely an array of products (possibly with duplicates)
      const items = parsed.reduce((acc: any[], item: any) => {
        const existing = acc.find(i => i.id === item.id)
        if (existing) existing.quantity += 1
        else acc.push({ ...item, quantity: 1 })
        return acc
      }, [])
      return { cart: { items } }
    }
    return undefined
  } catch (e) {
    console.error('Failed to load cart from localStorage', e)
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice,
  },
  preloadedState: loadCart(),
})

// Persist cart changes to localStorage
store.subscribe(() => {
  try {
    if (typeof window === 'undefined') return
    const state = store.getState()
    localStorage.setItem('cart', JSON.stringify(state.cart.items))
  } catch (e) {
    // ignore
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store