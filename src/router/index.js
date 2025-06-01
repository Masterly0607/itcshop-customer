import { createRouter, createWebHistory } from 'vue-router'

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
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/views/CheckOutPage.vue'),
        },
        {
          path: 'order-history',
          name: 'OrderHistory',
          component: () => import('@/views/OrderHistoryPage.vue'),
        },
        {
          path: 'wishlist',
          name: 'WishList',
          component: () => import('@/views/WishListPage.vue'),
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
        {
          path: 'order-history',
          name: 'OrderHistory',
          component: () => import('@/views/OrderHistoryPage.vue'),
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
        },
        {
          path: '/signup',
          name: 'Signup',
          component: () => import('@/views/auth/SignUpPage.vue'),
        },
        {
          path: '/forgot-password',
          name: 'ForgotPassword',
          component: () => import('@/views/auth/ForgotPasswordPage.vue'),
        },
        {
          path: '/reset-password',
          name: 'ResetPassword',
          component: () => import('@/views/auth/ResetPasswordPage.vue'),
        },
        {
          path: '/verify-email',
          name: 'VerifyEmail',
          component: () => import('@/views/auth/VerifyEmailPage.vue'),
        },
        {
          path: '/verify-email-success',
          name: 'VerifyEmailSuccess',
          component: () => import('@/views/auth/VerifyEmailSuccessPage.vue'),
        },
      ],
    },

    // // NotFound Page
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/NotFoundPage.vue'),
    },
  ],
})

export default router
