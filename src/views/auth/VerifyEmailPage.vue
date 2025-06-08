<template>
  <section class="rounded-lg shadow-lg p-10 bg-white flex flex-col items-center">
    <div class="font-bold text-3xl text-center">Verify Your Email</div>
    <div class="text-center mb-10 text-xs mt-3 text-gray-400">
      Enter the 6-digit code we sent to your email.
    </div>

    <!-- OTP Form -->
    <form class="max-w-sm mx-auto flex" @submit.prevent="handleVerify">
      <div class="flex mb-2 space-x-2 rtl:space-x-reverse">
        <div v-for="(code, index) in codes" :key="index">
          <input
            v-model="codes[index]"
            :ref="(el) => (otpInputs[index] = el)"
            :id="'code-' + (index + 1)"
            type="text"
            maxlength="1"
            @keyup="handleKeyup(index)"
            @paste="handlePaste"
            class="block w-13 h-13 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg"
            required
          />
        </div>
      </div>
    </form>

    <!--  Trigger Verification -->
    <BaseButton label="Verify" :loading="loading" @click="handleVerify" />

    <div class="text-center text-xs mt-3">
      Didn't receive code?
      <span class="ml-1 text-xs text-primary underline cursor-pointer">Resend</span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/core/BaseButton.vue'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'

// State
const loading = ref(false)
const codes = ref(['', '', '', '', '', ''])
const otpInputs = ref([]) // make sure it's a ref for reactivity
const router = useRouter()
const authStore = useAuthStore()

function handleKeyup(index) {
  const value = codes.value[index]
  if (value.length === 1 && index < codes.value.length - 1) {
    otpInputs.value[index + 1]?.focus()
  } else if (value.length === 0 && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

function handlePaste(event) {
  event.preventDefault()
  const pasted = (event.clipboardData || window.clipboardData).getData('text')
  const digits = pasted.replace(/\D/g, '').split('')

  digits.forEach((digit, i) => {
    if (i < codes.value.length) {
      codes.value[i] = digit
    }
  })

  const nextIndex = digits.length < codes.value.length ? digits.length : codes.value.length - 1
  otpInputs.value[nextIndex]?.focus()
}

async function handleVerify() {
  const otp = codes.value.join('')
  if (otp.length !== 6) {
    alert('Please enter all 6 digits')
    return
  }

  loading.value = true
  try {
    await authStore.verifyOtp({ otp })
    toast.success('OTP verified! 🎉')
    router.push('/')
  } catch (err) {
    toast.error('Invalid OTP. Please try again ❌')
  } finally {
    loading.value = false
  }
}
</script>
