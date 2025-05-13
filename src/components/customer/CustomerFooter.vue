<template>
  <footer class="footer sm:footer-horizontal bg-base-200 text-base-content p-10 mt-10">
    <div class="flex flex-wrap justify-between w-full gap-10">
      <!-- Shop Info -->
      <div class="max-w-xs">
        <h6 class="footer-title text-xl">ITCSHOP</h6>
        <p class="text-sm text-gray-500">
          Your one-stop shop for the latest laptops, phones, gadgets & accessories. Reliable tech,
          fast shipping, and 24/7 support.
        </p>
      </div>

      <!-- Shop Categories -->
      <nav class="flex flex-col gap-2">
        <h6 class="footer-title">Categories</h6>

        <RouterLink
          v-for="cat in categoriesStore.categoriesList.slice(0, 4)"
          :key="cat"
          class="link link-hover"
          :to="{ name: 'Shop', query: { category: cat.label } }"
          :class="
            route.query.category === cat.label
              ? ' text-primary font-bold underline'
              : 'link link-hover'
          "
        >
          {{ cat.label }}
        </RouterLink>
      </nav>

      <!-- Quick Links -->
      <nav class="flex flex-col gap-2">
        <h6 class="footer-title">Quick Links</h6>
        <RouterLink :to="{ name: 'Shop' }" active-class="text-primary font-bold underline"
          >Shop</RouterLink
        >
        <RouterLink :to="{ name: 'AboutUs' }" active-class="text-primary font-bold underline"
          >About Us</RouterLink
        >
        <RouterLink :to="{ name: 'ContactUs' }" active-class="text-primary font-bold underline"
          >Contact</RouterLink
        >
      </nav>

      <!-- Support & Legal -->
      <nav class="flex flex-col gap-2">
        <h6 class="footer-title">Support</h6>
        <a class="link link-hover">Shipping Policy</a>
        <a class="link link-hover">Return Policy</a>
        <a class="link link-hover">Terms & Conditions</a>
        <a class="link link-hover">Privacy Policy</a>
      </nav>

      <!-- Newsletter -->
      <form class="flex flex-col">
        <h6 class="footer-title">Subscribe to our Newsletter</h6>
        <fieldset class="w-80 max-w-full">
          <label class="label-text text-sm mb-2">Get the latest tech </label>
        </fieldset>
      </form>
    </div>
  </footer>
</template>

<script setup>
import { useCategoriesStore } from '@/stores/categoriesStore'
import { useRoute } from 'vue-router'
const route = useRoute()
const categoriesStore = useCategoriesStore()
</script>
