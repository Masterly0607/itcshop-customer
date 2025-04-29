import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Customer Routes
    {
      path: '/',
      component: () => import('@/layouts/customer/CustomerMainLayout.vue'),
      children: [
        { path: '', name: 'Home', component: () => import('@/views/customer/HomePage.vue') },
        { path: 'shop', name: 'Shop', component: () => import('@/views/customer/ShopPage.vue') },
        {
          path: 'product',
          name: 'ProductDetail',
          component: () => import('@/views/customer/ProductDetailPage.vue'),
        },
        { path: 'cart', name: 'Cart', component: () => import('@/views/customer/CartPage.vue') },
        {
          path: 'checkout',
          name: 'Checkout',
          component: () => import('@/views/customer/CheckOutPage.vue'),
        },
        {
          path: 'orders',
          name: 'OrderHistory',
          component: () => import('@/views/customer/OrderHistoryPage.vue'),
        },
        {
          path: 'wishlist',
          name: 'WishList',
          component: () => import('@/views/customer/WishListPage.vue'),
        },
        {
          path: 'account',
          name: 'AccountDashboard',
          component: () => import('@/views/customer/AccountDashboardPage.vue'),
        },
        {
          path: 'about-us',
          name: 'AboutUs',
          component: () => import('@/views/customer/AboutUsPage.vue'),
        },
        {
          path: 'contact-us',
          name: 'ContactUs',
          component: () => import('@/views/customer/ContactUsPage.vue'),
        },
      ],
    },

    //Admin Routes
    {
      path: '/admin',
      component: () => import('@/layouts/admin/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'AdminDashboard',
          component: () => import('@/views/admin/AdminDashboardPage.vue'),
        },
        {
          path: 'users',
          name: 'AdminUsers',
          component: () => import('@/views/admin/AdminUsersPage.vue'),
        },
        {
          path: 'products',
          name: 'AdminProducts',
          component: () => import('@/views/admin/AdminProductsPage.vue'),
        },
        {
          path: 'categories',
          name: 'AdminCategories',
          component: () => import('@/views/admin/AdminCategoriesPage.vue'),
        },
        {
          path: 'coupons',
          name: 'AdminCoupons',
          component: () => import('@/views/admin/AdminCouponsPage.vue'),
        },
        {
          path: 'settings',
          name: 'AdminSettings',
          component: () => import('@/views/admin/AdminSettingsPage.vue'),
        },
      ],
    },

    // Auth Routes
    {
      path: '/',
      component: () => import('@/layouts/customer/CustomerAuthLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/auth/LogInPage.vue'),
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
      ],
    },

    // // NotFound Page
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/NotFoundPage.vue') },
  ],
})

export default router
