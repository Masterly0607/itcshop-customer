<template>
  <div class="items-center rounded-lg shadow-lg p-8 bg-white">
    <div class="font-bold text-4xl mb-4 text-center">Reset Password</div>
    <div class="text-sm text-gray-400 text-center">Enter your new password below</div>

    <!-- Input -->
    <div class="flex flex-col gap-0">
      <fieldset class="fieldset mt-5 w-[400px]">
        <legend class="fieldset-legend">New Password</legend>
        <input
          type="password"
          class="input w-full input-lg focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
          placeholder="Enter new password"
        />
      </fieldset>
      <fieldset class="fieldset mt-3 w-[400px]">
        <legend class="fieldset-legend">Confirm Password</legend>
        <input
          type="password"
          class="input w-full input-lg focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
          placeholder="Confirm Password"
        />
      </fieldset>
    </div>

    <button
      class="btn btn-lg w-full my-6 btn-primary text-white text-light"
      :disabled="loading"
      @click="isLoading"
    >
      <span class="loading loading-spinner loading-xs" v-if="loading"></span>
      <span>Reset Password</span>
    </button>
    <RouterLink :to="{ name: 'Login' }">
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
