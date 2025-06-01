<template>
  <div class="flex flex-col items-center justify-center">
    <div
      class="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center transition-all duration-500 ease-in-out transform translate-y-0 opacity-100"
    >
      <svg
        class="mx-auto w-16 h-16 text-green-500 mb-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>

      <h1 class="text-2xl font-bold text-gray-800 mb-2">Email Verified Successfully!</h1>
      <p class="text-gray-600 mb-6">
        Your account is now verified. You can log in and start shopping securely.
      </p>

      <RouterLink :to="{ name: 'Login' }">
        <BaseButton label="Go to Login" :loading="loading" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/core/BaseButton.vue'
import { ref } from 'vue'
const loading = ref(false)
</script>
