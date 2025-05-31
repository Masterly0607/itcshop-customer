<template>
  <div class="flex gap-3 items-center mb-4">
    <div class="bg-primary w-5 h-10 rounded"></div>
    <span class="text-primary text-xl" style="font-family: 'Bebas Neue', sans-serif">{{
      props.title
    }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
})
</script>
