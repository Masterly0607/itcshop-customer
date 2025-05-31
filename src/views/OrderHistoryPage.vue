<template>
  <section class="container-default mt-5">
    <div class="page-title">Order History</div>

    <div v-if="orders.length > 0" class="space-y-6">
      <div v-for="order in orders" :key="order.id" class="rounded-lg shadow-lg p-5 bg-gray-50">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-sm text-gray-500">
              Order ID: <span class="font-medium">{{ order.id }}</span>
            </p>
            <p class="text-sm text-gray-500">Date: {{ order.date }}</p>
          </div>
          <span
            class="badge"
            :class="order.status === 'Delivered' ? 'badge-success' : 'badge-warning'"
          >
            {{ order.status }}
          </span>
        </div>

        <!-- Items -->
        <div class="divide-y">
          <div v-for="item in order.items" :key="item.name" class="flex justify-between py-2">
            <div class="flex items-center gap-3">
              <img :src="item.img" class="w-10 h-10 object-cover rounded" />
              <span>{{ item.name }}</span>
            </div>
            <span>${{ item.price }}</span>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between mt-4 font-semibold">
          <span>Total:</span>
          <span>${{ order.total }}</span>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500">You haven't placed any orders yet.</p>
  </section>
</template>

<script setup>
const orders = [
  {
    id: 'ORD123',
    date: '2025-05-10',
    status: 'Delivered',
    total: 700,
    items: [
      { name: 'LCD Monitor', price: 650, img: '/img/keyboard.png' },
      { name: 'Mouse', price: 50, img: '/img/keyboard.png' },
    ],
  },
  {
    id: 'ORD122',
    date: '2025-04-30',
    status: 'Processing',
    total: 300,
    items: [{ name: 'Gamepad', price: 300, img: '/img/keyboard.png' }],
  },
]
</script>
