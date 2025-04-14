<template>
  <CustomerNavBar></CustomerNavBar>
  <Transition class="animate__animated animate__backInLeft">
    <router-view />
  </Transition>
  <CustomerFooter></CustomerFooter>
</template>

<script setup>
import CustomerFooter from '@/components/customer/CustomerFooter.vue'
import CustomerNavBar from '@/components/customer/CustomerNavBar.vue'
</script>
