import { defineStore } from 'pinia'
import axiosClient from '@/axios'
import { toast } from 'vue3-toastify'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    wishlistItems: [],
  }),

  getters: {
    wishlistCount: (state) => state.wishlistItems.length,
  },

  actions: {
    async fetchWishlist() {
      try {
        const res = await axiosClient.get('/wishlist')
        this.wishlistItems = res.data.data// extract product from wishlist
      } catch (err) {
        toast.error('Failed to load wishlist')
        console.error(err)
      }
    },

    async addToWishlist(product) {
      try {
        await axiosClient.post('/wishlist', { product_id: product.id })
        this.wishlistItems.push(product)
       
      } catch (err) {
        if (err.response?.status === 409) {
          toast.error('Already in wishlist')
        } else {
          toast.error('Failed to add to wishlist')
        }
      }
    },

    async removeFromWishlist(productId) {
      try {
        await axiosClient.delete(`/wishlist/${productId}`)
        this.wishlistItems = this.wishlistItems.filter((p) => p.id !== productId)
     
      } catch (err) {
      
      }
    },

    async toggleWishlist(product) {
      const exists = this.wishlistItems.find((p) => p.id === product.id)
      if (exists) {
        await this.removeFromWishlist(product.id)
      } else {
        await this.addToWishlist(product)
      }
    },
  },
})
