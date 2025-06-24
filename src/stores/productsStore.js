// src/stores/productsStore.js
import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    productsList: [],
    productDetail: null,     
    loading: false,
  }),

  actions: {
    async fetchProducts() {
      this.loading = true
      try {
        const response = await axiosClient.get('/products')
        this.productsList = response.data.data 
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        this.loading = false
      }
    },

    // ✅ Add this new action
    async fetchProductDetail(id) {
      this.loading = true
      try {
        const res = await axiosClient.get(`/products/${id}`)
        this.productDetail = res.data.data
      } catch (error) {
        console.error('Failed to fetch product detail:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
