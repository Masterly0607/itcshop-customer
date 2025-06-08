<template>
  <div
    class="flex gap-10 p-10 shadow-2xl rounded-lg bg-white max-w-3xl items-stretch min-h-[400px]"
    :class="{ 'cursor-not-allowed': loading }"
  >
    <!-- Input box -->
    <div class="w-1/2 flex flex-col justify-center h-full">
      <div class="font-medium text-3xl mb-5 text-center">Log Into ITC SHOP</div>

      <!-- Form -->
      <Form
        action=""
        class="flex flex-col gap-5 mt-5"
        @submit="handleLogin"
        :validation-schema="formValidation"
      >
        <div>
          <Field
            name="email"
            type="email"
            placeholder="Email or Phone Number"
            class="focus:ring-2 focus:ring-primary focus:outline-none input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full"
          />
          <ErrorMessage class="text-red-500 text-xs block mt-1" name="email"> </ErrorMessage>
        </div>

        <div>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            class="focus:ring-2 focus:ring-primary focus:outline-none input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full"
          />
          <ErrorMessage class="text-red-500 text-xs block mt-1" name="password"> </ErrorMessage>
        </div>
        <BaseButton label="Login" :loading="loading" type="submit" />
      </Form>
      <!-- Button -->
      <div class="flex justify-between">
        <RouterLink :to="{ name: 'ForgotPassword' }">
          <span class="text-primary text-xs underline">Forgot Password?</span>
        </RouterLink>
      </div>
      <div class="mt-5 text-xs">
        Don't have an account?
        <RouterLink :to="{ name: 'Signup' }" class="text-primary underline ml-1">
          Sign Up
        </RouterLink>
      </div>
    </div>

    <!-- Img box -->
    <div class="w-1/2 h-full">
      <img src="/img/login.jpg" alt="Login Illustration" class="h-full w-full object-cover" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate' // Import VeeValidation Library for input validation
import * as yup from 'yup' // Validation rule
import BaseButton from '@/components/core/BaseButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'
const authStore = useAuthStore()
const loading = ref(false)
const formValidation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
})

const handleLogin = async (values) => {
  loading.value = true
  try {
    await authStore.login(values.email, values.password)
    toast.success('Login successful')
  } catch (err) {
    console.error(err)

    const message = err?.response?.data?.message || 'Login failed. Please try again.'
    toast.error(message)
  } finally {
    loading.value = false
  }
}
</script>
