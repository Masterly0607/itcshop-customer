// src/stores/productsStore.js
import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useProductsStore = defineStore('products', {
  state: () => ({
    productsList: [],
    flashSaleProducts: [],
    bestSellingProducts: [],
    newArrivalProducts: [],
    productDetail: null,
    loading: false,
  }),

  actions: {
    //  Get all (with optional filters)
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

    //  Get product by ID
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

    //  Get flash sale products
    async fetchFlashSaleProducts() {
      try {
        const res = await axiosClient.get('/products/flash-sale')
        this.flashSaleProducts = res.data.data
      } catch (error) {
        console.error('Failed to fetch flash sale products:', error)
      }
    },

    //  Get best selling products
    async fetchBestSellingProducts() {
      try {
        const res = await axiosClient.get('/products/best-selling')
        this.bestSellingProducts = res.data.data
      } catch (error) {
        console.error('Failed to fetch best selling products:', error)
      }
    },

    //  Get new arrivals
    async fetchNewArrivalProducts() {
      try {
        const res = await axiosClient.get('/products/new')
        this.newArrivalProducts = res.data.data
      } catch (error) {
        console.error('Failed to fetch new arrival products:', error)
      }
    },
  },
})
