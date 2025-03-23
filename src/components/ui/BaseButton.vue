<template>
    <button
      class="px-4 py-2 rounded-md font-medium text-white bg-primary hover:bg-primary-dark transition disabled:opacity-50"
      :type="type"
      :disabled="disabled"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </template>
  
  <script setup>
  defineProps({
    type: { type: String, default: 'button' },
    disabled: { type: Boolean, default: false }
  })
  </script>
  
  <style scoped>
  .bg-primary {
    background-color: #2563eb; /* Tailwind Blue-600 */
  }
  .bg-primary-dark {
    background-color: #1e40af; /* Tailwind Blue-800 */
  }
  </style>
  