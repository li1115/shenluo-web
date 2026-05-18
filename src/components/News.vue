<script setup lang="ts">
import news1 from '@/assets/news-1.png'
import news2 from '@/assets/news-2.png'
import news3 from '@/assets/news-3.png'
import news4 from '@/assets/news-4.png'
import { ref, onMounted, onBeforeUnmount } from 'vue'

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
  <section class="py-[100px] bg-white">
    <div class="max-w-[1920px] mx-auto">
      <div class="text-center mb-[80px]">
        <span class="block text-[#0163FF] font-black text-lg mb-5">
          资讯中心
        </span>
        <h2 class="text-[66px] font-black text-black leading-tight">
          神络资讯中心
        </h2>
      </div>

      <div
        class="overflow-hidden"
        @mouseenter="isPaused = true"
        @mouseleave="isPaused = false"
        @wheel.prevent="handleWheel"
      >
        <div
          class="flex gap-10 will-change-transform"
          :style="{ transform: `translateX(-${scrollOffset}px)` }"
        >
          <div
            v-for="(item, idx) in [...newsItems, ...newsItems]"
            :key="idx"
            class="w-[492px] h-[612px] bg-white rounded-[30px] overflow-hidden shadow-[0px_0px_29px_rgba(148,148,148,0.22)] hover:shadow-[0px_8px_30px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer group flex-shrink-0"
          >
            <div class="h-[340px] relative overflow-hidden">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
            </div>
            <div class="p-8 flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <span class="bg-[#0163FF] text-white text-xs font-bold px-4 py-1.5 rounded-[50px]">
                  {{ item.category }}
                </span>
                <span class="text-gray-400 text-sm">{{ item.date }}</span>
              </div>
              <h3 class="text-xl font-black text-black leading-relaxed group-hover:text-[#0163FF] transition-colors line-clamp-2">
                {{ item.title }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>