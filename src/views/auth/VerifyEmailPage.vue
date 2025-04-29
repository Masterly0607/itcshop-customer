<template>
    <section class="flex items-center justify-center h-screen bg-gray-100">
      <div class="flex flex-col items-center rounded-lg shadow-lg  p-8 bg-white">
        <div class="font-bold text-4xl mb-4">Verify Your Email</div>
        <div class="text-sm text-gray-400">
          Enter the 6-digit code we sent to your email.
        </div>
  
        <!-- Input -->
       <div>Onboarding?</div>
        <button class="btn btn-xl w-full mt-6 btn-primary text-white text-light" :disabled="loading" @click="isLoading">
            <span class="loading loading-spinner loading-xs" v-if="loading"></span>
            <span>Verify</span>
        </button>
        <div  class="mt-3">
           <span class="mr-1 text-sm">Didn't receive code?</span>
        <RouterLink :to="{name:'Login'}">
          <span class=" text-sm text-light text-primary underline">Resend</span>
        </RouterLink>
        </div>
       
      
      </div>
    </section>
  </template>
  
  <script setup>
import { ref } from 'vue';



const loading = ref (false);
const isLoading = ( ) =>{
    loading.value =! loading.value;
}
</script>