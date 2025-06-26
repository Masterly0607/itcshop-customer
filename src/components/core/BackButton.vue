<template>
  <button
    class="flex items-center gap-2 text-sm text-gray-700 hover:text-primary font-medium my-5"
    @click="goBack"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  label: {
    type: String,
    default: 'Back',
  },
})

const goBack = () => {
  router.push({ name: 'Home' })
}
</script>
