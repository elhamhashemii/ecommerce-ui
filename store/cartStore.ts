import { CartItemType } from '@/types/product'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartState {
  items: CartItemType[]
  addItem: (item: CartItemType) => void
  removeItem: (id: string) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
  setCart: (items: CartItemType[]) => void;
  getTotalQty: () => number;
  getTotalPrice: () => number;
  getItems: () => CartItemType[];
  deleteItem: (id: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== +id) })),
      updateQty: (id, qty) =>
        set((state) => {
          if (qty <= 0) {
            // remove item if new quantity is 0
            return { items: state.items.filter((i) => i.id !== id) }
          }
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, qty } : i
            ),
          }
        }),
      clearCart: () => set({ items: [] }),
      setCart: (items) => set({ items }),
      getTotalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.price * item.qty, 0);
      },
      getTotalQty: () => {
        const items = get().items;
        return items.reduce((sum, item) => sum + item.qty, 0);
      },
      getItems: () => get().items,
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
    }),
    { name: 'guest-cart' } // Saves in localStorage
  )
)
