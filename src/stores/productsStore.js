// src/stores/products/productsStore.js
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
      try {
        this.loading = true
        const res = await axiosClient.get('/customer/products')
        this.productsList = res.data.data
      } catch (err) {
        console.error('Failed to load products:', err)
      } finally {
        this.loading = false
      }
    },

    async fetchProductDetail(id) {
      try {
        this.loading = true
        const res = await axiosClient.get(`/customer/products/${id}`)
        this.productDetail = res.data.data
      } catch (err) {
        console.error('Failed to fetch product detail:', err)
      } finally {
        this.loading = false
      }
    },
    async fetchFlashSale() {
      const res = await axiosClient.get('/customer/products/flash-sale')
      this.productsList = res.data.data
    },

    async fetchBestSelling() {
      const res = await axiosClient.get('/customer/products/best-selling')
      this.productsList = res.data.data
    },

    async fetchNewProducts() {
      const res = await axiosClient.get('/customer/products/new')
      this.productsList = res.data.data
    },

    async fetchByCategory(categoryName) {
      const res = await axiosClient.get(`/customer/products/${categoryName}`)
      this.productsList = res.data.data
    },
  },
})
