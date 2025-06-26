<template>
  <section class="container-default">
    <div class="page-title">
      Cart <span class="text-sm">({{ cartStore.cartCount }})</span>
    </div>

    <div v-if="cartStore.cartItems.length > 0" class="w-full space-y-4">
      <!-- Header -->
      <div class="flex shadow-sm py-4 rounded-xl bg-gray-100 px-6">
        <div class="w-1/4 text-sm">Product</div>
        <div class="w-1/4 text-center text-sm">Price</div>
        <div class="w-1/4 text-center text-sm">Quantity</div>
        <div class="w-1/4 text-center text-sm">Subtotal</div>
      </div>

      <!-- Items -->
      <div
        v-for="item in cartStore.cartItems"
        :key="item.id"
        class="flex items-center shadow-md p-4 rounded-xl px-6 bg-white justify-center"
      >
        <div class="w-1/4 flex items-center gap-3">
          <img :src="item.image" class="h-16 w-16 object-cover rounded" />
          <span class="truncate text-sm">{{ item.title }}</span>
        </div>

        <div class="w-1/4 text-center text-sm">
          ${{ Number(item.price).toFixed(2) }}
        </div>

        <div class="w-1/4 text-center text-sm">
          <select
            v-model="item.quantity"
            class="border rounded px-2 py-1 w-16 text-center"
            @change="updateQty(item)"
          >
            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>

        <div class="w-1/4 text-center text-sm space-y-1">
          <div>${{ (Number(item.price) * item.quantity).toFixed(2) }}</div>
          <button
            class="text-red-500 text-xs underline"
            @click="removeItem(item.id)"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-10 flex justify-between items-center">
        <router-link to="/shop" class="btn btn-outline btn-sm">
          ← Continue Shopping
        </router-link>

        <div class="text-right space-y-2">
          <div class="text-sm">Subtotal: <strong>${{ subtotal }}</strong></div>
          <div class="text-sm">Shipping: <strong>Free</strong></div>
          <div class="text-md font-semibold">Total: <strong>${{ subtotal }}</strong></div>
          <button class="btn btn-primary text-white mt-2" @click="goToCheckout">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-10">Your cart is empty.</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

// Stores and router
const cartStore = useCartStore()
const router = useRouter()

// Update quantity
const updateQty = (item) => {
  cartStore.updateQuantity(item.id, item.quantity)
}

// Remove item from cart
const removeItem = (id) => {
  cartStore.removeFromCart(id)
}

// Calculate subtotal
const subtotal = computed(() => {
  return cartStore.cartItems
    .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    .toFixed(2)
})

// Navigate to checkout
const goToCheckout = () => {
  router.push({ name: 'Checkout' })
}
</script>
