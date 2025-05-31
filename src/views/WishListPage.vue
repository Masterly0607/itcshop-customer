<template>
  <section class="container-default">
    <div class="page-title">
      Wishlist <span class="text-sm">({{ wishlistStore.wishlistCount }})</span>
    </div>

    <div
      v-if="wishlistItems.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in wishlistItems"
        :key="product.id"
        class="card bg-base-100 w-full shadow-md transition-all duration-300"
      >
        <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }">
          <figure>
            <img
              :src="product.img || defaultImage"
              :alt="product.name"
              class="w-full h-40 object-cover"
            />
          </figure>
        </router-link>

        <div class="card-body">
          <h2 class="card-title text-lg">{{ product.name }}</h2>
          <div class="flex gap-3">
            <span class="text-primary">${{ product.price }}</span>
            <span class="text-gray line-through">${{ product.oldPrice }}</span>
          </div>

          <div class="card-actions justify-between mt-4 items-center">
            <button class="btn btn-circle btn-ghost btn-error" @click="remove(product.id)">
              <!-- Trash Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>

            <button class="btn btn-primary btn-sm text-white" @click="handleAddToCart(product)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="text-center text-gray-500 mt-20">Your wishlist is empty.</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from '@/stores/cartStore'
import { toast } from 'vue3-toastify'

// Stores
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

// Computed wishlist items
const wishlistItems = computed(() => wishlistStore.wishlistItems)
const defaultImage = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'

// Remove product from wishlist
const remove = (id) => {
  const product = wishlistItems.value.find((p) => p.id === id)
  wishlistStore.removeFromWishlist(id)
  toast.info(product ? `${product.name} removed from wishlist` : `Item removed from wishlist`)
}

// Add to cart and remove from wishlist
const handleAddToCart = (product) => {
  cartStore.addToCart(product)
  wishlistStore.removeFromWishlist(product.id)
  toast.success(`${product.name} added to cart and removed from wishlist`)
}
</script>
