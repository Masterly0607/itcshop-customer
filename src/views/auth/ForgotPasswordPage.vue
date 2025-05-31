<template>
  <div class="flex flex-col items-center rounded-lg shadow-lg p-8 bg-white">
    <div class="font-bold text-4xl mb-4">Forgot Your Password?</div>
    <div class="text-sm text-gray-400">
      Enter your email and we’ll send you a link to reset your password.
    </div>

    <!-- Input -->
    <fieldset class="fieldset mt-8 w-full">
      <legend class="fieldset-legend">Email address</legend>
      <input
        type="email"
        class="input w-full input-xl rounded-none focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
      />
    </fieldset>
    <button
      class="btn btn-lg w-full mt-6 btn-primary text-white text-light"
      :disabled="loading"
      @click="isLoading"
    >
      <span class="loading loading-spinner loading-xs" v-if="loading"></span>
      <span v-else>Send Reset Link</span>
    </button>
    <RouterLink :to="{ name: 'Login' }" class="mt-3">
      <span class="text-sm text-light text-primary">Back to Login</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const isLoading = () => {
  loading.value = !loading.value
}
</script>
