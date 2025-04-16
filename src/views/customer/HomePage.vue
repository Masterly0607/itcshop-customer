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
      <div class="flex gap-3 items-center mb-4">
        <div class="bg-primary w-5 h-10 rounded"></div>
        <span class="text-primary">Today's</span>
      </div>
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
        <button class="btn btn-primary text-white btn-wide">View All Products</button>
      </div>

      <div class="divider mt-10"></div>
    </section>

    <!-- Browse By Category -->
    <section></section>
  </div>
</template>

<script setup>
import CardComponent from './components/CardComponent.vue'
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { EffectFade, Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { useRouter } from 'vue-router'

const photos = ['1.avif', '2.avif', '3.avif', '4.avif']
const route = useRouter()
const goToShop = () => {
  route.push({ name: 'Shop' })
}
const swiperInstance = ref(null)
const isBeginning = ref(true)
const isEnd = ref(false)

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
  updateArrowState(swiper)
}

const onSlideChange = () => {
  if (swiperInstance.value) {
    updateArrowState(swiperInstance.value)
  }
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

// Card Component
const card = [
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
    id: 1,
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
    id: 1,
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
    id: 1,
  },
]

// Countdown logic
const targetDate = new Date()
targetDate.setDate(targetDate.getDate() + 15)

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

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
