<template>
  <section class="container-default">
    <!-- Breadcrumb -->
 <div class="my-10 text-xl text-primary">
 {{ route.query.category || productCategory }}
 /
  <span class="font-semibold">{{ String(route.query.name ?? productName) }}</span>
</div>

    <!-- Product Detail -->
    <div v-if="product" class="flex flex-col lg:flex-row gap-10">
      <!-- Images -->
      <div class="w-full lg:w-[70%]">
        <div class="flex gap-5 h-full">
          <!-- Thumbnails -->
          <div class="w-1/4 flex flex-col gap-2">
            <img
              v-for="(thumb, index) in product.images"
              :key="index"
              :src="thumb"
class="w-[80px] h-[80px] object-cover cursor-pointer border"
              :class="{ 'border-primary border-2': selectedImg === thumb }"
              @click="selectedImg = thumb"
            />
          </div>

          <!-- Main Image -->
          <div class="w-5/4">
           <img
  :src="selectedImg"
  class="w-full max-h-[500px] object-cover rounded mx-auto"
/>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="w-full lg:w-[30%]">
        <h1 class="font-bold text-xl">{{ productName }}</h1>

        <!-- Rating & Stock -->
        <div class="flex items-center gap-3 mt-2">
          <div class="rating rating-xs">
            <div
              v-for="i in 5"
              :key="i"
              class="mask mask-star"
              :class="i <= productRating ? 'bg-primary' : 'bg-gray-300'"
            ></div>
          </div>
          <div class="text-xs">
            ({{ productRating }} Reviews) |
            <span :class="productStock > 0 ? 'text-green-600' : 'text-red-500'">
              {{ productStock > 0 ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>

        <!-- Price -->
        <div class="text-lg mt-3 font-semibold">
          ${{ totalPrice.toLocaleString() }}
        </div>

        <!-- Description -->
        <div class="text-xs text-gray-600 mt-3">
          {{ productDescription }}
        </div>

        <div class="divider"></div>

        <!-- Size Selection -->
        <div class="flex gap-5 items-center">
          <span>Size: </span>
          <div class="flex gap-2">
            <div
              v-for="size in ['XS', 'S', 'M', 'L', 'XL']"
              :key="size"
              @click="selectedSize = size"
              :class="[
                'cursor-pointer text-sm rounded-sm px-3 py-1 border',
                selectedSize === size
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-300',
              ]"
            >
              {{ size }}
            </div>
          </div>
        </div>

        <!-- Quantity + Buttons -->
        <div class="flex mt-5 gap-3 items-center">
          <div class="flex items-center border rounded overflow-hidden w-32 border-gray-300">
            <div @click="decrease" class="w-1/3 h-10 text-xl border-r btn rounded-none">
              &minus;
            </div>
            <div class="w-1/3 h-10 flex items-center justify-center text-xl">
              {{ quantity }}
            </div>
            <div
              @click="increase"
              class="w-1/3 h-10 btn btn-primary text-white text-xl rounded-none"
            >
              +
            </div>
          </div>
          <button class="btn btn-primary px-10 text-white font-light">Buy Now</button>
          <button class="btn btn-square">❤️</button>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading product...</p>
    </div>


 
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'


const route = useRoute()
const productsStore = useProductsStore()

const productId = parseInt(route.params.id)
const selectedSize = ref('M')
const quantity = ref(1)
const selectedImg = ref(null)

onMounted(() => {
  productsStore.fetchProductDetail(productId)
})

const product = computed(() => productsStore.productDetail)

const productName = computed(() => product.value?.title ?? 'No name')
const productCategory = computed(() => product.value?.category?.name ?? '')
const productDescription = computed(() => product.value?.description ?? '')
const productStock = computed(() => product.value?.stock ?? 0)
const productRating = computed(() => product.value?.rating ?? 4) // default 4
const productPrice = computed(() => parseFloat(product.value?.price) || 0)



const totalPrice = computed(() => productPrice.value * quantity.value)

watchEffect(() => {
  selectedImg.value = product.value?.images?.[0] ?? ''
})

const increase = () => quantity.value++
const decrease = () => {
  if (quantity.value > 1) quantity.value--
}

// Related products based on same category
const relatedProducts = computed(() =>
  productsStore.productsList.filter(
    (p) => p.category?.id === product.value?.category?.id && p.id !== product.value?.id
  )
)
</script>
