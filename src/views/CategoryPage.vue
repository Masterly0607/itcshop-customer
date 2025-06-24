<template>
  <section class="container-default mt-10">
    <!-- Category Title -->
    <h2 v-if="categoryTitle" class="text-xl font-semibold mb-4 text-primary text-center">
      {{ categoryTitle }}
    </h2>

    <!-- Products Grid -->
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <CardComponent
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- No Products Found -->
    <p v-else class="text-center text-gray-500 mt-10">
      No products found.
    </p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'
import CardComponent from '@/components/core/CardComponent.vue'

const route = useRoute()
const productsStore = useProductsStore()

// 🧠 Read from route
const category = computed(() => route.query.category || '')
const searchQuery = computed(() => route.query.search || '')

// 🏷️ Title based on selected category
const categoryTitle = computed(() => {
  return category.value ? `${category.value} Products` : 'All Products'
})

// 🧹 Filtered product list
const filteredProducts = computed(() => {
  const products = productsStore.productsList || []
  const queryCategory = category.value.toLowerCase()
  const querySearch = searchQuery.value.toLowerCase()

  return products.filter((product) => {
    const title = product.title?.toLowerCase() || ''
    const categoryName = product.category?.name?.toLowerCase() || ''

    const matchCategory = !queryCategory || categoryName === queryCategory
    const matchSearch = !querySearch || title.includes(querySearch)

    return matchCategory && matchSearch
  })
})
</script>
