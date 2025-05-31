<template>
  <div class="flex gap-10 items-center p-10 shadow-2xl rounded-lg bg-white max-w-4xl">
    <!-- Image -->
    <div class="w-1/2">
      <img src="/img/signup.jpg" alt="signup" class="w-full h-full object-cover" />
    </div>

    <!-- Form -->
    <div class="w-1/2">
      <div class="flex flex-col">
        <div class="mb-8">
          <div class="font-medium text-3xl mb-5 text-center">Create an account</div>
          <div class="text-sm text-center">Enter your details below</div>

          <!-- Form Inputs -->
          <form action="" class="flex flex-col gap-5 mt-5">
            <div>
              <input
                v-model="name"
                type="text"
                placeholder="Name"
                class="input input-ghost w-full border-b-2 border-gray-300 border-0 rounded-none focus:ring-2 focus:ring-primary focus:outline-none"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
              />
              <p class="text-red-500 text-sm mt-1" v-if="errors.name">{{ errors.name }}</p>
            </div>

            <div>
              <input
                v-model="email"
                type="email"
                placeholder="Email or Phone Number"
                class="focus:ring-2 focus:ring-primary focus:outline-none input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full"
              />
              <p class="text-red-500 text-sm mt-1" v-if="errors.email">{{ errors.email }}</p>
            </div>

            <div>
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="focus:ring-2 focus:ring-primary focus:outline-none input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full"
              />
              <p class="text-red-500 text-sm mt-1" v-if="errors.password">{{ errors.password }}</p>
            </div>

            <div>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                class="focus:ring-2 focus:ring-primary focus:outline-none input input-ghost border-b-2 border-gray-300 border-0 rounded-none w-full"
              />
              <p class="text-red-500 text-sm mt-1" v-if="errors.confirmPassword">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </form>

          <!-- Buttons -->
          <div class="flex flex-col gap-5 mt-10">
            <button
              class="btn btn-block btn-primary text-white py-6 text-lg font-light"
              :disabled="loading"
              @click="handleSignUp"
            >
              <span
                class="loading loading-spinner loading-xs disabled:bg-gray-400"
                v-if="loading"
              ></span>
              <span>{{ loading ? '' : 'Create Account' }}</span>
            </button>
            <div class="btn bg-white text-black border-[#e5e5e5] btn-block p-6 text-lg font-light">
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
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              <span class="pl-1"> Sign up with Google </span>
            </div>
          </div>

          <!-- Footer -->
          <div class="text-center mt-8">
            <span class="text-gray-500 pr-2">Already have account?</span>
            <RouterLink :to="{ name: 'Login' }">
              <span class="underline">Log in</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { ref, watch } from 'vue'
import axios from 'axios'
import { validateName, validateEmail, validatePassword } from '@/validation/fields'

// Form fields
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// const router = useRouter()
// const authStore = useAuthStore()

// Loading + error state
const loading = ref(false)
const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Real-time validation
watch(name, (value) => {
  errors.value.name = validateName(value)
})

watch(email, (value) => {
  errors.value.email = validateEmail(value)
})

watch(password, (value) => {
  errors.value.password = validatePassword(value)

  // Update confirm password error too if it's already filled
  if (confirmPassword.value && confirmPassword.value !== value) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }
})

watch(confirmPassword, (value) => {
  if (!value) {
    errors.value.confirmPassword = 'Confirm Password is required'
  } else if (value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }
})

const handleSignUp = async () => {
  // Validate input
  errors.value.name = validateName(name.value)
  errors.value.email = validateEmail(email.value)
  errors.value.password = validatePassword(password.value)

  if (!confirmPassword.value) {
    errors.value.confirmPassword = 'Confirm Password is required'
  } else if (confirmPassword.value !== password.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }

  //  hasError(Gate for backend): blocks form from going to the API if any error still exists
  // Object.values = get all values in object and return in array(get only value not key)
  // some(): is js function check if at least one item in arrary is true.
  const hasError = Object.values(errors.value).some((err) => err)
  if (hasError) return

  loading.value = true
  try {
    const res = await axios.post('http://127.0.0.1:8000/api/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    console.log('User created:', res.data)
    // Save user + token in store + localStorage
    // authStore.login(res.data.user, res.data.token)

    // Redirect to Home page
    // router.push({ name: 'Home' })
  } catch (err) {
    console.error(err)
    alert('Registration failed. Try again.')
  } finally {
    //  finally: always runs, no matter what (success or fail)
    loading.value = false
  }
}
</script>
