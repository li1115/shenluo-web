<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { productsData } from '@/shared/products'
const router = useRouter()

const products = computed(() => productsData)

const goToDetail = (productCode: string) => {
  router.push(`/products/product/${productCode}`)
}

const cardWidth = 500
const gap = 40
const step = cardWidth + gap
const totalSetWidth = computed(() => products.value.length * step)

const duplicated = computed(() => [...products.value])

const scrollOffset = ref(0)
const isPaused = ref(false)
let animId: number | null = null
const SPEED = 0.3

const animate = () => {
  if (!isPaused.value) {
    scrollOffset.value += SPEED
    if (scrollOffset.value >= totalSetWidth.value) {
      scrollOffset.value -= totalSetWidth.value
    }
  }
  animId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (products.value.length > 3) {
    animId = requestAnimationFrame(animate)
  }
})

onBeforeUnmount(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<template>
  <section class="pt-[100px] bg-white">
    <div class="max-w-[1920px] mx-auto">
      <div class="text-center ">
        <span class="block text-[#0163FF] font-black text-lg mb-5 font-alibabapuhuiti">
          {{ $t('home.products.label') }}
        </span>
        <h2 class="text-[66px] font-black text-black leading-tight font-alibabapuhuiti">
          {{ $t('home.products.heading') }}
        </h2>
      </div>

      <div class="overflow-hidden pt-[80px] pb-[100px]" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
        <div class="flex gap-10 will-change-transform mx-auto w-fit" :style="{ transform: `translateX(-${scrollOffset}px)` }">
          <div v-for="(product, idx) in duplicated" :key="idx"
            class="w-[500px] h-[500px] bg-[#F9FAFC] border border-[#F1F2F4] rounded-[10px] overflow-hidden flex flex-col flex-shrink-0 cursor-pointer 
            transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]
            hover:shadow-[0px_22px_34px_0px_#F3F3F3] hover:border-[#CDEAF5] hover:cursor-pointer hover:translate-y-[-10px] group"
              @click="goToDetail(product.productCode)">
            <div class="h-[340px] flex items-center justify-center overflow-hidden">
              <img :src="product.image" :alt="product.productCode" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103" />
            </div>
            <div class="flex-1 flex flex-col items-center justify-center px-[70px] gap-5 pb-[7px]">
              <h3 class="text-2xl font-black text-black text-center font-dinblack">{{ $t(product.nameKey) }}</h3>
              <p class="text-[15px] text-[#999999] text-center leading-[23px] font-pingfang">
                {{ $t(product.descKey) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>