<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-400 hover:text-gray-800">×</button>
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    show: { type: Boolean, required: true }
  })
  </script>
  