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
  try {
    this.customer = customer && customer !== 'undefined' ? JSON.parse(customer) : null
  } catch (e) {
    console.error('Failed to parse customer:', customer)
    this.customer = null
  }

  this.pendingEmail = localStorage.getItem('pendingEmail') || null
},


    async register(payload) {
      await axiosClient.post('/register', payload)
      this.pendingEmail = payload.email
      localStorage.setItem('pendingEmail', payload.email)
      this.startResendCooldown()
      router.push({ name: 'VerifyEmail', query: { mode: 'register' } })
    },

    async verifyOtp({ otp }) {
      const payload = { email: this.pendingEmail, otp }
      const response = await axiosClient.post('/verify-otp', payload)

      this.token = response.data.token
      this.customer = response.data.customer
      sessionStorage.setItem('TOKEN', this.token)
      sessionStorage.setItem('CUSTOMER', JSON.stringify(this.customer))
      localStorage.removeItem('pendingEmail')

      router.push({ name: 'Home' })
    },

    async login(email, password) {
      const response = await axiosClient.post('/login', { email, password })
      this.token = response.data.token
      this.customer = response.data.customer
      sessionStorage.setItem('TOKEN', this.token)
      sessionStorage.setItem('CUSTOMER', JSON.stringify(this.customer))
      router.push({ name: 'Home' })
    },

  async loginWithGoogleRedirect() {
  try {
    const response = await axiosClient.get('/auth/redirect/google')
    if (response?.data?.url) {
      return response.data.url
    } else {
      throw new Error('Google signup redirect URL missing')
    }
  } catch (err) {
    toast.error('Failed to start Google signup')
    console.error('Redirect error:', err)
    throw err
  }
},


   async loginWithGoogle(token) {
  this.token = token
  sessionStorage.setItem('TOKEN', token)

  axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`

  try {
    const res = await axiosClient.get('/profile')
    this.customer = res.data
    sessionStorage.setItem('CUSTOMER', JSON.stringify(res.data))

    // ✅ Use correct route name if needed
    router.push({ name: 'AccountDashboard' })
  } catch (err) {
    console.error('Google login failed:', err)
    toast.error(err?.response?.data?.message || 'Google login failed')
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

   getUser() {
  const token = sessionStorage.getItem('TOKEN')
  const customer = sessionStorage.getItem('CUSTOMER')

  if (token && customer) {
    this.token = token
    this.customer = JSON.parse(customer)
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
  }
},


    async updateUser(payload) {
      this.loading = true
      try {
        const response = await axiosClient.put('/profile', payload)
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
        const response = await axiosClient.put('/change-password', payload)
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
        const res = await axiosClient.post('/forgot-password/send-otp', { email })
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
        await axiosClient.post('/forgot-password/verify-otp', payload)
        localStorage.setItem('resetOtp', otp)
      } catch (err) {
        throw err
      }
    },

    async resetPassword(payload) {
      try {
        payload.email = this.pendingEmail
        payload.otp = localStorage.getItem('resetOtp')
        const res = await axiosClient.post('/forgot-password/reset', payload)
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
        const res = await axiosClient.post('/resend-otp', { email })
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
