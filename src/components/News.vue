<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '@/shared/utils/formatDate'
import { getNewsCategoryTop } from '@/api/news'
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
    date: formatDate(item.displayDate),
    category: item.categoryName,
    image: item.coverUrl,
  }
}

const apiNewsItems = ref<NewsDisplayItem[]>([])

const newsItems = computed(() => {
  if (apiNewsItems.value.length > 3) {
    return [...apiNewsItems.value, ...apiNewsItems.value]
  }
  return apiNewsItems.value
})

async function fetchNews() {
  try {
    const res = await getNewsCategoryTop('ALL')
    apiNewsItems.value = (res.data || []).map(mapNewsItem)
  } catch {
    apiNewsItems.value = []
  }
  if (apiNewsItems.value.length > 3) {
    animId = requestAnimationFrame(animate)
  }
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
  return e.preventDefault()
}

onMounted(() => {
  fetchNews()
})

onBeforeUnmount(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<template>
  <section class="pt-[6.25rem] bg-white">
    <div class="max-w-[120rem] mx-auto">
      <div class="text-center">
        <span class="block text-[#0163FF] font-black text-lg mb-5 font-alibabapuhuiti">
          {{ $t('home.news.label') }}
        </span>
        <h2 class="text-[4.125rem] font-black text-black leading-tight font-alibabapuhuiti">
          {{ $t('home.news.heading') }}
        </h2>
      </div>

      <div class="overflow-hidden pb-[6.25rem] pt-[5rem]">
        <div @mouseenter="isPaused = true" @mouseleave="isPaused = false" @wheel="handleWheel">
          <div class="flex gap-10 will-change-transform justify-center"
            :style="{ transform: `translateX(-${scrollOffset}px)` }">
            <div v-for="(item, idx) in newsItems" :key="idx"
              class="w-[30.75rem] h-[38.25rem] bg-white rounded-[1.875rem] overflow-hidden border border-[#E5E5E5] shadow-[0_0_1.8125rem_0_rgba(148,148,148,0.22)] transition-all duration-300 cursor-pointer group flex-shrink-0 transform hover:shadow-[0_1.375rem_2.125rem_0_#F3F3F3] hover:border-[#CDEAF5] hover:-translate-y-2"
              @click="goToNewsDetail(item.newsNo)">
              <div class="h-[22.5rem] relative overflow-hidden">
                <img :src="item.image" :alt="item.title" class="w-full h-full transition-transform duration-300 group-hover:scale-103" />
              </div>
              <div class="p-[3.125rem] flex flex-col gap-6">
                <div class="flex items-center justify-between">
                  <span
                    class="bg-[#E5F0FF] text-[#0163FF] text-base font-semibold px-3 py-2 rounded-[3.125rem] font-pingfang">
                    {{ item.category }}
                  </span>
                  <span class="text-black text-base font-semibold font-pingfang">{{ item.date }}</span>
                </div>
                <h3
                  class="text-[1.625rem] font-semibold text-black group-hover:text-[#0163FF] transition-colors line-clamp-2 leading-[2.75rem] font-pingfang"
                  :title="item.title">
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