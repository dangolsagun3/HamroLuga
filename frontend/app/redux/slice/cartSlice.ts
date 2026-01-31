import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: number
  title: string
  price: number
  images: string[]
  quantity: number
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ id: number; title: string; price: number; images: string[] }>) => {
      const payload = action.payload
      const existing = state.items.find(i => i.id === payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...payload, quantity: 1 })
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const existing = state.items.find(i => i.id === id)
      if (existing) existing.quantity += 1
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const existing = state.items.find(i => i.id === id)
      if (!existing) return
      if (existing.quantity <= 1) {
        state.items = state.items.filter(i => i.id !== id)
      } else {
        existing.quantity -= 1
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.items = state.items.filter(i => i.id !== id)
    },
    setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload
      const existing = state.items.find(i => i.id === id)
      if (!existing) return
      if (quantity <= 0) {
        state.items = state.items.filter(i => i.id !== id)
      } else {
        existing.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    }
  }
})

export const { addItem, incrementQuantity, decrementQuantity, removeItem, setQuantity, clearCart } = cartSlice.actions

export default cartSlice.reducer

// Selectors
export const selectCartItems = (state: any) => state.cart.items as CartItem[]
export const selectTotalItems = (state: any) => state.cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)
export const selectTotalPrice = (state: any) => state.cart.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
export const selectItemQuantity = (state: any, id: number) => {
  const item = state.cart.items.find((i: CartItem) => i.id === id)
  return item ? item.quantity : 0
}
