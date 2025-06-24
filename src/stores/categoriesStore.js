import { defineStore } from 'pinia'
import axiosClient from '@/axios'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categoriesList: [],
    loading: false,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      try {
        const res = await axiosClient.get('/categories')
       this.categoriesList = res.data.map(cat => ({
  label: cat.name,
  id: cat.id,
}))
      } catch (error) {
        console.error('❌ Failed to load categories:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
