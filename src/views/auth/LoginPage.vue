<template>
  <div
    class="flex gap-10 items-center p-10 shadow-2xl rounded-lg bg-white max-w-3xl"
    :class="{ 'cursor-not-allowed': loading }"
  >
    <!-- Input box -->
    <div class="w-1/2">
      <div class="flex flex-col">
        <div class="mb-8">
          <div class="font-medium text-3xl mb-5 text-center">Log Into ITC SHOP</div>

          <!-- Form -->
          <form action="" class="flex flex-col gap-5 mt-5" @submit.prevent="handleLogin">
            <div>
              <input
                type="text"
                placeholder="Email or Phone Number"
                class="input input-ghost w-full border-b-2 border-gray-300 border-0 rounded-none focus:ring-2 focus:ring-primary focus:outline-none"
                v-model="email"
              />
              <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                class="input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full focus:ring-2 focus:ring-primary focus:outline-none"
                required
                v-model="password"
              />
              <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
            </div>

            <!-- Button -->
            <div class="flex justify-between items-center mt-10">
              <button
                class="btn btn-lg btn-primary text-white text-sm"
                :disabled="loading"
                @click="isLoading"
              >
                <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                <span>{{ loading ? '' : 'Login' }}</span>
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
import { ref, watch } from 'vue'
import axios from 'axios'
import { validateName, validateEmail, validatePassword } from '@/validation/fields'

// Form fields
const email = ref('')
const password = ref('')

// Loading + error state
const loading = ref(false)
const errors = ref({
  email: '',
  password: '',
})

// Real-time validation
watch(email, (value) => {
  errors.value.email = validateEmail(value)
})
watch(password, (value) => {
  errors.value.password = validatePassword(value)
})

const handleLogin = async () => {
  // Validate input
  errors.value.name = validateName(name.value)
  errors.value.email = validateEmail(email.value)
  errors.value.password = validatePassword(password.value)

  //  hasError(Gate for backend): blocks form from going to the API if any error still exists
  // Object.values = get all values in object and return in array(get only value not key)
  // some(): is js function check if at least one item in arrary is true.
  const hasError = Object.values(errors.value).some((err) => err)
  if (hasError) return

  loading.value = true
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value,
    })

    // login success
    // authStore.login(res.data.user, res.data.token)
    // router.push({ name: 'Home' })
  } catch (err) {
    // 💥 Handle backend error here
    if (err.response && err.response.status === 401) {
      errors.value.email = 'Invalid email or password'
    } else {
      alert('Something went wrong. Please try again.')
    }
  } finally {
    loading.value = false
  }
}
</script>
