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
  </div>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { useRouter } from 'vue-router'

const photos = ['1.avif', '2.avif', '3.avif', '4.avif']
const route = useRouter()
const goToShop = () => {
  route.push({ name: 'Shop' })
}
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
</style>
