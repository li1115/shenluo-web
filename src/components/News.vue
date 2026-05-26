<script setup lang="ts">
import news1 from '@/assets/news-1.png'
import news2 from '@/assets/news-2.png'
import news3 from '@/assets/news-3.png'
import news4 from '@/assets/news-4.png'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const newsItems = [
  {
    id: 1,
    title: '重磅招商 | 神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴',
    date: '2026.03.14',
    category: '企业动态',
    image: news1,
  },
  {
    id: 2,
    title: '首发  神络医疗完成数亿元C轮融资，构筑"神经调控+脑机接口"...',
    date: '2026.03.14',
    category: '企业动态',
    image: news2,
  },
  {
    id: 3,
    title: '喜报 I 神络医疗植入式可充电脊髓神经刺激器获批上市',
    date: '2026.03.14',
    category: '企业动态',
    image: news3,
  },
  {
    id: 4,
    title: '喜报  神络医疗博士后科研工作站获批成立',
    date: '2026.03.14',
    category: '企业动态',
    image: news4,
  },
]

const cardWidth = 492
const gap = 40
const step = cardWidth + gap
const totalSetWidth = newsItems.length * step

const scrollOffset = ref(0)
const isPaused = ref(false)
let animId: number | null = null
const SPEED = 0.35

const animate = () => {
  if (!isPaused.value) {
    scrollOffset.value += SPEED
    if (scrollOffset.value >= totalSetWidth) {
      scrollOffset.value -= totalSetWidth
    }
  }
  animId = requestAnimationFrame(animate)
}

const handleWheel = (e: WheelEvent) => {
  return 
  scrollOffset.value += e.deltaY * 2
  if (scrollOffset.value < 0) {
    scrollOffset.value += totalSetWidth
  }
  if (scrollOffset.value >= totalSetWidth) {
    scrollOffset.value -= totalSetWidth
  }
}

onMounted(() => {
  animId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<template>
  <section class="pt-[100px] bg-white">
    <div class="max-w-[1920px] mx-auto">
      <div class="text-center">
        <span class="block text-[#0163FF] font-black text-lg mb-5 font-alibabapuhuiti">
          {{ $t('home.news.label') }}
        </span>
        <h2 class="text-[66px] font-black text-black leading-tight font-alibabapuhuiti">
          {{ $t('home.news.heading') }}
        </h2>
      </div>

      <div class="overflow-hidden pb-[100px] pt-[80px]">
        <div @mouseenter="isPaused = true" @mouseleave="isPaused = false" @wheel="handleWheel">
          <div class="flex gap-10 will-change-transform" :style="{ transform: `translateX(-${scrollOffset}px)` }">
            <div v-for="(item, idx) in [...newsItems, ...newsItems]" :key="idx" class="w-[492px] h-[612px] bg-white rounded-[30px] overflow-hidden border border-[#E5E5E5] shadow-[0px_0px_29px_0px_rgba(148,148,148,0.22)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer group flex-shrink-0
            hover:shadow-[0px_22px_34px_0px_#F3F3F3] hover:border hover:border-[#CDEAF5] hover:cursor-pointer group">
              <div class="h-[360px] relative overflow-hidden">
                <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
              </div>
              <div class="p-[50px] flex flex-col gap-6">
                <div class="flex items-center justify-between">
                  <span class="bg-[#E5F0FF] text-[#0163FF] text-base font-semibold px-3 py-2 rounded-[50px] font-pingfang">
                    {{ item.category }}
                  </span>
                  <span class="text-black text-base font-semibold font-pingfang">{{ item.date }}</span>
                </div>
                <h3
                  class="text-[26px] font-semibold text-black group-hover:text-[#0163FF] transition-colors line-clamp-2 leading-[44px] font-pingfang">
                  {{ item.title }}
                </h3>
              </div>
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
  section div[class*="w-\\[492px\\]"] {
    width: clamp(320px, 25.6vw, 492px) !important;
    height: clamp(400px, 31.8vw, 612px) !important;
  }
  section div[class*="h-\\[360px\\]"] {
    height: clamp(240px, 18.7vw, 360px) !important;
  }
  section h3[class*="text-\\[26px\\]"] {
    font-size: clamp(16px, 1.35vw, 26px) !important;
    line-height: clamp(26px, 2.3vw, 44px) !important;
  }
  section div[class*="p-\\[50px\\]"] {
    padding: clamp(20px, 2.6vw, 50px) !important;
  }
}

@media (max-width: 1024px) {
  section div[class*="w-\\[492px\\]"] {
    width: 380px !important;
    height: 480px !important;
  }
  section div[class*="h-\\[360px\\]"] {
    height: 200px !important;
  }
}

@media (max-width: 768px) {
  section[class*="pt-\\[100px\\]"] {
    padding-top: 40px !important;
  }
  section h2[class*="text-\\[66px\\]"] {
    font-size: 30px !important;
  }
  section div[class*="w-\\[492px\\]"] {
    width: 320px !important;
    height: 420px !important;
  }
  section div[class*="h-\\[360px\\]"] {
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
  section div[class*="w-\\[492px\\]"] {
    width: 280px !important;
    height: 380px !important;
  }
  section div[class*="h-\\[360px\\]"] {
    height: 150px !important;
  }
}
</style>