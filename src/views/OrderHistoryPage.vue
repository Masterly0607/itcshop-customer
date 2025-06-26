<template>
  <section class="container-default mt-5">
    <div class="page-title text-center">Order History</div>

    <div v-if="orders.length > 0" class="space-y-6">
      <div v-for="order in orders" :key="order.id" class="rounded-lg shadow-lg p-5 bg-gray-50">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-sm text-gray-500">
              Order ID: <span class="font-medium">{{ order.id }}</span>
            </p>
            <p class="text-sm text-gray-500">Date: {{ new Date(order.created_at).toLocaleDateString() }}</p>
          </div>
          <span
            class="badge"
            :class="order.status === 'completed' ? 'badge-success' : 'badge-warning'"
          >
            {{ order.status }}
          </span>
        </div>

        <!-- Items -->
        <div class="divide-y">
          <div v-for="item in order.items" :key="item.id" class="flex justify-between py-2">
            <div class="flex items-center gap-3">
              <img :src="item.product.image" class="w-10 h-10 object-cover rounded" />
              <span>{{ item.product.title }}</span>
            </div>
            <span>${{ (item.unit_price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between mt-4 font-semibold">
          <span>Total:</span>
          <span>${{ order.total_price.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500">You haven't placed any orders yet.</p>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()

onMounted(() => {
  orderStore.fetchOrders()
})

const orders = orderStore.orders
</script>
