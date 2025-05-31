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
        @submit.prevent="handleLogin"
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
      </Form>
      <!-- Button -->
      <div class="mt-7">
        <BaseButton label="Login" :loading="loading" @click="handleLogin" class="mb-1" />
        <RouterLink :to="{ name: 'ForgotPassword' }">
          <span class="text-primary text-xs underline">Forgot Password?</span>
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
import axios from 'axios'
import { Form, Field, ErrorMessage } from 'vee-validate' // Import VeeValidation Library for input validation
import * as yup from 'yup' // Validation rule
import BaseButton from '@/components/core/BaseButton.vue'
const loading = ref(false)
const formValidation = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
})

const handleLogin = async (values) => {
  loading.value = true
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/register', {
      email: values.email,
      password: values.password,
    })
    console.log(' Logined:', res.data)
  } catch (err) {
    console.error(err)
    alert('Login failed')
  } finally {
    loading.value = false
  }
}
</script>
