<template>
  <section class="container-default mt-10">
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <CardComponent v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>

    <p v-else class="text-center text-gray-500 mt-10">No products found.</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'
import CardComponent from '@/components/core/CardComponent.vue'

const route = useRoute()
const productsStore = useProductsStore()

const category = computed(() => route.query.category || null)
const searchQuery = computed(() => route.query.search || '')

const categoryTitle = computed(() => {
  return category.value ? `${category.value} Products` : 'All Products'
})

const filteredProducts = computed(() => {
  const products = productsStore.productsList || []

  return products.filter((product) => {
    const productCategory = product.category?.name // ✅ extract name safely

    const matchesCategory =
      !category.value || productCategory?.toLowerCase() === category.value.toLowerCase()

    const matchesSearch =
      !searchQuery.value || product.title?.toLowerCase().includes(searchQuery.value.toLowerCase())

    return matchesCategory && matchesSearch
  })
})
</script>
