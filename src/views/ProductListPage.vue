<template>
  <section class="container-default">
    <!-- Page Title -->
    <div class="text-center my-10 font-bold text-2xl">SHOP</div>

    <!-- Category Title -->
    <div v-if="categoryTitle" class="text-xl font-bold mb-4 text-primary text-center">
      {{ categoryTitle }}
    </div>

    <!-- Search Input -->
    <label class="input w-full mb-10">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" required placeholder="Search" v-model="searchQuery" />
    </label>

    <!-- Category Filter Buttons -->
    <div class="flex flex-wrap justify-center gap-4 mb-6">
      <button
        class="btn"
        :class="{ 'bg-primary text-white': !route.query.category }"
        @click="setCategory(null)"
      >
        All
      </button>
      <button
        v-for="cat in categories"
        :key="cat.label"
        class="btn"
        :class="{ 'bg-primary text-white': isActiveCategory(cat.label) }"
        @click="setCategory(cat.label)"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- Render filtered products -->
    <CategoryPage />
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'
import { useCategoriesStore } from '@/stores/categoriesStore'
import CategoryPage from '@/views/CategoryPage.vue'

// Stores
const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const categories = computed(() => categoriesStore.categoriesList)

onMounted(async () => {
  await Promise.all([
    categoriesStore.fetchCategories(),
    productsStore.fetchProducts(),
  ])
})




// Sync search query from URL
const searchQuery = ref(route.query.search || '')

// Sync input with URL in real time
watch(searchQuery, (val) => {
  router.replace({
    name: 'Shop',
    query: { ...route.query, search: val || undefined },
  })
})

// Helper to update category filter in URL
const setCategory = (category) => {
  router.push({
    name: 'Shop',
    query: { ...route.query, category: category || undefined },
  })
}

// Active button state for category
const isActiveCategory = (label) => {
  return route.query.category?.toLowerCase() === label.toLowerCase()
}

// Title based on selected category
const categoryTitle = computed(() => {
  return route.query.category ? `${route.query.category} Products` : ''
})
</script>
