import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    orderDetail: null,
    loading: false,
  }),

  actions: {
    async fetchOrders() {
      this.loading = true
      try {
        const res = await axiosClient.get('/orders')
        this.orders = res.data.data || res.data
      } catch (err) {
        console.error('❌ Failed to fetch orders', err)
      } finally {
        this.loading = false
      }
    },

    async fetchOrderDetail(orderId) {
      this.loading = true
      try {
        const res = await axiosClient.get(`/orders/${orderId}`)
        this.orderDetail = res.data
      } catch (err) {
        console.error('❌ Failed to fetch order detail', err)
      } finally {
        this.loading = false
      }
    },
  },
})
