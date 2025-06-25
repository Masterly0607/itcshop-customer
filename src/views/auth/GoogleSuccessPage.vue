<script setup>
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue3-toastify'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

onMounted(async () => {
  const token = route.query.token

  if (token) {
    try {
      sessionStorage.setItem('TOKEN', token)
      await authStore.loginWithGoogle(token)
      router.replace({ name: 'AccountDashboard' })
    } catch (error) {
      toast.error('Google login failed')
      router.replace({ name: 'Login' })
    }
  } else {
    router.replace({ name: 'Login' })
  }
})

</script>

<template>
  <div class="flex items-center justify-center min-h-screen text-xl font-bold">
    Redirecting...
  </div>
</template>
