<template>
  <section class="rounded-lg shadow-lg p-10 bg-white flex flex-col items-center">
    <div class="font-bold text-3xl text-center">
      {{ isForgotMode ? 'Verify Reset Code' : 'Verify Your Email' }}
    </div>
    <div class="text-center mb-10 text-xs mt-3 text-gray-400">
      {{
        isForgotMode
          ? 'Enter the 6-digit code to reset your password.'
          : 'Enter the 6-digit code we sent to your email.'
      }}
    </div>

    <!-- OTP Form -->
    <form class="max-w-sm mx-auto flex flex-col items-center" @submit.prevent="handleVerify">
      <div class="flex mb-4 space-x-2">
        <input
          v-for="(code, index) in codes"
          :key="index"
          v-model.trim="codes[index]"
          :ref="(el) => (otpInputs[index] = el)"
          type="text"
          inputmode="numeric"
          maxlength="1"
          class="w-12 h-12 text-center font-bold text-lg border border-gray-300 rounded"
          @keyup="handleKeyup(index)"
          @paste="handlePaste"
          required
        />
      </div>

      <BaseButton type="submit" label="Verify" :loading="loading" />
    </form>

    <div class="text-center text-xs mt-3">
      Didn't receive code?
      <span
        class="ml-1 text-primary underline"
        :class="resendDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
        @click="handleResend"
      >
        Resend<span v-if="resendDisabled"> ({{ authStore.resendCooldown }}s)</span>
      </span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import BaseButton from '@/components/core/BaseButton.vue'
import { toast } from 'vue3-toastify'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const codes = ref(['', '', '', '', '', ''])
const otpInputs = ref([])
const loading = ref(false)

const mode = computed(() => route.query.mode || 'register')
const isForgotMode = computed(() => mode.value === 'forgot')
const resendDisabled = computed(() => authStore.resendCooldown > 0)

function handleKeyup(index) {
  const val = codes.value[index]
  if (val.length === 1 && index < codes.value.length - 1) {
    otpInputs.value[index + 1]?.focus()
  } else if (!val && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

function handlePaste(e) {
  e.preventDefault()
  const pasted = (e.clipboardData || window.clipboardData).getData('text')
  const digits = pasted.replace(/\D/g, '').split('')
  digits.forEach((digit, i) => {
    if (i < codes.value.length) codes.value[i] = digit
  })
  const next = Math.min(digits.length, codes.value.length - 1)
  otpInputs.value[next]?.focus()
}

async function handleVerify() {
  const otp = codes.value.join('')
  if (otp.length !== 6) return toast.error('Please enter all 6 digits')

  loading.value = true
  try {
    if (isForgotMode.value) {
      await authStore.verifyForgotOtp({ otp })
      localStorage.setItem('resetOtp', otp)
      toast.success('OTP verified')
      router.push({ name: 'ResetPassword' })
    } else {
      await authStore.verifyOtp({ otp })
      toast.success('Email verified')
      router.push({ name: 'Home' })
    }
  } catch (err) {
    toast.error('Invalid or expired OTP')
    codes.value = ['', '', '', '', '', '']
    otpInputs.value[0]?.focus()
  } finally {
    loading.value = false
  }
}

async function handleResend() {
  if (resendDisabled.value) return
  try {
    if (isForgotMode.value) {
      await authStore.sendForgotOtp(authStore.pendingEmail)
    } else {
      await authStore.resendOtp({ email: authStore.pendingEmail })
    }
  } catch (err) {
    toast.error('Resend failed')
  }
}
</script>
