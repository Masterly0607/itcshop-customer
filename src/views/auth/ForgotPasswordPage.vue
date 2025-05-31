<template>
  <div class="flex flex-col items-center rounded-lg shadow-lg p-8 bg-white">
    <div class="font-bold text-4xl mb-4">Forgot Your Password?</div>
    <div class="text-sm text-gray-400">
      Enter your email and we’ll send you a link to reset your password.
    </div>

    <!-- Input -->
    <fieldset class="fieldset mt-8 w-full">
      <legend class="fieldset-legend">Email address</legend>
      <Form :validation-schema="formValidation">
        <Field
          type="email"
          name="email"
          class="input w-full input-xl rounded-none focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
        />
        <ErrorMessage class="text-red-500 text-xs block mt-1" name="email"> </ErrorMessage>
      </Form>
    </fieldset>
    <BaseButton label="Send Reset Link" :loading="loading" />
    <RouterLink :to="{ name: 'Login' }" class="mt-3">
      <span class="text-sm text-light text-primary">Back to Login</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate' // Import VeeValidation Library for input validation
import * as yup from 'yup' // Validation rule
import BaseButton from '@/components/core/BaseButton.vue'
const formValidation = yup.object({
  email: yup.string().required().email(),
})
const loading = ref(false)
</script>
