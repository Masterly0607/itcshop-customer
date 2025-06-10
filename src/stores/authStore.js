import { defineStore } from 'pinia'
import axiosClient from '@/axios'
import router from '@/router'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    customer: null,
    pendingEmail: localStorage.getItem('pendingEmail') || null,
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    //  Restore from sessionStorage on app load
    init() {
      const token = sessionStorage.getItem('TOKEN')
      const customer = sessionStorage.getItem('CUSTOMER')
      this.token = token
      try {
        this.customer = customer ? JSON.parse(customer) : null
      } catch {
        this.customer = null
      }
    },

    async register(payload) {
      await axiosClient.post('/customer/register', payload)
      this.pendingEmail = payload.email
      localStorage.setItem('pendingEmail', payload.email)
      router.push({ name: 'VerifyEmail' })
    },

    async verifyOtp({ otp }) {
      const payload = {
        email: this.pendingEmail,
        otp,
      }
      const response = await axiosClient.post('/customer/verify-otp', payload)
      this.token = response.data.token
      this.customer = response.data.customer

      sessionStorage.setItem('TOKEN', this.token)
      sessionStorage.setItem('CUSTOMER', JSON.stringify(this.customer))

      router.push({ name: 'Home' })
    },

    async login(email, password) {
      const response = await axiosClient.post('/customer/login', { email, password })
      this.token = response.data.token
      this.customer = response.data.customer

      sessionStorage.setItem('TOKEN', this.token)
      sessionStorage.setItem('CUSTOMER', JSON.stringify(this.customer))

      router.push({ name: 'Home' })
    },

    //  Step 1: Get Google Redirect URL from backend
    async loginWithGoogleRedirect() {
      try {
        const response = await axiosClient.get('/customer/auth/redirect/google')

        return response.data
      } catch (err) {
        console.error('Redirect fetch error:', err)
        throw err
      }
    },

    //  Step 2: After redirect back with token
    async loginWithGoogle(token) {
      this.token = token
      sessionStorage.setItem('TOKEN', token)
      axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`

      try {
        const res = await axiosClient.get('/customer/profile')
        this.customer = res.data
        sessionStorage.setItem('CUSTOMER', JSON.stringify(res.data))
        router.push({ name: 'Account' })
      } catch (err) {
        toast.error('Google login failed')
        this.logout()
      }
    },

    logout() {
      this.token = null
      this.customer = null
      sessionStorage.removeItem('TOKEN')
      sessionStorage.removeItem('CUSTOMER')
      router.push({ name: 'Login' })
    },

    async getUser() {
      this.loading = true
      try {
        const response = await axiosClient.get('/customer/profile')
        this.customer = response.data.customer
        sessionStorage.setItem('CUSTOMER', JSON.stringify(this.customer))
      } catch (error) {
        this.customer = null
        this.token = null
        sessionStorage.removeItem('CUSTOMER')
        sessionStorage.removeItem('TOKEN')
        router.push({ name: 'Login' })
      } finally {
        this.loading = false
      }
    },

    async updateUser(payload) {
      this.loading = true
      try {
        const response = await axiosClient.put('/customer/profile', payload)
        this.customer = response.data.customer
        sessionStorage.setItem('CUSTOMER', JSON.stringify(this.customer))
      } catch (error) {
        console.error('Update failed', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async changePassword(payload) {
      this.loading = true
      try {
        const response = await axiosClient.put('/customer/change-password', payload)
        return response.data
      } catch (error) {
        console.error('Password change failed', error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
