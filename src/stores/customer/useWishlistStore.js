import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: []
  }),

  actions: {
    addToWishlist(product) {
      this.items.push(product)
    },
    removeFromWishlist(index) {
      this.items.splice(index, 1)
    },
    clearWishlist() {
      this.items = []
    }
  },

  persist: true // ✅ Save to localStorage
})
