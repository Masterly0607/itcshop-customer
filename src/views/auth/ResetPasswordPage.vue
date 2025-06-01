<template>
  <div class="items-center rounded-lg shadow-lg p-8 bg-white min-h-[500px]">
    <div class="font-bold text-4xl mb-4 text-center">Reset Password</div>
    <div class="text-sm text-gray-400 text-center">Enter your new password below</div>

    <!-- Input -->
    <div class="flex flex-col mb-5">
      <Form :validation-schema="formValidation">
        <fieldset class="fieldset mt-5 w-[400px]">
          <legend class="fieldset-legend">New Password</legend>
          <Field
            type="password"
            name="password"
            class="input w-full focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
            placeholder="Enter new password"
          />
          <ErrorMessage class="text-red-500 text-xs block mt-1" name="password"> </ErrorMessage>
          <legend class="fieldset-legend">Confirm Password</legend>
          <Field
            type="password"
            name="confirmPassword"
            class="input w-full focus:ring-2 focus:ring-primary focus:outline-none border border-gray-300"
            placeholder="Confirm Password"
          />
          <ErrorMessage
            class="text-red-500 text-xs block mt-1"
            name="confirmPassword"
          ></ErrorMessage>
        </fieldset>
      </Form>
    </div>

    <BaseButton label="Reset Password" :loading="loading" />
    <RouterLink :to="{ name: 'Login' }">
      <span class="text-xs text-light text-primary">Back to Login</span>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate' // Import VeeValidation Library for input validation
import * as yup from 'yup' // Validation rule
import BaseButton from '@/components/core/BaseButton.vue'
const formValidation = yup.object({
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})
const loading = ref(false)
</script>
