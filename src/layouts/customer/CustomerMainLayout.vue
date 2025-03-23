<template>
<CustomerNavBar></CustomerNavBar>
<RouterView></RouterView>
<CustomerFooter></CustomerFooter>
</template>

<script setup>
import CustomerFooter from '@/components/customer/CustomerFooter.vue';
import CustomerNavBar from '@/components/customer/CustomerNavBar.vue';


</script>