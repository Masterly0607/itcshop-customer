<template>
  <div
    class="flex gap-10 items-center p-10 shadow-2xl rounded-lg bg-white max-w-3xl"
    :class="{ 'cursor-not-allowed': isLoading }"
  >
    <!-- Input box -->
    <div class="w-1/2">
      <div class="flex flex-col">
        <div class="mb-8">
          <div class="font-medium text-3xl mb-5 text-center">Log Into ITC SHOP</div>

          <!-- Form -->
          <form action="" class="flex flex-col gap-5 mt-5" @submit.prevent="handleLogin">
            <input
              type="text"
              placeholder="Email or Phone Number"
              class="input input-ghost w-full border-b-2 border-gray-300 border-0 rounded-none focus:ring-2 focus:ring-primary focus:outline-none"
              v-model="email"
            />
            <input
              type="password"
              placeholder="Password"
              class="input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full focus:ring-2 focus:ring-primary focus:outline-none"
              required
              v-model="password"
            />

            <!-- Button -->
            <div class="flex justify-between items-center mt-10">
              <button class="btn btn-lg btn-primary text-white text-sm px-8" :disabled="isLoading">
                <span v-if="isLoading" class="loading loading-spinner loading-xs"></span>
                <span v-else>Login</span>
              </button>
              <RouterLink :to="{ name: 'ForgotPassword' }">
                <span class="text-primary">Forgot Password?</span>
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Img box -->
    <div class="bg-red-300 w-1/2">
      <img src="/img/login.jpg" alt="adasd" class="h-full w-full object-cover" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false

    console.log('Logged in with:', email.value, password.value)
  }, 2000)
}
</script>
