import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderItems: [],
  }),
  getters: {
    orderCount: (state) => state.orderItems.length,
  },
  actions: {},
})
