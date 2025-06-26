import axios from 'axios'
import router from '@/router'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // when npm run dev, Vue will take from .env.development.
  withCredentials: true,
})

// Run before every requests. Every time you call an API with Axios like this: await axiosClient.get('/customer/profile'). Axios does this behind the scenes before it actually sends the request to your Laravel backend: Runs the request.use() function., Adds your token to the request headers., hen finally sends the request to the backend. it’s like a middleware for every outgoing request.
axiosClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('TOKEN')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isProtectedRoute = router.currentRoute.value.meta.requiresAuth

    if (error.response?.status === 401 && isProtectedRoute) {
      sessionStorage.removeItem('TOKEN')
      sessionStorage.removeItem('CUSTOMER')
      router.push({ name: 'Login' })
    }

    throw error
  }
)

// Why axiosClient.interceptors.response.use? (Real world example)
/*
1. User logs in → token saved ✅

2. They leave tab open 2 hours → token expired ❌

3. They go to /account → beforeEach still sees token in sessionStorage → allows it ✅

4. API call inside /account → returns 401 → now interceptor auto logs them out and redirects ⛔

Without the interceptor, they’ll stay on page but see broken behavior.


*/
export default axiosClient
