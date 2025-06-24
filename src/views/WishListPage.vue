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
        <router-link
          :to="{
            name: 'ProductDetail',
            params: { id: product.id },
            query: { category: product.category?.name ?? '', name: product.title },
          }"
        >
          <figure>
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-40 object-cover"
            />
          </figure>
        </router-link>

        <div class="card-body">
          <h2 class="card-title text-lg">{{ product.title }}</h2>
          <div class="flex gap-3">
            <span class="text-primary">${{ product.price }}</span>
            <span v-if="product.oldPrice" class="line-through text-gray-400 text-sm">
              ${{ product.oldPrice }}
            </span>
          </div>

          <div class="card-actions justify-between mt-4 items-center">
            <button class="btn btn-circle btn-ghost btn-error" @click="remove(product.id)">
              🗑️
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
import { computed, onMounted } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from '@/stores/cartStore'
import { toast } from 'vue3-toastify'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

// 🔄 Load wishlist from backend when component loads
onMounted(() => {
  wishlistStore.fetchWishlist()
})

// ✅ Always use computed for reactivity
const wishlistItems = computed(() => wishlistStore.wishlistItems)

// ✅ Remove using backend
const remove = async (id) => {
  try {
    await wishlistStore.removeFromWishlist(id)
    toast.info('Item removed from wishlist')
  } catch (err) {
    toast.error('Failed to remove item')
    console.error(err)
  }
}

//  Add to cart + remove from wishlist
const handleAddToCart = async (product) => {
  try {
    await cartStore.addToCart(product)
    await wishlistStore.removeFromWishlist(product.id)
  
  } catch (err) {
    toast.error('Failed to add to cart')
    console.error(err)
  }
}
</script>
