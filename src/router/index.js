import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 🏠 Main Public & Customer Pages
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('@/views/HomePage.vue') },
        { path: 'shop', name: 'Shop', component: () => import('@/views/ProductListPage.vue') },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          component: () => import('@/views/ProductDetailPage.vue'),
        },
        {
          path: '/products/category/:categoryName',
          name: 'CategoryPage',
          component: () => import('@/views/CategoryPage.vue'),
        },
        // { path: '/products/flash-sale', component: FlashSalePage },
        // { path: '/products/best-selling', component: BestSellingPage },
        // { path: '/products/new', component: NewProductsPage },
        // { path: '/search', component: SearchResultsPage },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/views/CartPage.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/views/CheckOutPage.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'order-history',
          name: 'OrderHistory',
          component: () => import('@/views/OrderHistoryPage.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'wishlist',
          name: 'WishList',
          component: () => import('@/views/WishListPage.vue'),
          meta: { requiresAuth: true },
        },
        { path: 'about-us', name: 'AboutUs', component: () => import('@/views/AboutUsPage.vue') },
        {
          path: 'contact-us',
          name: 'ContactUs',
          component: () => import('@/views/ContactUsPage.vue'),
        },
      ],
    },

    // 👤 Customer Account (Dashboard)
    {
      path: '/account',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'AccountDashboard',
          component: () => import('@/views/AccountDashboardPage.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },

    // ✅ Standalone route (order confirmation)
    {
      path: '/order-confirmation/:orderId',
      component: () => import('@/layouts/EmptyLayout.vue'),
      children: [
        {
          path: '',
          name: 'OrderConfirmation',
          component: () => import('@/views/OrderConfirmation.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },

    // 🔐 Auth Routes
    {
      path: '/auth',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/auth/LoginPage.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: 'signup',
          name: 'Signup',
          component: () => import('@/views/auth/SignUpPage.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: 'forgot-password',
          name: 'ForgotPassword',
          component: () => import('@/views/auth/ForgotPasswordPage.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: 'reset-password',
          name: 'ResetPassword',
          component: () => import('@/views/auth/ResetPasswordPage.vue'),
          meta: { requiresGuest: true },
        },
        {
          path: 'verify-email',
          name: 'VerifyEmail',
          component: () => import('@/views/auth/VerifyEmailPage.vue'),
          meta: { requiresGuest: true },
        },
{
  path: 'google-success',
  name: 'GoogleSuccess',
  component: () => import('@/views/auth/GoogleSuccessPage.vue'),
  meta: { requiresGuest: true },
},

      ],
    },

    // 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/NotFoundPage.vue'),
    },
  ],
})

// 🔐 Route Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.token) {
    next({ name: 'Login' })
  } else if (to.meta.requiresGuest && authStore.token) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
