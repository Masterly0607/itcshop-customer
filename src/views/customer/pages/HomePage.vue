<template>
  <div>
    <!-- Slider Component -->
    <section>
      <swiper
        :modules="[EffectFade, Pagination, Autoplay]"
        effect="fade"
        :grabCursor="true"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        class="z-0 w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] relative"
      >
        <swiper-slide
          v-for="photo in sildePhotos"
          :key="photo"
          class="relative w-full h-full max-w-screen-xl"
        >
          <img :src="`/img/slide/${photo}`" alt="Slide image" class="w-full h-full object-cover" />
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
    <section
      class="container-default mt-20"
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="800"
    >
      <!--  data-aos-delay="200" =  wait 200 milliseconds before starting the animation. -->
      <SectionHeader title="Today's" />

      <div class="flex flex-wrap justify-between items-center gap-5">
        <div class="flex flex-wrap items-center gap-15">
          <span class="section-title">Flash Sales</span>

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
          <SwiperSlide v-for="product in products">
            <CardComponent :key="product.id" :product="product" />
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- View All -->
      <div class="mt-10 text-center">
        <div class="btn btn-primary text-white btn-wide" @click="goToShop">View All Products</div>
      </div>

      <div class="divider mt-10"></div>
    </section>

    <!-- Browse by Category-->
    <section
      class="container-default mt-20"
      data-aos="zoom-in-up"
      data-aos-delay="300"
      data-aos-duration="900"
    >
      <SectionHeader title="Categories" />

      <div class="flex justify-between">
        <span class="section-title">Browse By Category</span>
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
        <SwiperSlide v-for="(category, index) in categories" :key="index">
          <CategoryComponent :category="category" @click.prevent="goToCategory(category)" />
          <!-- prevent = stop page reload, form submits(@submit="submitForm" alway reload page by default, so we use prevent to stop reload page when submitting.), or link jump(href="#") = by default when click, it jumps to the top of the page. Preven help to stop jump just run the code inside it
       -->
        </SwiperSlide>
      </Swiper>
      <div class="divider mt-15f"></div>
    </section>

    <!-- Best Selling Products -->
    <section
      class="container-default mt-20"
      data-aos="fade-up-right"
      data-aos-delay="400"
      data-aos-duration="1000"
    >
      <SectionHeader title="This Month" />

      <div class="flex justify-between items-center">
        <span class="section-title">Best Selling Products</span>
        <button class="btn btn-primary text-white px-7">View All</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        <CardComponent v-for="product in products" :key="product.id" :product="product" />
      </div>

      <div class="divider mt-15"></div>
    </section>

    <!-- New Arrival -->
    <section
      class="container-default mt-20"
      data-aos="flip-up"
      data-aos-delay="500"
      data-aos-duration="1000"
    >
      <SectionHeader title="Featured" />
      <span class="section-title">New Arrival</span>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[500px] mt-10">
        <div class="bg-red-200 relative">
          <img
            src="/img/products/watch.jpg"
            alt="Play Station"
            srcset=""
            class="absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute bottom-5 left-10">
            <div class="text-xl font-bold">Lorem, ipsum dolor.</div>
            <div class="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam!
            </div>

            <div>
              <RouterLink :to="{ name: 'Shop' }">
                <span class="underline"> Shop Now </span>
              </RouterLink>
            </div>
          </div>
        </div>

        <div>
          <div class="grid grid-row-2 gap-4">
            <div class="bg-red-200 h-[250px] relative">
              <img
                src="/img/slide/2.avif"
                alt="Play Station"
                srcset=""
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute bottom-5 left-10 text-white">
                <div class="text-xl font-bold">Lorem, ipsum dolor.</div>
                <div class="text-sm">
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
                  src="/img/slide/2.avif"
                  alt="Play Station"
                  srcset=""
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute bottom-5 left-10 text-white">
                  <div class="text-xl font-bold">Lorem, ipsum dolor.</div>
                  <div class="text-sm">
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
                  src="/img/slide/2.avif"
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
    <section
      class="container-default mt-20"
      data-aos="zoom-out-up"
      data-aos-delay="600"
      data-aos-duration="1200"
    >
      <SectionHeader title="Our Products" />
      <span class="text-2xl md:text-3xl lg:text-4xl font-semibold">Explore Our Products</span>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        <CardComponent v-for="product in products" :key="product.id" :product="product" />
      </div>

      <div class="text-center mt-10">
        <div class="btn btn-primary text-white btn-wide" @click="goToShop">View All Products</div>
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
        <button class="btn btn-circle" @click="scrollToTop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </section>
  </div>
</template>
<script setup>
import CardComponent from '@/views/customer/components/common/CardComponent.vue'
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { useProductsStore } from '/src/stores/productsStore.js'
import { useRouter } from 'vue-router'
import SectionHeader from '../components/common/SectionHeader.vue'
import { TruckIcon, LifebuoyIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
import CategoryComponent from '../components/common/CategoryComponent.vue'
import { useCategoriesStore } from '@/stores/categoriesStore'
// Using products from pinia
const productsStore = useProductsStore()
const products = productsStore.productsList

// Using categories form pinia
const categoriesStore = useCategoriesStore()
const categories = categoriesStore.categoriesList

// Make
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const features = [
  {
    title: 'FREE AND FAST DELIVERY',
    description: 'Free delivery for all orders over $140',
    icon: TruckIcon,
  },
  {
    title: '24/7 CUSTOMER SERVICE',
    description: 'Friendly 24/7 customer support',
    icon: LifebuoyIcon,
  },
  {
    title: 'MONEY BACK GUARANTEE',
    description: 'We return money within 30 days',
    icon: ShieldCheckIcon,
  },
]

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
const sildePhotos = ['1.jpg', '2.avif', '3.jpg', '4.jpg']

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

// How to go to Products by category
const router = useRouter()
const goToCategory = (category) => {
  router.push({ name: 'Shop', query: { category: category.label } })
}

// Add animation when scrolling using aos library
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({})
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
