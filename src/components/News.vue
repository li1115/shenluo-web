<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

/** 数据 < 3 条时不滚动轮播，只静态展示 */
const hasAnimation = computed(() => apiNewsItems.value.length > 2)

const displayItems = computed(() => {
  const items = apiNewsItems.value
  if (items.length === 0) return []
  if (!hasAnimation.value) return items
  return [...items, ...items, ...items]
})

const animDuration = computed(() => {
  if (!hasAnimation.value) return '0s'
  const oneSetWidth = apiNewsItems.value.length * 532
  const speed = 21
  return `${oneSetWidth / speed}s`
})

const isPaused = ref(false)

async function fetchNews() {
  try {
    const res = await getNewsCategoryTop('ALL')
    apiNewsItems.value = (res.data || []).map(mapNewsItem)
  } catch {
    apiNewsItems.value = []
  }
}

const goToNewsDetail = (newsNo: string) => {
  router.push(`/news/${newsNo}`)
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <section class="pt-[6.25rem] bg-white">
    <div class="max-w-[120rem] mx-auto">
      <div class="text-center">
        <span class="block text-[2.375rem] text-[#0163FF] font-black mb-5 font-alibabapuhuiti">
          {{ $t('home.news.label') }}
        </span>
        <h2 class="text-[4.125rem] font-black text-black leading-tight font-alibabapuhuiti">
          {{ $t('home.news.heading') }}
        </h2>
      </div>

      <div class="pb-[6.25rem] pt-[5rem]" style="overflow: hidden; position: relative;" @mouseenter="isPaused = true"
        @mouseleave="isPaused = false">
        <div :class="['news-track', { 'news-track--animated': hasAnimation }]" :style="hasAnimation ? {
          animationDuration: animDuration,
          animationPlayState: isPaused ? 'paused' : 'running',
        } : { margin: '0 auto' }">
          <div v-for="(item, idx) in displayItems" :key="`${item.newsNo}-${idx}`"
            class="w-[30.75rem] h-[38.25rem] bg-white rounded-[1.875rem] overflow-hidden border border-[#E5E5E5] shadow-[0_0_1.8125rem_0_rgba(148,148,148,0.22)] transition-all duration-300 cursor-pointer group flex-shrink-0 transform hover:shadow-[0_1.375rem_2.125rem_0_#F3F3F3] hover:border-[#CDEAF5] hover:-translate-y-2"
            @click="goToNewsDetail(item.newsNo)">
            <div class="h-[22.5rem] relative overflow-hidden">
              <img :src="item.image" :alt="item.title"
                class="w-full h-full transition-transform duration-300 group-hover:scale-103" />
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
  </section>
</template>

<style scoped>
.news-track {
  display: flex;
  gap: 2.5rem;
  width: max-content;
}

.news-track--animated {
  animation-name: news-scroll;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes news-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-33.333%);
  }
}
</style>
