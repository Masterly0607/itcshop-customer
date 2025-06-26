<template>
  <section class="container-default mt-20 text-center px-4">
    <div class="text-6xl text-green-500 mb-4">✅</div>
    <h1 class="text-3xl md:text-4xl font-bold text-primary mb-2">Thank You for Your Order!</h1>
    <p class="text-gray-600 mb-6">
      Your order <span class="font-semibold text-black">#{{ orderId }}</span> has been placed successfully.
    </p>

    <!-- Order Summary -->
    <div v-if="orderDetail" class="bg-white shadow-md p-6 rounded-xl max-w-xl mx-auto text-left space-y-4">
      <h2 class="text-xl font-semibold">Order Summary</h2>

      <div class="space-y-2 text-sm text-gray-700">
        <div v-for="item in orderDetail.items" :key="item.id" class="flex justify-between">
          <span>{{ item.product_name }}</span>
          <span>${{ (item.unit_price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="border-t pt-3 flex justify-between font-semibold">
          <span>Total:</span>
          <span>${{ orderDetail.total_price.toFixed(2) }}</span>
        </div>
      </div>

      <p class="text-xs text-gray-500">Estimated delivery: 3–5 business days</p>
    </div>

    <p v-else class="text-sm text-gray-400">Loading order details...</p>

    <!-- CTA Buttons -->
    <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
      <router-link :to="{ name: 'Shop' }" class="btn btn-outline">Continue Shopping</router-link>
      <router-link :to="{ name: 'OrderHistory' }" class="btn btn-primary text-white">View My Orders</router-link>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const route = useRoute()
const orderId = route.params.orderId
const orderStore = useOrderStore()

onMounted(() => {
  if (orderId) orderStore.fetchOrderDetail(orderId)
})

const orderDetail = orderStore.orderDetail
</script>
