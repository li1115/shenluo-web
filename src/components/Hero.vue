<script setup lang="ts">
import router from '@/router'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import banner1 from '@/assets/banner-1.png'
import banner2 from '@/assets/banner-2.png'
import banner3 from '@/assets/banner-3.png'

const bannerList = ref([
  {
    title: '破译神经密码',
    subTitle: '重启生命原力',
    description: '从神经信号的微妙波动到生命律动的磅礴交响',
    link: '/product/1',
    titleColor: '#fff',
    subTitleColor: '#BAD500',
    descriptionColor: '#fff',
    bgImage: banner1,
  },
  {
    title: '以智慧赋能系统',
    subTitle: '以创新打造未来',
    description: '精确解码神经活动，联合多学科共同探索精准、可靠、无感的神经调控未来。',
    link: '/about',
    titleColor: '#0163FF',
    subTitleColor: '#000',
    descriptionColor: '#333',
    bgImage: banner2,
    descriptionMaxWidth: '576px',
  },
  {
    title: '精控毫厘 轻盈相伴',
    subTitle: '持久护航',
    description: '让治疗精准直达，让设备无感融入，让守护始终如一重新定义治疗新标准。',
    link: '/contact',
    titleColor: '#fff',
    subTitleColor: '#BAD500',
    descriptionColor: '#fff',
    descriptionMaxWidth: '560px',
    bgImage: banner3,
  },
])

const INTERVAL = 3000
const isActive = ref(0)
const bannerCount = bannerList.value.length
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
    isActive.value = (isActive.value + 1) % bannerCount
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
  <section class="relative w-full h-screen overflow-hidden" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">
    <div class="relative w-full h-full overflow-hidden">
      <div class="flex h-full transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${isActive * 100}%)` }">
        <div v-for="(item, index) in bannerList" :key="item.title" class="relative w-full h-full flex-shrink-0">
          <img :src="item.bgImage" alt="background" class="absolute inset-0 w-full h-full object-cover" 
          :style="isActive === index ? { 
            transition: '6s linear', 
            transform: 'scale(1, 1)', 
            zIndex: 10
          } : {
            transition: '1s linear 2s',
            transform: 'scale(1.1, 1.1)'
          }" />
          <div class="relative z-10 h-full flex items-center">
            <div class="w-full max-w-[1920px] mx-auto px-[164px]">
              <div class="max-w-[856px]">
                <div :class="[
                  'transition-all duration-500',
                  isActive === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                ]">
                  <div :key="isActive === index ? slideKey + '-t-' + index : 'static-t-' + index"
                    class="flex flex-col gap-[6px] mb-[34px]">
                    <h1 class="slide-in text-[100px] font-black leading-[110%] tracking-wide uppercase"
                      :style="{ color: item.titleColor }">
                      {{ item.title }}
                    </h1>
                    <h1 class="slide-in-d1 text-[100px] font-black leading-[110%] tracking-wide uppercase"
                      :style="{ color: item.subTitleColor }">
                      {{ item.subTitle }}
                    </h1>
                  </div>
                  <p :key="isActive === index ? slideKey + '-d-' + index : 'static-d-' + index"
                    class="slide-in-d2 text-2xl mb-[34px] leading-[39px]"
                    :style="{ color: item.descriptionColor, maxWidth: item.descriptionMaxWidth || '100%' }">
                    {{ item.description }}
                  </p>
                  <div :key="isActive === index ? slideKey + '-b-' + index : 'static-b-' + index" class="fade-in-500">
                    <button
                      class="group flex items-center justify-center gap-2.5 bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-lg w-[188px] h-[54px] rounded-[40px] transition-colors cursor-pointer"
                      @click="handleClick(item.link)">
                      了解更多
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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
    </div>

    <div class="absolute bottom-[45px] left-1/2 -translate-x-1/2 z-10 flex items-center gap-[6px]">
      <button v-for="(_, index) in bannerList" :key="index"
        class="w-[60px] h-[12px] rounded-full bg-white border-none outline-none cursor-pointer transition-opacity duration-300"
        :class="isActive === index ? 'opacity-100' : 'opacity-50'" @click="goTo(index)" />
    </div>
  </section>
</template>

<style scoped>
.bannerSwiper .swiper-slide-active img,
.bannerSwiper .swiper-slide-duplicate-active img {
  transition: 6s linear;
  transform: scale(1, 1);
}

.bannerSwiper .imgBox img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 1s linear 2s;
  transform: scale(1.1, 1.1);
}

.slide-in {
  animation: slideFromTop 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
}

.slide-in-d1 {
  animation: slideFromTop 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s both;
}

.slide-in-d2 {
  animation: slideFromBottom 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s both;
}

.fade-in-500 {
  animation: slideFromBottom 1s ease-out 0.6s both;
}

@keyframes slideFromBottom {
  from {
    transform: translate3d(0, 100%, 0);
    opacity: 0;
  }

  to {
    transform: none;
    opacity: 1;
  }
}

@keyframes slideFromTop {
  from {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }

  to {
    transform: none;
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>