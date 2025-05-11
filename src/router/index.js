import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Customer Routes
    {
      path: '/',
      component: () => import('@/layouts/CustomerLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('@/views/customer/pages/HomePage.vue') },
        {
          path: 'shop',
          name: 'Shop',
          component: () => import('@/views/customer/pages/ShopPage.vue'),
        },
        {
          path: 'product/:id',
          name: 'ProductDetail',
          component: () => import('@/views/customer/pages/ProductDetailPage.vue'),
        },
        {
          path: '/products',
          name: 'ProductsByCategory',
          component: () => import('@/views/customer/components/common/ProductsByCategoryPage.vue'),
        },
        {
          path: 'cart',
          name: 'Cart',
          component: () => import('@/views/customer/pages/CartPage.vue'),
        },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/views/customer/pages/CheckOutPage.vue'),
        },
        {
          path: 'orders',
          name: 'OrderHistory',
          component: () => import('@/views/customer/pages/OrderHistoryPage.vue'),
        },
        {
          path: 'wishlist',
          name: 'WishList',
          component: () => import('@/views/customer/pages/WishListPage.vue'),
        },
        {
          path: 'account',
          name: 'AccountDashboard',
          component: () => import('@/views/customer/pages/AccountDashboardPage.vue'),
        },
        {
          path: 'about-us',
          name: 'AboutUs',
          component: () => import('@/views/customer/pages/AboutUsPage.vue'),
        },
        {
          path: 'contact-us',
          name: 'ContactUs',
          component: () => import('@/views/customer/pages/ContactUsPage.vue'),
        },
        {
          path: '/order-confirmation/:orderId',
          name: 'OrderConfirmation',
          component: () => import('@/views/customer/pages/OrderConfirmation.vue'),
        },
      ],
    },

    // Customer Auth Routes
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/customer/pages/auth/LoginPage.vue'),
        },
        {
          path: '/signup',
          name: 'Signup',
          component: () => import('@/views/customer/pages/auth/SignUpPage.vue'),
        },
        {
          path: '/forgot-password',
          name: 'ForgotPassword',
          component: () => import('@/views/customer/pages/auth/ForgotPasswordPage.vue'),
        },
        {
          path: '/reset-password',
          name: 'ResetPassword',
          component: () => import('@/views/customer/pages/auth/ResetPasswordPage.vue'),
        },
        {
          path: '/verify-email',
          name: 'VerifyEmail',
          component: () => import('@/views/customer/pages/auth/VerifyEmailPage.vue'),
        },
      ],
    },

    //Admin Routes
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('@/views/admin/pages/AdminDashboardPage.vue'),
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('@/views/admin/pages/AdminUsersPage.vue'),
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('@/views/admin/pages/AdminProductsPage.vue'),
        },
        {
          path: 'categories',
          name: 'AdminCategories',
          component: () => import('@/views/admin/pages/AdminCategoriesPage.vue'),
        },
        {
          path: 'coupons',
          name: 'AdminCoupons',
          component: () => import('@/views/admin/pages/AdminCouponsPage.vue'),
        },
        {
          path: 'settings',
          name: 'AdminSettings',
          component: () => import('@/views/admin/pages/AdminSettingsPage.vue'),
        },
      ],
    },

    // // NotFound Page
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/NotFoundPage.vue') },
  ],
})

export default router
