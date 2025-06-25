<template>
  <div class="items-center rounded-lg shadow-lg p-8 bg-white min-h-[500px]">
    <div class="font-bold text-4xl mb-4 text-center">Reset Password</div>
    <div class="text-sm text-gray-400 text-center">Enter your new password below</div>

    <!-- Input -->
    <div class="flex flex-col mb-5">
      <Form :validation-schema="formValidation" @submit="handleSubmit">
        <fieldset class="fieldset mt-5 w-[400px]">
          <legend class="fieldset-legend">New Password</legend>
          <Field
            v-model="form.password"
            type="password"
            name="password"
            class="input w-full focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
            placeholder="Enter new password"
          />
          <ErrorMessage class="text-red-500 text-xs block mt-1" name="password" />

          <legend class="fieldset-legend">Confirm Password</legend>
          <Field
            v-model="form.confirmPassword"
            type="password"
            name="confirmPassword"
            class="input w-full focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
            placeholder="Confirm password"
          />
          <ErrorMessage class="text-red-500 text-xs block mt-1" name="confirmPassword" />
        </fieldset>

        <BaseButton label="Reset Password" :loading="loading" class="mt-4" />
      </Form>
    </div>

    <RouterLink :to="{ name: 'Login' }">
      <span class="text-xs text-light text-primary">Back to Login</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/core/BaseButton.vue'
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)

const form = ref({
  password: '',
  confirmPassword: '',
})

const formValidation = yup.object({
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

const handleSubmit = async () => {
  const email = localStorage.getItem('resetEmail')
  const otp = localStorage.getItem('resetOtp') // optional, if you saved OTP

  if (!email || !otp) {
    toast.error('Session expired. Please start over.')
    router.push({ name: 'ForgotPassword' })
    return
  }

  loading.value = true
  try {
    await authStore.resetPassword({
      email,
      otp,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
    })

    localStorage.removeItem('resetEmail')
    localStorage.removeItem('resetOtp')

    toast.success('Password reset successfully!')
    router.push({ name: 'Login' })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
