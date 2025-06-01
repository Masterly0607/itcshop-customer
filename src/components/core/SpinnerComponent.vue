<template>
  <div
    v-if="show"
    class="min-h-screen flex justify-center items-center fixed inset-0 bg-white/60 z-50"
  >
    <span :class="`loading ${type} loading-${size}`"></span>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
  },
  type: {
    type: String,
    default: 'loading-bars',
  },
})
</script>
