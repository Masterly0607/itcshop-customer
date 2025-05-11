import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: []
  }),
  getters: {
    cartCount: (state) => state.cartItems.length
  },
  actions: {
    addToCart(product) {
      const exists = this.cartItems.find(p => p.id === product.id)
      if (!exists) {
        this.cartItems.push({ ...product, quantity: 1 })
        // push() = is the function that add new item(number, sting, object,etc) to array.
        // ...product: copy to the object with all properties of product
      }
    }
  }
})
