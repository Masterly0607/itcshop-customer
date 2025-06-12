<template>
  <div class="flex flex-col items-center rounded-lg shadow-lg p-8 bg-white">
    <div class="font-bold text-4xl mb-4">Forgot Your Password?</div>
    <div class="text-sm text-gray-400 text-center">
      Enter your email and we’ll send you a code to reset your password.
    </div>

    <!-- Form -->
    <Form :validation-schema="formValidation" @submit="handleSendOtp" class="mt-8 w-full max-w-sm">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Email address</legend>
        <Field
          v-model="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          class="input w-full input-lg rounded-none focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
        />
        <ErrorMessage class="text-red-500 text-xs block mt-1" name="email" />
      </fieldset>

      <!-- Submit Button -->
      <BaseButton class="mt-5" type="submit" label="Send Reset Link" :loading="loading" />
    </Form>

    <RouterLink :to="{ name: 'Login' }" class="mt-4">
      <span class="text-sm text-light text-primary">Back to Login</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/authStore'
import BaseButton from '@/components/core/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const email = ref('')
const formValidation = yup.object({
  email: yup.string().email().required('Email is required'),
})

const handleSendOtp = async () => {
  loading.value = true
  try {
    await authStore.sendForgotOtp(email.value)
    localStorage.setItem('resetEmail', email.value)
    router.push({ name: 'VerifyEmail', query: { mode: 'forgot' } })
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
