<template>
  <button
    class="btn btn-outline hover:bg-primary p-10 rounded-none w-full h-full"
    @click="selectCategory"
  >
    <div class="flex flex-col items-center text-gray-600 gap-4">
      <div v-html="category.icon"></div>
      <span>{{ category.label }}</span>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])

const selectCategory = () => {
  emit('select', props.category.label)
}
</script>
