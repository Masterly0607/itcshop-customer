import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import axiosClient from '@/axios'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    cartCount: (state) => state.cartItems.length,
  },
  actions: {
    async fetchCart() {
      try {
        const res = await axiosClient.get('/cart')
        this.cartItems = Array.isArray(res.data.data) ? res.data.data : []
      } catch (err) {
        toast.error('Failed to fetch cart')
        console.error(err)
      }
    },

    async addToCart(product, quantity = 1) {
      try {
        const res = await axiosClient.post('/cart', {
          product_id: product.id,
          quantity,
        })
        await this.fetchCart()
        toast.success('Added to cart!')
      } catch (err) {
        toast.error('Failed to add to cart')
        console.error(err)
      }
    },

    async updateQuantity(cartId, quantity) {
      try {
        await axiosClient.put(`/cart/${cartId}`, { quantity })
        await this.fetchCart()
      } catch (err) {
        toast.error('Failed to update quantity')
        console.error(err)
      }
    },

    async removeFromCart(cartId) {
      try {
        await axiosClient.delete(`/cart/${cartId}`)
        this.cartItems = this.cartItems.filter((item) => item.id !== cartId)
        toast.success('Removed from cart!')
      } catch (err) {
        toast.error('Failed to remove from cart')
        console.error(err)
      }
    },
  },
})
