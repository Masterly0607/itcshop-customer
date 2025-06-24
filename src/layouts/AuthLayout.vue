<template>
  <div class="bg-gray-100 flex items-center justify-center p-5 min-h-screen">
    <div>
      <div class="text-center font-bold text-4xl text-primary">ITC SHOP</div>
      <div class="mt-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'


const authStore = useAuthStore()
onMounted(() => {
  authStore.init() // 👈 this sets token + customer from sessionStorage
})


</script>
