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
    this.cartItems = Array.isArray(res.data.data) ? res.data.data : []
  } catch (err) {
    toast.error('Failed to fetch cart')
    console.error(err)
  }
},

    // Add item to cart
  async addToCart(product, quantity = 1) {
  try {
    const res = await axiosClient.post('/customer/cart', {
      product_id: product.id,
      quantity,
    })

    await this.fetchCart() // 💡 reload to reflect updated quantity
    toast.success('Added to cart!')
  } catch (err) {
    toast.error('Failed to add to cart')
    console.error(err)
  }
},


    // Update cart quantity
   async updateQuantity(cartId, quantity) {
  try {
    await axiosClient.put(`/customer/cart/${cartId}`, { quantity })
    await this.fetchCart()
    toast.success('Cart updated!')
  } catch (err) {
    toast.error('Failed to update quantity')
    console.error(err)
  }
},


    // Remove cart
  async removeFromCart(cartId) {
  try {
    await axiosClient.delete(`/customer/cart/${cartId}`)
    this.cartItems = this.cartItems.filter((item) => item.id !== cartId)
    toast.success('Removed from cart!')
  } catch (err) {
    toast.error('Failed to remove from cart')
    console.error(err)
  }
}

  },
})
