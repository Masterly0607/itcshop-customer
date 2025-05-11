<template>
    <section class="flex items-center justify-center h-screen bg-gray-100">
      <div class="flex flex-col items-center rounded-lg shadow-lg  p-8 bg-white">
        <div class="font-bold text-4xl mb-4">Reset Password</div>
        <div class="text-sm text-gray-400">
          Enter your new password below
        </div>
  
        <!-- Input -->
        <fieldset class="fieldset mt-8 w-[400px]">
          <legend class="fieldset-legend">New Password</legend>
          <input type="password" class="input w-full input-lg" placeholder="Enter new password"/>
        </fieldset>
        <fieldset class="fieldset mt-8 w-[400px]">
          <legend class="fieldset-legend">Confirm Password</legend>
          <input type="password" class="input w-full input-lg" placeholder="Confirm Password"/>
        </fieldset>
        <button class="btn btn-lg w-full mt-6 btn-primary text-white text-light" :disabled="loading" @click="isLoading">
            <span class="loading loading-spinner loading-xs" v-if="loading"></span>
            <span>Reset Password</span>
        </button>
        <RouterLink :to="{name:'Login'}" class="mt-3">
          <span class=" text-sm text-light text-primary">Back to Login</span>
        </RouterLink>
      
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