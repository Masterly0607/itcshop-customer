<template>
  <section class="container-default">
    <div>
      <div class="my-10 text-xl text-primary">
        {{ productCategory }} /
        <span class="text-xl text-primary font-semibold">{{ productName }}</span>
      </div>

      <div v-if="product">
        <div class="flex gap-10">
          <!-- Image Section -->
          <div class="w-[70%]">
            <div class="flex gap-5 h-full">
              <!-- Thumbnails -->
              <div class="w-1/4 flex flex-col gap-2 h-full">
                <img
                  v-for="(thumb, index) in product.images"
                  :key="index"
                  :src="thumb"
                  class="flex-1 object-cover cursor-pointer border h-0 w-full"
                  :class="{ 'border-primary border-2': selectedImg === thumb }"
                  @click="selectedImg = thumb"
                />
              </div>

              <!-- Main Image -->
              <div class="w-3/4">
                <img :src="selectedImg" class="h-full w-full object-cover rounded" />
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="w-[30%]">
            <div class="font-bold">{{ productName }}</div>
            <div class="flex mt-2 items-center gap-3">
              <div class="rating rating-xs">
                <div
                  class="mask mask-star bg-primary"
                  v-for="i in 5"
                  :key="i"
                  :class="{ 'bg-primary': i <= productRating, 'bg-gray-300': i > productRating }"
                ></div>
              </div>
              <div class="text-xs">
                ({{ productRating }} Reviews) |
                <span :class="productStock > 0 ? 'text-green-600' : 'text-red-500'">
                  {{ productStock > 0 ? 'In Stock' : 'Out of Stock' }}
                </span>
              </div>
            </div>

            <div class="text-lg mt-3">
              ${{ productPrice }}
              <span v-if="product.oldPrice" class="line-through text-gray-400 text-sm ml-2">
                ${{ product.oldPrice }}
              </span>
            </div>

            <div class="text-xs text-gray-600 mt-3">
              {{ productDescription }}
            </div>

            <div class="divider"></div>

            <!-- Colors -->
            <div class="flex gap-5">
              <span>Colours: </span>
              <div class="flex gap-2 items-center">
                <input type="radio" name="color" class="radio radio-xs bg-red-600" checked />
                <input type="radio" name="color" class="radio radio-xs bg-blue-600" />
              </div>
            </div>

            <!-- Sizes -->
            <div class="flex gap-5 mt-3 items-center">
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

            <!-- Quantity and Buttons -->
            <div class="flex mt-5 gap-3">
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
              <div class="btn btn-primary px-10 text-white font-light">Buy Now</div>
              <button class="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>

            <!-- Delivery Info -->
            <div class="mt-8">
              <div class="flex items-center gap-3 border border-b-0 p-3 border-gray-300">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193
                          2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106
                          a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text">Free Delivery</div>
                  <div class="underline text-xs">
                    Enter your postal code for Delivery Availability
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3 border p-3 border-gray-300">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
                <div>
                  <div>Return Delivery</div>
                  <div class="underline text-xs">Free 30 Days Delivery Returns. Details</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <p>Loading product...</p>
      </div>
    </div>

    <!-- Related Items -->
    <div class="mt-15">
      <SectionHeader title="Related Items" />
      <div class="grid grid-cols-4 gap-4">
        <CardComponent
          v-for="product in productsStore.productsList"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/productsStore'
import CardComponent from '@/components/core/CardComponent.vue'
import SectionHeader from '@/components/core/SectionHeader.vue'

const route = useRoute()
const productsStore = useProductsStore()

const productId = parseInt(route.params.id)
const selectedSize = ref('M')
const quantity = ref(1)
const selectedImg = ref(null)

// Fetch product detail when component is mounted
onMounted(() => {
  productsStore.fetchProductDetail(productId)
})

const product = computed(() => productsStore.productDetail)
const productName = computed(() => product.value?.title ?? 'No name')
const productCategory = computed(() => product.value?.category?.name ?? '')
const productDescription = computed(() => product.value?.description ?? '')
const productStock = computed(() => product.value?.stock ?? 0)
const productRating = computed(() => product.value?.rating ?? 0)
const productPrice = computed(() => product.value?.price ?? 0)

watchEffect(() => {
  selectedImg.value = product.value?.images?.[0] ?? product.value?.img ?? ''
})

const increase = () => quantity.value++
const decrease = () => {
  if (quantity.value > 1) quantity.value--
}
</script>
