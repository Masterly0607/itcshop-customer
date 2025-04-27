<template>
  <div>
    <!-- Slider(Swiper) Component -->
    <section class="container-default mt-2">
      <swiper
        :modules="[EffectFade, Pagination, Autoplay]"
        effect="fade"
        :grabCursor="true"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        class="z-0 w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] relative"
      >
        <swiper-slide v-for="photo in photos" :key="photo" class="relative w-full h-full">
          <img :src="`/img/${photo}`" alt="Slide image" class="w-full h-full object-cover" />
          <div class="absolute bottom-[40%] left-6 sm:left-10">
            <button
              class="text-xs sm:text-sm md:text-base bg-white text-black px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-primary transition"
              @click="goToShop"
            >
              Shop Now →
            </button>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <!-- Flash Sale -->
    <section class="container-default mt-20">
      <!-- Header -->
      <SectionHeader title="Today's" />

      <div class="flex flex-wrap justify-between items-center gap-5">
        <div class="flex flex-wrap items-center gap-15">
          <span class="text-2xl md:text-3xl lg:text-4xl font-semibold">Flash Sales</span>

          <!-- Countdown -->
          <div class="grid grid-flow-col auto-cols-max gap-3 sm:gap-5 text-center">
            <div class="flex flex-col items-center">
              <span class="text-xs sm:text-sm">Days</span>
              <span class="countdown font-mono text-xl sm:text-2xl md:text-3xl font-bold">
                <span :style="`--value:${pad(days)}`">{{ pad(days) }}</span>
              </span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-xs sm:text-sm">Hours</span>
              <span class="countdown font-mono text-xl sm:text-2xl md:text-3xl font-bold">
                <span :style="`--value:${pad(hours)}`">{{ pad(hours) }}</span>
              </span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-xs sm:text-sm">Minutes</span>
              <span class="countdown font-mono text-xl sm:text-2xl md:text-3xl font-bold">
                <span :style="`--value:${pad(minutes)}`">{{ pad(minutes) }}</span>
              </span>
            </div>
            <div class="flex flex-col items-center">
              <span class="text-xs sm:text-sm">Seconds</span>
              <span class="countdown font-mono text-xl sm:text-2xl md:text-3xl font-bold">
                <span :style="`--value:${pad(seconds)}`">{{ pad(seconds) }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Arrows -->
        <div class="flex gap-2">
          <button
            class="btn btn-circle btn-md"
            @click="goPrev"
            :disabled="isBeginning"
            :class="
              isBeginning
                ? 'bg-gray-300 text-white cursor-not-allowed'
                : 'hover:bg-primary text-black'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            class="btn btn-circle btn-md"
            @click="goNext"
            :disabled="isEnd"
            :class="
              isEnd ? 'bg-gray-300 text-white cursor-not-allowed' : 'hover:bg-primary text-black'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Swiper Card -->
      <div class="mt-10">
        <Swiper
          :modules="[Pagination, Navigation]"
          :space-between="20"
          @swiper="onSwiperInit"
          @slideChange="onSlideChange"
          :breakpoints="{
            320: { slidesPerView: 1.2 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4.5 },
            1280: { slidesPerView: 4.7 },
          }"
          class="w-full"
        >
          <SwiperSlide v-for="(item, index) in card" :key="index">
            <CardComponent
              :img="item.img"
              :title="item.title"
              :price="item.price"
              :oldPrice="item.oldPrice"
              :rating="item.rating"
              :id="item.id"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- View All -->
      <div class="mt-10 text-center">
        <button class="btn btn-primary text-white btn-wide" @click="goToShop">
          View All Products
        </button>
      </div>

      <div class="divider mt-10"></div>
    </section>

    <!-- Browse by Category-->
    <section class="container-default mt-20">
      <SectionHeader title="Categories" />

      <div class="flex justify-between">
        <span class="text-2xl md:text-3xl lg:text-4xl font-semibold">Browse By Category</span>
        <div class="flex gap-2">
          <button
            class="btn btn-circle btn-md"
            @click="goCategoryPrev"
            :disabled="isCatBeginning"
            :class="
              isCatBeginning
                ? 'bg-gray-300 text-white cursor-not-allowed'
                : 'hover:bg-primary text-black'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            class="btn btn-circle btn-md"
            @click="goCategoryNext"
            :disabled="isCatEnd"
            :class="
              isCatEnd ? 'bg-gray-300 text-white cursor-not-allowed' : 'hover:bg-primary text-black'
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        :space-between="20"
        :pagination="{ clickable: true }"
        :breakpoints="{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }"
        @swiper="onCategorySwiperInit"
        @slideChange="onCategorySlideChange"
        class="mt-10"
      >
        <SwiperSlide v-for="(cat, index) in categories" :key="index">
          <button class="btn btn-outline hover:bg-primary p-10 rounded-none w-full h-full">
            <div class="flex flex-col items-center text-gray-600 gap-4">
              <div v-html="cat.icon" class=""></div>

              <span>{{ cat.label }}</span>
            </div>
          </button>
        </SwiperSlide>
      </Swiper>
      <div class="divider mt-15f"></div>
    </section>

    <!-- Best Selling Products -->
    <section class="container-default mt-20">
      <SectionHeader title="This Month" />

      <div class="flex justify-between items-center">
        <span class="text-2xl md:text-3xl lg:text-4xl font-semibold">Best Selling Products</span>
        <button class="btn btn-primary text-white px-7">View All</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        <CardComponent v-for="(item, index) in bestSellingProducts" :key="index" />
      </div>

      <div class="divider mt-15"></div>
    </section>

    <!-- New Arrival -->
    <section class="container-default mt-20">
      <SectionHeader title="Featured" />
      <span class="text-2xl md:text-3xl lg:text-4xl font-semibold">New Arrival</span>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px] mt-10">
        <!-- Left box -->
        <div class="bg-red-200 relative">
          <img
            src="/img/keyboard.png"
            alt="Play Station"
            srcset=""
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute bottom-5 left-10 text-white">
            <div class="text-xl font-bold">Lorem, ipsum dolor.</div>
            <div class="text-">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam!
            </div>

            <div>
              <RouterLink :to="{ name: 'Shop' }">
                <span class="underline"> Shop Now </span>
              </RouterLink>
            </div>
          </div>
        </div>
        <!-- Right box -->
        <div>
          <!-- Top box -->
          <div class="grid grid-row-2 gap-4">
            <div class="bg-red-200 h-[250px] relative">
              <img
                src="/img/1.avif"
                alt="Play Station"
                srcset=""
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute bottom-5 left-10 text-white">
                <div class="text-xl font-bold">Lorem, ipsum dolor.</div>
                <div class="text-">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam!
                </div>

                <div>
                  <RouterLink :to="{ name: 'Shop' }">
                    <span class="underline"> Shop Now </span>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 h-[250px]">
              <div class="bg-green-200 relative">
                <img
                  src="/img/2.avif"
                  alt="Play Station"
                  srcset=""
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute bottom-5 left-10 text-white">
                  <div class="text-xl font-bold">Lorem, ipsum dolor.</div>
                  <div class="text-">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam!
                  </div>

                  <div>
                    <RouterLink :to="{ name: 'Shop' }">
                      <span class="underline"> Shop Now </span>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="bg-green-200 relative">
                <img
                  src="/img/3.avif"
                  alt="Play Station"
                  srcset=""
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute bottom-5 left-10 text-white">
                  <div class="text-xl font-bold">Lorem, ipsum dolor.</div>
                  <div class="text-">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam!
                  </div>

                  <div>
                    <RouterLink :to="{ name: 'Shop' }">
                      <span class="underline"> Shop Now </span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Explore Our Products -->
    <section class="container-default mt-20">
      <SectionHeader title="Our Products" />
      <span class="text-2xl md:text-3xl lg:text-4xl font-semibold">Explore Our Products</span>

      <!-- All products -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        <CardComponent
          v-for="(product, index) in products"
          :key="index"
          :img="product.img"
          :title="product.title"
          :price="product.price"
          :oldPrice="product.oldPrice"
          :rating="product.rating"
          :id="product.id"
        />
      </div>

      <div class="text-center mt-10">
       <BaseButton title="View All Products" class="btn-primary"/>
      </div>

      <div class="grid sm:grid-cols-3 gap-8 text-center py-8 px-4 mt-10">
    <div
      v-for="(item, index) in features"
      :key="index"
      class="flex flex-col items-center gap-2"
    >
      <div class="bg-black text-white rounded-full p-4 border-4 border-gray-300">
        <component :is="item.icon" class="w-6 h-6" />
      </div>
      <h3 class="font-bold text-lg">{{ item.title }}</h3>
      <p class="text-sm text-gray-600">{{ item.description }}</p>
    </div>
  </div>
  <div class="flex justify-end my-5">
    <button class="btn btn-circle" @click="scrollToTop" >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z" clip-rule="evenodd" />
