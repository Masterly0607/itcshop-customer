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
        <!-- Product Info -->
        <div class="w-1/4 flex items-center gap-3">
          <img :src="item.img" alt="item image" class="h-16 w-16 object-cover rounded" />
          <span class="truncate text-sm">{{ item.name }}</span>
        </div>

        <!-- Price -->
        <div class="w-1/4 text-center text-sm">${{ item.price }}</div>

        <!-- Quantity -->
        <div class="w-1/4 text-center text-sm">
          <select v-model="item.quantity" class="border rounded px-2 py-1 w-16 text-center">
            <option v-for="n in 10" :key="n" :value="n">
              {{ n.toString().padStart(2, '0') }}
            </option>
          </select>
        </div>

        <!-- Subtotal -->
        <div class="w-1/4 text-center text-sm">${{ (item.price * item.quantity).toFixed(2) }}</div>
      </div>

      <button class="btn btn-outline px-10 py-5 mt-3 mb-10 btn-sm">Return To Shop</button>

      <div class="flex items-start gap-40 justify-between">
        <div class="flex gap-3 w-1/2">
          <input type="text" placeholder="Coupon Code" class="input input-neutral" />
          <button class="btn btn-primary px-10 py-5 text-white font-light btn-sm">
            Apply Coupon
          </button>
        </div>

        <div class="w-1/2">
          <div class="w-full p-5 border-solid border-2">
            <div class="mb-7 text-xl font-medium">Cart Total</div>
            <div>
              <div>
                <div class="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>$1750</span>
                </div>
                <div class="divider mb-0"></div>
              </div>
              <div>
                <div class="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div class="divider mb-0"></div>
              </div>
              <div>
                <div class="flex justify-between text-sm">
                  <span>Total:</span>
                  <span>$1750</span>
                </div>
              </div>
            </div>
            <div class="flex justify-center mt-5">
              <button class="btn btn-primary px-10 py-5 text-white font-light">
                Process to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-10">Your cart is empty.</p>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()
</script>
