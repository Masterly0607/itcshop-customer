<template>
  <button
    class="btn btn-block btn-primary text-white py-6 text-lg font-light mt-2"
    @click="onClick"
  >
    <span class="flex-1">{{ loading ? loadingText : label }}</span>
    <span class="loading loading-spinner loading-xs" v-if="loading"></span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Submit',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: 'Processing...',
  },
})

const emit = defineEmits(['click'])

const onClick = (e) => {
  emit('click', e)
}
</script>
