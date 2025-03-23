import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: null
  }),

  actions: {
    setToken(token) {
      this.token = token
    },
    setUser(userData) {
      this.user = userData
    },
    logout() {
      this.token = null
      this.user = null
    }
  },

  persist: {
    storage: localStorage,
    paths: ['token', 'user'] // ✅ Only persist token & user
  }
})
