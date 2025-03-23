<template>
    <transition name="fade">
      <div v-if="visible" class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    message: String,
    duration: { type: Number, default: 3000 }
  })
  
  const visible = ref(true)
  
  watch(() => props.message, () => {
    visible.value = true
    setTimeout(() => (visible.value = false), props.duration)
  })
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  