</svg>

    </button>
  </div>
    </section>
  </div>
</template>
<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // for smooth scrolling
  })
}
import {
  TruckIcon,
  LifebuoyIcon, // ✅ used as replacement for HeadsetIcon
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

const features = [
  {
    title: 'FREE AND FAST DELIVERY',
    description: 'Free delivery for all orders over $140',
    icon: TruckIcon
  },
  {
    title: '24/7 CUSTOMER SERVICE',
    description: 'Friendly 24/7 customer support',
    icon: LifebuoyIcon // ✅ looks like support/help
  },
  {
    title: 'MONEY BACK GUARANTEE',
    description: 'We return money within 30 days',
    icon: ShieldCheckIcon
  }
]

import BaseButton from './components/common/BaseButton.vue'
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import CardComponent from './components/CardComponent.vue'
import { useRouter } from 'vue-router'
import SectionHeader from './components/SectionHeader.vue'

// Router
const route = useRouter()
const goToShop = () => route.push({ name: 'Shop' })

// Flash Sale Swiper
const swiperInstance = ref(null)
const isBeginning = ref(true)
const isEnd = ref(false)
const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
  updateArrowState(swiper)
}
const onSlideChange = () => {
  if (swiperInstance.value) updateArrowState(swiperInstance.value)
}
const updateArrowState = (swiper) => {
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}
const goNext = () => {
  swiperInstance.value?.slideNext()
  updateArrowState(swiperInstance.value)
}
const goPrev = () => {
  swiperInstance.value?.slidePrev()
  updateArrowState(swiperInstance.value)
}

