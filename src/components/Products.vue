<script setup lang="ts">
import product1 from '@/assets/product-1.png'
import product2 from '@/assets/product-2.png'
import product3 from '@/assets/product-3.png'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const products = computed(() => [
  {
    id: 1,
    name: t('home.products.scsName'),
    description: t('home.products.scsDesc'),
    image: product1,
    selected: true,
  },
  {
    id: 2,
    name: t('home.products.pnsName'),
    description: t('home.products.pnsDesc'),
    image: product2,
    selected: false,
  },
  {
    id: 3,
    name: t('home.products.tnsName'),
    description: t('home.products.tnsDesc'),
    image: product3,
    selected: false,
  },
])

const goToDetail = (id: number) => {
  router.push(`/product/${id}`)
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
              @click="goToDetail(product.id)">
            <div class="h-[340px] flex items-center justify-center overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 flex flex-col items-center justify-center px-[70px] gap-5 pb-[7px]">
              <h3 class="text-2xl font-black text-black text-center font-dinblack">{{ product.name }}</h3>
              <p class="text-[15px] text-[#999999] text-center leading-[23px] font-pingfang">
                {{ product.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ========== Responsive ========== */
@media (max-width: 1600px) {
  section[class*="pt-\\[100px\\]"] {
    padding-top: clamp(50px, 5.2vw, 100px) !important;
  }
  section h2[class*="text-\\[66px\\]"] {
    font-size: clamp(36px, 3.5vw, 66px) !important;
  }
  section div[class*="w-\\[500px\\]"] {
    width: clamp(320px, 26vw, 500px) !important;
    height: clamp(320px, 26vw, 500px) !important;
  }
  section div[class*="h-\\[340px\\]"] {
    height: clamp(220px, 18vw, 340px) !important;
  }
  section div[class*="gap-10"] {
    gap: clamp(20px, 2vw, 40px) !important;
  }
}

@media (max-width: 1024px) {
  section div[class*="w-\\[500px\\]"] {
    width: 380px !important;
    height: 380px !important;
  }
  section div[class*="h-\\[340px\\]"] {
    height: 240px !important;
  }
  section div[class*="px-\\[70px\\]"] {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
}

@media (max-width: 768px) {
  section[class*="pt-\\[100px\\]"] {
    padding-top: 40px !important;
  }
  section h2[class*="text-\\[66px\\]"] {
    font-size: 30px !important;
  }
  section div[class*="w-\\[500px\\]"] {
    width: 300px !important;
    height: 340px !important;
  }
  section div[class*="h-\\[340px\\]"] {
    height: 180px !important;
  }
  section div[class*="pb-\\[100px\\]"] {
    padding-bottom: 40px !important;
  }
  section div[class*="pt-\\[80px\\]"] {
    padding-top: 40px !important;
  }
}

@media (max-width: 480px) {
  section h2[class*="text-\\[66px\\]"] {
    font-size: 24px !important;
  }
  section div[class*="w-\\[500px\\]"] {
    width: 260px !important;
    height: 300px !important;
  }
  section div[class*="h-\\[340px\\]"] {
    height: 150px !important;
  }
}
</style>