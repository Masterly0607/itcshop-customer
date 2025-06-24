<template>
  <div class="card bg-base-200 w-64 shadow-sm hover:shadow-md transition-all duration-300">
    <router-link
      :to="{
        name: 'ProductDetail',
        params: { id: product.id },
   query: {
  category: product.category?.name ?? '',
  name: product.title
}
      }"
    >
      <figure>
        <img
          :src="product.image || defaultImage"
          :alt="product.name"
          class="w-full h-40 object-cover"
        />
      </figure>
      <div class="card-body">
        <div class="flex flex-col gap-2">
          <h2 class="card-title text-sm">{{ product.title }}</h2>
          <p>
            <span class="text-primary pr-3 text-xs">${{ product.price }}</span>
            <span v-if="product.oldPrice" class="line-through text-xs"
              >${{ product.oldPrice }}</span
            >
          </p>
          <div class="rating rating-xs">
            <div
              v-for="n in 5"
              :key="n"
              class="mask mask-star"
              :class="{ 'bg-orange-400': n <= (product.rating || 4) }"
            ></div>
          </div>
        </div>
      </div>
    </router-link>

    <div class="card-actions justify-between px-4 pb-4 items-center">
      <button
        class="btn btn-circle btn-ghost"
        :class="{ 'bg-red-200 text-red-600': isInWishlist }"
        @click="handleToggleWishlist"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          class="size-[1.5em]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>

      <div class="btn btn-primary text-white btn-sm" @click="handleAddToCart">
        {{ isInCart ? 'Go To Cart' : 'Add To Cart' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { toast } from 'vue3-toastify'

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// Default fallback image
const defaultImage = 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'

// Stores and router
const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Computed states
const isInCart = computed(() => cartStore.cartItems.some((item) => item.id === props.product.id))

const isInWishlist = computed(() =>
  wishlistStore.wishlistItems.some((item) => item.id === props.product.id),
)

// Add to cart function
const handleAddToCart = async () => {
  if (isInCart.value) {
    router.push({ name: 'Cart' })
  } else {
    await cartStore.addToCart(props.product)
    wishlistStore.removeFromWishlist(props.product.id)
    toast.success(`${props.product.name} added to cart!`)
  }
}

// Toggle wishlist handler
// ✅ Updated toggle wishlist handler using backend
const handleToggleWishlist = async () => {
  const exists = isInWishlist.value

  try {
    await wishlistStore.toggleWishlist(props.product)

    if (exists) {
      toast.info(`${props.product.title} removed from wishlist`)
    } else {
      toast.success(`${props.product.title} added to wishlist`)
    }
  } catch (err) {
    toast.error('Failed to update wishlist')
    console.error(err)
  }
}

</script>
