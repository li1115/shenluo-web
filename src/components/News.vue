<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { getNewsCategoriesTop } from '@/api/news'
import type { PublicNewsItem } from '@/api/types'

const router = useRouter()

interface NewsDisplayItem {
  newsNo: string
  title: string
  date: string
  category: string
  image: string
}

/** API 新闻项 → 页面展示数据映射 */
function mapNewsItem(item: PublicNewsItem): NewsDisplayItem {
  return {
    newsNo: item.newsNo,
    title: item.title,
    date: item.displayDate,
    category: item.categoryName,
    image: item.coverUrl,
  }
}

// ====== 模拟数据（已注释，保留备用） ======

import news1 from '@/assets/news-1.png'
import news2 from '@/assets/news-2.png'
import news3 from '@/assets/news-3.png'
import news4 from '@/assets/news-4.png'
const mockNewsItems: NewsDisplayItem[] = [
  {
    newsNo: '1',
    title: '重磅招商 | 神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴',
    date: '2026.03.14',
    category: '企业动态',
    image: news1,
  },
  {
    newsNo: '2',
    title: '重磅招商 | 神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴',
    date: '2026.03.14',
    category: '企业动态',
    image: news2,
  },
  {
    newsNo: '3',
    title: '...神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴',
    date: '2026.03.14',
    category: '企业动态',
    image: news3,
  },
  {
    newsNo: '4',
    title: '.神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴..',
    date: '2026.03.14',
    category: '企业动态',
    image: news4,
  },
]
// ====== 模拟数据结束 ======

const apiNewsItems = ref<NewsDisplayItem[]>([])

const newsItems = computed(() => apiNewsItems.value)

async function fetchNews() {
  try {
    const res = await getNewsCategoriesTop()
    apiNewsItems.value = (res.data || []).map(mapNewsItem)
  } catch {
    // apiNewsItems.value = []
    // 模拟数据
    apiNewsItems.value = mockNewsItems
  }
  animId = requestAnimationFrame(animate)
}

const goToNewsDetail = (newsNo: string) => {
  router.push(`/news/${newsNo}`)
}

const cardWidth = 492
const gap = 40
const step = cardWidth + gap
const totalSetWidth = computed(() => newsItems.value.length * step)

const scrollOffset = ref(0)
const isPaused = ref(false)
let animId: number | null = null
const SPEED = 0.35

const animate = () => {
  if (!isPaused.value) {
    scrollOffset.value += SPEED
    if (scrollOffset.value >= totalSetWidth.value) {
      scrollOffset.value -= totalSetWidth.value
    }
  }
  animId = requestAnimationFrame(animate)
}

const handleWheel = (e: WheelEvent) => {
  return 
  scrollOffset.value += e.deltaY * 2
  if (scrollOffset.value < 0) {
    scrollOffset.value += totalSetWidth.value
  }
  if (scrollOffset.value >= totalSetWidth.value) {
    scrollOffset.value -= totalSetWidth.value
  }
}

onMounted(() => {
  fetchNews()
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
            hover:shadow-[0px_22px_34px_0px_#F3F3F3] hover:border hover:border-[#CDEAF5] hover:cursor-pointer group"
            @click="goToNewsDetail(item.newsNo)">
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
                  class="text-[26px] font-semibold text-black group-hover:text-[#0163FF] transition-colors line-clamp-2 leading-[44px] font-pingfang"
                  :title="item.title"
                  >
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