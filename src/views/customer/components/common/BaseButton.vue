<template>
    <button class="btn">{{props.title }}</button>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    
})
</script>