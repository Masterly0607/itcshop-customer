<template>
  <div class="fixed flex justify-center items-center inset-0 flex-col">
    <div class="font-medium text-7xl mb-10">404 Not Found</div>
    <div class="mb-10 text-sm">Your visited page not found. You may go home page.</div>

    <div class="btn btn-primary text-white px-10 font-light" @click="goHome">Back to home page</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>
