<template>
  <section class="container-default">
    <div class="text-center my-10 font-bold text-xl">SHOP</div>
    <div class="text-xl font-bold mb-4 text-primary">
      {{ route.query.category }}
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

    <!-- Render Products -->
    <ProductsByCategoryPage />
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCategoriesStore } from '@/stores/categoriesStore'
import ProductsByCategoryPage from '../components/common/ProductsByCategoryPage.vue'

const route = useRoute()
const router = useRouter()

const categoriesStore = useCategoriesStore()
const categories = categoriesStore.categoriesList

const searchQuery = ref(route.query.search || '') // why we use '' because if route.query.search is false, it will go ''. If we don't have that it become undefined. searchQuery is in input. So, undefined can cause problems in the input box.

const setCategory = (category) => {
  router.push({ name: 'Shop', query: { ...route.query, category: category || undefined } })
  // Why we need undefined? Because if category is null, it will show "/shop?category=null". We don't want this. But, if category is underfined, Vue Router will remove ?category=null, just show /shop.

  // category || undefined = is the OR operation if the first value is false, it will return the second value. falue value or falsy value = 0, '', null, undefined

  //  ...route.query(spread operator) = copies everything after ? in the URL into a new object.

  // query:{} = is used to set or update the values after ? in the URL.
}

// Category active button: check if the value of query url equal to button selected.
const isActiveCategory = (label) => {
  return route.query.category?.toLowerCase() === label.toLowerCase()
  // category? =  If category is missing, it won’t throw an error — it just returns undefined. "If category exists, then convert it to lowercase."
}

// It syncs the search input with the URL in real time. Ex: if user type "hi" in the input, it show immediately in url.
watch(searchQuery, (val) => {
  router.replace({ name: 'Shop', query: { ...route.query, search: val || undefined } })
})
</script>
