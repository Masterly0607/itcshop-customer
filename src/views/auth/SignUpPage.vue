<template>
  <div class="flex gap-10 items-start p-10 shadow-2xl rounded-lg bg-white max-w-5xl min-h-[600px]">
    <!-- min-h-[600px] =  Take at least 600px height, and expand more if needed to fit all the content. -->
    <!-- Image -->
    <div class="w-1/2 h-full">
      <img src="/img/signup.jpg" alt="signup" class="w-full h-full" />
    </div>

    <!-- Form -->
    <div class="w-1/2 h-full flex flex-col">
      <div class="font-medium text-3xl mb-5 text-center">Create an account</div>
      <div class="text-sm text-center">Enter your details below</div>

      <!-- Form Inputs -->
      <Form
        action=""
        class="flex flex-col gap-5 my-8"
        :validation-schema="formValidation"
        @submit="handleSignUp"
      >
        <div>
          <Field
            type="text"
            placeholder="First Name"
            class="input input-ghost w-full border-b-2 border-gray-300 border-0 rounded-none focus:ring-2 focus:ring-primary focus:outline-none"
            minlength="3"
            maxlength="30"
            title="Only letters, numbers or dash"
            name="firstName"
          />
          <ErrorMessage class="text-red-500 text-xs block mt-1" name="firstName"> </ErrorMessage>
        </div>
        <div>
          <Field
            type="text"
            placeholder="Last Name"
            class="input input-ghost w-full border-b-2 border-gray-300 border-0 rounded-none focus:ring-2 focus:ring-primary focus:outline-none"
            minlength="3"
            maxlength="30"
            title="Only letters, numbers or dash"
            name="lastName"
          />
          <ErrorMessage class="text-red-500 text-xs block mt-1" name="lastName"> </ErrorMessage>
        </div>
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

        <div>
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            class="focus:ring-2 focus:ring-primary focus:outline-none input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full"
          />
          <ErrorMessage class="text-red-500 text-xs block mt-1" name="confirmPassword">
          </ErrorMessage>
        </div>
        <!-- Buttons -->
        <div class="flex flex-col gap-5 0">
          <BaseButton label="Create Account" :loading="loading" />

          <div
            class="btn bg-white text-black border-[#e5e5e5] btn-block p-6 text-lg font-light"
            @click="handleGoogleSignup"
          >
            <svg
              aria-label="Google logo"
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            <span class="pl-1"> Sign up with Google </span>
          </div>

          <!-- Footer -->
          <div class="text-center mt-8">
            <span class="text-gray-500 pr-2">Already have account?</span>
            <RouterLink :to="{ name: 'Login' }">
              <span class="underline">Log in</span>
            </RouterLink>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import BaseButton from '@/components/core/BaseButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter, useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const authStore = useAuthStore()

//  Validation schema
const formValidation = yup.object({
  firstName: yup.string().required('Name is required').min(3, 'Min 3 chars'),
  lastName: yup.string().required('Name is required').min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
})

//  Normal signup
const handleSignUp = async (values) => {
  loading.value = true
  try {
    await authStore.register({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
    })
    router.push({ name: 'VerifyEmail' })
  } catch (err) {
    toast.error(err?.response?.data?.message || 'Registration failed')
  } finally {
    loading.value = false
  }
}

//  Google signup redirect
const handleGoogleSignup = async () => {
  try {
    const { url } = await authStore.loginWithGoogleRedirect()
    if (!url) throw new Error('No URL returned from backend')
    window.location.href = url
  } catch (error) {
    console.error('Google signup redirect failed:', error)
    toast.error('Google signup failed')
  }
}

//  Google redirect with token (ex: /auth/google-success?token=xxxxx)
onMounted(() => {
  const token = route.query.token
  if (token) {
    authStore.loginWithGoogleToken(token)
  }
})
</script>
