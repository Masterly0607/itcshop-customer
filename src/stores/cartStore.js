import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    cartCount: (state) => state.cartItems.length,
  },
  actions: {
    // Get all carts
    async fetchCart() {
      try {
        const res = await axiosClient.get('/customer/cart')
        this.cartItems = res.data.data
      } catch (err) {
        toast.error('Failed to fetch cart:', err)
      }
    },

    // Add item to cart
    async addToCart(product) {
      try {
        const res = await axiosClient.post('/customer/cart', {
          product_id: product.id,
          quantity: 1,
        })

        const newItem = res.data.data
        const exists = this.cartItems.find((p) => p.id === newItem.id)

        if (!exists) {
          this.cartItems.push(newItem)
        }
      } catch (err) {
        toast.error('Failed to add to cart:', err)
      }
    },

    // Update cart quantity
    async updateQuantity(cartId, quantity) {
      await axiosClient.put(`/customer/cart/${cartId}`, { quantity })
      this.fetchCart()
    },

    // Remove cart
    async removeFromCart(cartId) {
      await axiosClient.delete(`/customer/cart/${cartId}`)
      this.cartItems = this.cartItems.filter((item) => item.id !== cartId)
    },
  },
})
