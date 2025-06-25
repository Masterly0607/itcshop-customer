

<template>
  <RouterView />
</template>
<script setup>
import { onMounted } from 'vue'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from './stores/cartStore'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

onMounted(() => {
  const token = sessionStorage.getItem('TOKEN')
  if (token) {
    wishlistStore.fetchWishlist()
    cartStore.fetchCart()
  }
})


</script>
