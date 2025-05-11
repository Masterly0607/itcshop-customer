<template>
    <div v-if="product">
      <h1>{{ product.name }}</h1>
      <img :src="product.img" alt="product image" style="max-width: 200px;" />
      <p>Category: {{ product.category }}</p>
      <p>Price: ${{ product.price }}</p>
      <p v-if="product.oldPrice">Old Price: ${{ product.oldPrice }}</p>
      <p>Rating: {{ product.rating }}/5</p>
    </div>
    <div v-else>
      <p>Product not found.</p>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import { useProductsStore } from '/src/stores/productsStore.js'
  
  const route = useRoute()
  const productsStore = useProductsStore()
  
  const productId = parseInt(route.params.id)
  const product = productsStore.productsList.find(p => p.id === productId)
  // find() is for finding one item. Ex: When you need to find one product by its ID.(Product detail)
  // filter() is for finding multiple items. Ex:  you might have multiple products in the same category,
  </script>
  