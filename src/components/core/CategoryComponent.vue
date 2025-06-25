<template>
  <button
    class="btn btn-outline hover:bg-primary p-10 rounded-none w-full h-full"
    @click="selectCategory"
  >
    <div class="flex flex-col items-center text-gray-600 gap-4">
      <!-- Dynamically render the icon component -->
     <font-awesome-icon
  :icon="['fas', category.icon || 'box']"
  class="text-2xl"
/>

      <span>{{ category.label }}</span>
    </div>
  </button>
</template>

<script setup>
// Props
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})

// Emits
const emit = defineEmits(['select'])
const selectCategory = () => {
  emit('select', props.category.label)
}
</script>
