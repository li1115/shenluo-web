<script setup lang="ts">
import router from '@/router'
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import banner1 from '@/assets/banner-1.png'
import banner2 from '@/assets/banner-2.png'
import banner3 from '@/assets/banner-3.png'
import banner3Product from '@/assets/banner-3-product.png'

const { t } = useI18n()
import { productsData } from '@/shared/products'
const bannerList = computed(() => [
  {
    title: t('home.hero.slide1.title'),
    subTitle: t('home.hero.slide1.subTitle'),
    description: t('home.hero.slide1.description'),
    link: `/products/product/${productsData[0].productCode}`,
    titleColor: '#fff',
    subTitleColor: '#BAD500',
    descriptionColor: '#fff',
    bgImage: banner1,
  },
  {
    title: t('home.hero.slide2.title'),
    subTitle: t('home.hero.slide2.subTitle'),
    description: t('home.hero.slide2.description'),
    link: `/products/product/${productsData[1].productCode}`,
    titleColor: '#0163FF',
    subTitleColor: '#000',
    descriptionColor: '#333',
    bgImage: banner2,
    descriptionMaxWidth: '36rem',
  },
  {
    title: t('home.hero.slide3.title'),
    subTitle: t('home.hero.slide3.subTitle'),
    description: t('home.hero.slide3.description'),
    link: `/products/product/${productsData[2].productCode}`,
    titleColor: '#fff',
    subTitleColor: '#BAD500',
    descriptionColor: '#fff',
    descriptionMaxWidth: '35rem',
    bgImage: banner3,
    productImage: banner3Product,
  },
])

const INTERVAL = 6000
const isActive = ref(0)
const bannerCount = computed(() => bannerList.value.length)
const timer = ref<number>()

const slideKey = ref(0)

const goTo = (index: number) => {
  isActive.value = index
}

const handleClick = (link: string) => {
  router.push(link)
}

const startAutoplay = () => {
  stopAutoplay()
  timer.value = window.setInterval(() => {
    isActive.value = (isActive.value + 1) % bannerCount.value
  }, INTERVAL)
}

const stopAutoplay = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = undefined
  }
}

watch(isActive, () => {
  slideKey.value++
})

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section class="relative w-full h-screen overflow-hidden">
    <!-- 淡入淡出叠加切换：所有幻灯片 absolute 堆叠，通过 opacity 切换 -->
    <div class="relative w-full h-full">
      <div v-for="(item, index) in bannerList" :key="item.title"
        class="absolute inset-0 transition-opacity duration-700 ease-in-out"
        :class="isActive === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'">
        <!-- 背景图 Ken Burns 慢速缩放 -->
        <img :src="item.bgImage" alt="background" class="absolute inset-0 w-full h-full object-cover banner-bg-img"
          :class="{ 'banner-bg-zoom': isActive === index }" />
        <img v-if="item.productImage" :src="item.productImage" alt="product"
          class="absolute top-[18.12rem] right-[1.64rem] object-cover banner-product-img w-[55rem] h-[36.58rem]"
          :class="{ 'banner-bg-zoom': isActive === index }" />
        <!-- 文字内容 -->
        <div class="relative z-10 h-full flex items-center">
          <div class="w-full max-w-[120rem] mx-auto px-[10.25rem]">
            <div class="max-w-[53.5rem]">
              <div :key="isActive === index ? slideKey + '-wrap-' + index : 'static-wrap-' + index">
                <div class="flex flex-col gap-[0.375rem] mb-[2.125rem]">
                  <h1 class="text-[6.25rem] font-black leading-[110%] tracking-wide uppercase banner-text-slide" :style="{
                    color: item.titleColor,
                    animationDelay: '0.2s',
                  }">
                    {{ item.title }}
                  </h1>
                  <h1 class="text-[6.25rem] font-black leading-[110%] tracking-wide uppercase banner-text-slide" :style="{
                    color: item.subTitleColor,
                    animationDelay: '0.5s',
                  }">
                    {{ item.subTitle }}
                  </h1>
                </div>
                <p class="text-2xl mb-[2.125rem] leading-[2.4375rem] banner-text-slide" :style="{
                  color: item.descriptionColor,
                  maxWidth: item.descriptionMaxWidth || '100%',
                  animationDelay: '0.3s',
                }">
                  {{ item.description }}
                </p>
                <div class="banner-text-slide" style="animation-delay: 0.6s">
                  <button
                    class="group flex items-center justify-center gap-2.5 bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-lg w-[11.75rem] h-[3.375rem] rounded-[2.5rem] transition-colors cursor-pointer"
                    @click="handleClick(item.link)">
                    {{ $t('home.hero.learnMore') }}
                    <svg class="w-[1.25rem] h-[1.25rem]" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                      viewBox="0 0 20 20" fill="none">
                      <mask id="mask0_339_2721" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                        width="20" height="20">
                        <rect width="20" height="20" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_339_2721)">
                        <path
                          d="M13.4792 10.8334H3.33334V9.16671H13.4792L8.81251 4.50004L10 3.33337L16.6667 10L10 16.6667L8.81251 15.5L13.4792 10.8334Z"
                          fill="white" />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部圆点指示器 -->
    <div class="absolute bottom-[2.8125rem] left-1/2 -translate-x-1/2 z-20 flex items-center gap-[0.375rem]">
      <button v-for="(_, index) in bannerList" :key="index"
        class="w-[3.75rem] h-[0.75rem] rounded-full bg-white border-none outline-none cursor-pointer transition-opacity duration-300"
        :class="isActive === index ? 'opacity-100' : 'opacity-50'" @click="goTo(index)" />
    </div>
  </section>
</template>

<style scoped>
/* 背景图 Ken Burns 慢速缩放：从 1.0 放大到 1.1，持续 6s */
.banner-bg-img {
  transform: scale(1);
}

.banner-bg-zoom {
  animation: kenBurns 6s linear forwards;
}

@keyframes kenBurns {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.1);
  }
}

/* 文字内容统一从下往上滑入 + 淡入，初始隐藏 */
.banner-text-slide {
  opacity: 0;
  transform: translateY(1.875rem);
  animation: textSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes textSlideUp {
  from {
    opacity: 0;
    transform: translateY(1.875rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>