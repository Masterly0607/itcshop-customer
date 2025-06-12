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
    resendCooldown: 0,
    resendOtpTimer: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    init() {
      this.token = sessionStorage.getItem('TOKEN')
      const customer = sessionStorage.getItem('CUSTOMER')
      this.customer = customer ? JSON.parse(customer) : null
      this.pendingEmail = localStorage.getItem('pendingEmail') || null
    },

    async register(payload) {
      await axiosClient.post('/customer/register', payload)
      this.pendingEmail = payload.email
      localStorage.setItem('pendingEmail', payload.email)
      this.startResendCooldown()
      router.push({ name: 'VerifyEmail', query: { mode: 'register' } })
    },

    async verifyOtp({ otp }) {
      const payload = { email: this.pendingEmail, otp }
      const response = await axiosClient.post('/customer/verify-otp', payload)

      this.token = response.data.token
      this.customer = response.data.customer
      sessionStorage.setItem('TOKEN', this.token)
      sessionStorage.setItem('CUSTOMER', JSON.stringify(this.customer))
      localStorage.removeItem('pendingEmail')

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

    async loginWithGoogleRedirect() {
      const response = await axiosClient.get('/customer/auth/redirect/google')
      return response.data
    },

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
      localStorage.removeItem('pendingEmail')
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

    async sendForgotOtp(email) {
      try {
        const res = await axiosClient.post('/customer/forgot-password/send-otp', { email })
        toast.success(res.data.message)
        this.pendingEmail = email
        localStorage.setItem('pendingEmail', email)
        this.startResendCooldown()
        router.push({ name: 'VerifyEmail', query: { mode: 'forgot' } })
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to send OTP')
        throw err
      }
    },

    async verifyForgotOtp({ otp }) {
      try {
        const payload = { email: this.pendingEmail, otp }
        await axiosClient.post('/customer/forgot-password/verify-otp', payload)
        localStorage.setItem('resetOtp', otp)
      } catch (err) {
        throw err
      }
    },

    async resetPassword(payload) {
      try {
        payload.email = this.pendingEmail
        payload.otp = localStorage.getItem('resetOtp')
        const res = await axiosClient.post('/customer/forgot-password/reset', payload)
        toast.success(res.data.message)
        localStorage.removeItem('pendingEmail')
        localStorage.removeItem('resetOtp')
        router.push({ name: 'Login' })
      } catch (err) {
        toast.error(err.response?.data?.message || 'Password reset failed')
        throw err
      }
    },

    async resendOtp({ email }) {
      try {
        const res = await axiosClient.post('/customer/resend-otp', { email })
        toast.success(res.data.message)
        this.startResendCooldown()
      } catch (err) {
        toast.error(err.response?.data?.message || 'Resend failed')
        throw err
      }
    },

    startResendCooldown() {
      this.resendCooldown = 60
      if (this.resendOtpTimer) clearInterval(this.resendOtpTimer)
      this.resendOtpTimer = setInterval(() => {
        if (this.resendCooldown > 0) {
          this.resendCooldown--
        } else {
          clearInterval(this.resendOtpTimer)
        }
      }, 1000)
    },
  },
})
