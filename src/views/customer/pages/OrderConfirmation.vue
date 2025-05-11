<template>
  <section class="container-default mt-20 text-center px-4">
    <!-- Success Icon -->
    <div class="text-6xl text-green-500 mb-4">✅</div>

    <!-- Thank You -->
    <h1 class="text-3xl md:text-4xl font-bold text-primary mb-2">Thank You for Your Order!</h1>
    <p class="text-gray-600 mb-6">
      Your order
      <span class="font-semibold text-black">#{{ orderId }}</span>
      has been placed successfully.
    </p>

    <!-- Order Summary -->
    <div class="bg-white shadow-md p-6 rounded-xl max-w-xl mx-auto text-left space-y-4">
      <h2 class="text-xl font-semibold">Order Summary</h2>

      <div class="space-y-2 text-sm text-gray-700">
        <div class="flex justify-between">
          <span>Product: LCD Monitor</span>
          <span>$650</span>
        </div>
        <div class="flex justify-between">
          <span>Product: Mouse</span>
          <span>$50</span>
        </div>
        <div class="border-t pt-3 flex justify-between font-semibold">
          <span>Total:</span>
          <span>$700</span>
        </div>
      </div>

      <p class="text-xs text-gray-500">Estimated delivery: 3–5 business days</p>
    </div>

    <!-- CTA Buttons -->
    <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
      <router-link to="/" class="btn btn-outline">Continue Shopping</router-link>
      <router-link to="/orders" class="btn btn-primary text-white">View My Orders</router-link>
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = route.params.orderId || '123ABC'
</script>
