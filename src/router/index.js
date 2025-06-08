import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Customer Routes
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('@/views/HomePage.vue') },
        {
          path: 'shop',
          name: 'Shop',
          component: () => import('@/views/ShopPage.vue'),
        },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          component: () => import('@/views/ProductDetailPage.vue'),
        },
        {
          path: '/products',
          name: 'ProductsByCategory',
          component: () => import('@/components/core/ProductsByCategoryPage.vue'),
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/views/CartPage.vue'),
          meta: { requiresAuth: true }, // Protected
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/views/CheckOutPage.vue'),
          meta: { requiresAuth: true }, // Protected
        },
        {
          path: 'order-history',
          name: 'OrderHistory',
          component: () => import('@/views/OrderHistoryPage.vue'),
          meta: { requiresAuth: true }, // Protected
        },
        {
          path: 'wishlist',
          name: 'WishList',
          component: () => import('@/views/WishListPage.vue'),
          meta: { requiresAuth: true }, // Protected
        },
        {
          path: 'about-us',
          name: 'AboutUs',
          component: () => import('@/views/AboutUsPage.vue'),
        },
        {
          path: 'contact-us',
          name: 'ContactUs',
          component: () => import('@/views/ContactUsPage.vue'),
        },
      ],
    },

    // Customer Account Routes
    {
      path: '/account',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'AccountDashboard',
          component: () => import('@/views/AccountDashboardPage.vue'),
          meta: { requiresAuth: true }, // Protected
        },
      ],
    },

    // Customer Empthy Layout
    {
      path: '/',
      component: () => import('@/layouts/EmptyLayout.vue'),
      children: [
        {
          path: 'order-confirmation/:orderId',
          name: 'OrderConfirmation',
          component: () => import('@/views/OrderConfirmation.vue'),
          meta: { requiresAuth: true }, // Protected
        },
      ],
    },

    // Customer Auth Routes
    {
      path: '/',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/auth/LoginPage.vue'),
          meta: {
            requiresGuest: true,
          },
        },
        {
          path: '/signup',
          name: 'Signup',
          component: () => import('@/views/auth/SignUpPage.vue'),
          meta: {
            requiresGuest: true,
          },
        },
        {
          path: '/forgot-password',
          name: 'ForgotPassword',
          component: () => import('@/views/auth/ForgotPasswordPage.vue'),
          meta: {
            requiresGuest: true,
          },
        },
        {
          path: '/reset-password',
          name: 'ResetPassword',
          component: () => import('@/views/auth/ResetPasswordPage.vue'),
          meta: {
            requiresGuest: true,
          },
        },
        {
          path: '/verify-email',
          name: 'VerifyEmail',
          component: () => import('@/views/auth/VerifyEmailPage.vue'),
          meta: {
            requiresGuest: true,
          },
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/NotFoundPage.vue'),
    },
  ],
})

// Route Guard
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
