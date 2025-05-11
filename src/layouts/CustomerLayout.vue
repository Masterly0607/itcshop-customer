<template>
  <!-- min-h-screen = Make the container at least as tall as the screen (100% height) -->
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <CustomerNavBar />

    <!-- Main content -->
    <main class="flex-1 container-default mt-10">
      <Transition class="animate__animated animate__backInLeft">
        <router-view />
      </Transition>
    </main>

    <!-- Footer -->
    <CustomerFooter />
  </div>
</template>

<script setup>
import CustomerFooter from '@/components/customer/CustomerFooter.vue'
import CustomerNavBar from '@/components/customer/CustomerNavBar.vue'
</script>