// Category Swiper
const categorySwiper = ref(null)
const isCatBeginning = ref(true)
const isCatEnd = ref(false)
const onCategorySwiperInit = (swiper) => {
  categorySwiper.value = swiper
  updateCategoryArrowState(swiper)
}
const onCategorySlideChange = () => {
  if (categorySwiper.value) updateCategoryArrowState(categorySwiper.value)
}
const updateCategoryArrowState = (swiper) => {
  isCatBeginning.value = swiper.isBeginning
  isCatEnd.value = swiper.isEnd
}
const goCategoryNext = () => {
  categorySwiper.value?.slideNext()
  updateCategoryArrowState(categorySwiper.value)
}
const goCategoryPrev = () => {
  categorySwiper.value?.slidePrev()
  updateCategoryArrowState(categorySwiper.value)
}

// Data
const photos = ['1.avif', '2.avif', '3.avif', '4.avif']
const categories = [
  {
    label: 'Phones',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 ..."/>
      </svg>
    `,
  },
  {
    label: 'Laptops',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 5.25h16.5v11.25H3.75zM3 17.25h18v1.5H3z" />
      </svg>
    `,
  },
  {
    label: 'Smartwatches',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 6.75V3m0 18v-3.75m-4.5-9h9a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 .75-.75z" />
      </svg>
    `,
  },
  {
    label: 'Tablets',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M5.25 3.75h13.5a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V5.25a1.5 1.5 0 0 1 1.5-1.5z" />
      </svg>
    `,
  },
  {
    label: 'Accessories',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.75 6.75l4.5 10.5m0-10.5l-4.5 10.5M12 2.25v1.5m0 16.5v1.5M21.75 12h-1.5m-16.5 0h-1.5" />
      </svg>
    `,
  },
  {
    label: 'Cameras',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 5.25h2.25l.75-1.5h10.5l.75 1.5h2.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75v-12a.75.75 0 0 1 .75-.75zm8.25 3.75a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5z" />
      </svg>
    `,
  },
  {
    label: 'TVs',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 5.25h16.5v11.25H3.75V5.25zM3 17.25h18v1.5H3zM8.25 21h7.5" />
      </svg>
    `,
  },
  {
    label: 'Gaming',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M17.25 6.75h-10.5a3.75 3.75 0 0 0 0 7.5h10.5a3.75 3.75 0 0 0 0-7.5zM7.5 12h.008v.008H7.5V12zm0-3h.008v.008H7.5V9zm9 0h.008v.008H16.5V9zm0 3h.008v.008H16.5V12z" />
      </svg>
    `,
  },
  {
    label: 'Speakers',
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.75 9.75v4.5m0 0L4.5 12m2.25 2.25l2.25-2.25M15 9.75v4.5m0 0L17.25 12m-2.25 2.25L12.75 12" />
      </svg>
    `,
  },
]

const card = Array(6).fill({
  img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
  title: 'Card Title',
  price: 120,
  oldPrice: 160,
  rating: 4,
  id: 1,
})
const bestSellingProducts = [
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 2,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 3,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 4,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 5,
  },
]

const products = [
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 1,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 2,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 3,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 4,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 1,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 2,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 3,
  },
  {
    img: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Card Title',
    price: 120,
    oldPrice: 160,
    rating: 4,
    id: 4,
  },
]
// Countdown
const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 15)
const days = ref(0),
  hours = ref(0),
  minutes = ref(0),
  seconds = ref(0)
const pad = (num) => (num < 10 ? `0${num}` : num > 99 ? 99 : num)
const updateCountdown = () => {
  const now = new Date()
  const diff = targetDate - now
  if (diff <= 0) return
  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff / (1000 * 60 * 60)) % 24)
  minutes.value = Math.floor((diff / (1000 * 60)) % 60)
  seconds.value = Math.floor((diff / 1000) % 60)
}
onMounted(() => {
  updateCountdown()
  setInterval(updateCountdown, 1000)
})
</script>

<style>
.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background-color: #fff;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: yellow;
}
.card {
  width: 100%;
  height: 100%;
}
</style>
