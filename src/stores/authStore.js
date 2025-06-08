import { defineStore } from 'pinia'
import axiosClient from '@/axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem('TOKEN'),
    customer: JSON.parse(sessionStorage.getItem('CUSTOMER') || 'null'),
    // JSON.parse = JSON to object
    // Why 'null'? = JSON.parse is expecting string, but when no user it will return null. It crashes our app.
    pendingEmail: localStorage.getItem('pendingEmail') || null,
    loading: false,
  }),

  // getters: computed properties for pinia store
  getters: {
    isLoggedIn: (state) => !!state.token, // we want to get boolean value
    // !!state.token = Converts any value into a real boolean
    // state.token = return real values(if truely => 'masterly', else 'falsy' => null)
    // !state.token = return boolean (if truely => false, else falsy => true )
    // !!state.token = return boolean (if truely => true, else falsy => false )
    // truely value = 'hello', 123(execpt 0), [], {}, '0'
    // falsy value = false, 0, '', null, undefined, NaN
  },

  actions: {
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
      sessionStorage.setItem('CUSTOMER', JSON.stringify(this.customer)) // why JSON.stringify(this.customer)? = Because sessionStorage (and localStorage) can only store strings, not objects or arrays. Axios (or Fetch) in JavaScript automatically converts the JSON string into a usable JavaScript object.

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

    logout() {
      this.token = null
      this.customer = null
      sessionStorage.removeItem('TOKEN')
      sessionStorage.removeItem('CUSTOMER')
      router.push({ name: 'Login' })
    },

    fetchUser() {
      this.loading = true
      const savedUser = sessionStorage.getItem('CUSTOMER')
      if (savedUser) {
        this.customer = JSON.parse(savedUser)
      } else {
        this.customer = null
      }
      this.loading = false
    },
  },
})
