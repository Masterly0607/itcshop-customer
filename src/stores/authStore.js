import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(!!localStorage.getItem('token'))
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  const login = (userData, token) => {
    isLoggedIn.value = true
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    isLoggedIn.value = false
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return { isLoggedIn, user, login, logout }
})
