import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlistItems: [], // ✅ must be an array always
  }),
  getters: {
    wishlistCount: (state) => state.wishlistItems.length,
  },
  actions: {
    // Add product
    addToWishlist(product) {
      const exists = this.wishlistItems.find((p) => p.id === product.id)
      if (!exists) {
        this.wishlistItems.push({ ...product, quantity: 1 })
      }
    },

    // ✅ Fix remove logic
    removeFromWishlist(productId) {
      this.wishlistItems = this.wishlistItems.filter((p) => p.id !== productId)
    },

    // Toggle wishlist state
    toggleWishlist(product) {
      const exists = this.wishlistItems.find((p) => p.id === product.id)
      if (exists) {
        this.removeFromWishlist(product.id)
      } else {
        this.addToWishlist(product)
      }
    },
  },
})
