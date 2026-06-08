<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import { getNewsCategories, getNewsPage } from '@/api/news'
import type { NewsCategory, PublicNewsItem } from '@/api/types'

const router = useRouter()

/** 页面展示用的新闻项 */
interface NewsDisplayItem {
  newsNo: string
  title: string
  date: string
  category: string
  image: string
}
import { formatDate } from '@/shared/utils/formatDate'
/** API 字段 → 页面展示字段映射 */
function mapNewsItem(item: PublicNewsItem): NewsDisplayItem {
  return {
    newsNo: item.newsNo,
    title: item.title,
    date: formatDate(item.displayDate),
    category: item.categoryName,
    image: item.coverUrl,
  }
}

const categories = ref<NewsCategory[]>([])
const newsMap = ref<Record<string, NewsDisplayItem[]>>({})

/** 每个分类的当前页码 */
const pageMap = ref<Record<string, number>>({})
/** 每个分类的总条数 */
const totalMap = ref<Record<string, number>>({})
/** 每页条数 */
const PAGE_SIZE = 6

/** 初始化加载：每个分类请求第1页（1-6条） */
async function fetchData() {
  loading.value = true
  try {
    const catRes = await getNewsCategories()
    categories.value = catRes.data || []
    const map: Record<string, NewsDisplayItem[]> = {}
    for (const cat of categories.value) {
      if (cat.code === 'ALL') continue
      try {
        const pageRes = await getNewsPage({ page: 1, size: PAGE_SIZE, categoryCode: cat.code })
        map[cat.code] = (pageRes.data?.records || []).map(mapNewsItem)
        pageMap.value[cat.code] = 1
        totalMap.value[cat.code] = pageRes.data?.total || 0
      } catch {
        map[cat.code] = []
        pageMap.value[cat.code] = 1
        totalMap.value[cat.code] = 0
      }
    }
    newsMap.value = map
  } finally {
    loading.value = false
  }
}

const loadingMoreMap = ref<Record<string, boolean>>({})

/** 加载更多：请求下一页并追加到已有数据 */
async function loadMore(categoryCode: string) {
  if (loadingMoreMap.value[categoryCode]) return
  loadingMoreMap.value[categoryCode] = true
  try {
    const nextPage = (pageMap.value[categoryCode] || 1) + 1
    const pageRes = await getNewsPage({ page: nextPage, size: PAGE_SIZE, categoryCode })
    const newItems = (pageRes.data?.records || []).map(mapNewsItem)
    newsMap.value[categoryCode] = [...(newsMap.value[categoryCode] || []), ...newItems]
    pageMap.value[categoryCode] = nextPage
    totalMap.value[categoryCode] = pageRes.data?.total || totalMap.value[categoryCode] || 0
  } catch {
    // 加载失败，保持现有数据
  } finally {
    loadingMoreMap.value[categoryCode] = false
  }
}

/** 是否还有更多 */
function hasMore(categoryCode: string): boolean {
  const current = (newsMap.value[categoryCode] || []).length
  const total = totalMap.value[categoryCode] || 0
  return current < total
}

const newsSections = computed(() =>
  categories.value
    .filter((c) => c.code !== 'ALL')
    .map((c) => ({
      key: c.name,
      code: c.code,
      value: newsMap.value[c.code] || [],
    })),
)
const loading = ref(false)
const isNoNews = computed(() => newsSections.value.every((s) => s.value.length === 0))
const goToNewsDetail = (newsNo: string) => {
  router.push(`/news/${newsNo}`)
}

const goToNewsList = () => {
  router.push('/news')
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="news-page">
    <div class="news-page__banner">
      <div class="news-page__banner-gradient" />
      <div class="news-page__banner-bg">
        <img src="@/assets/news-hero.png" alt="banner" class="news-page__banner-img" />
      </div>
      <div class="news-page__content">
        <div class="news-page__breadcrumb">
          <span class="news-page__breadcrumb-link" @click="goToNewsList">{{ $t('news.breadcrumb1') }}</span>
          <span>/</span>
          <span class="news-page__breadcrumb-current">{{ $t('news.breadcrumb2') }}</span>
        </div>
      </div>
    </div>
    <div class="no-news" v-if="isNoNews || loading">
      {{ loading ? '加载中...' : '暂无新闻' }}
    </div>
    <template v-for="section in newsSections" :key="section.key">
      <div class="news-page__section" v-if="section.value.length > 0">
        <div class="news-page__heading">
          <div class="news-page__heading-bar" />
          <h2 class="news-page__heading-text">{{ section.key }}</h2>
        </div>

        <div class="news-page__grid">
          <div v-for="item in section.value" :key="item.newsNo" class="news-page__card"
            @click="goToNewsDetail(item.newsNo)">
            <div class="news-page__card-image">
              <img :src="item.image" :alt="item.title" class="news-page__card-img" />
            </div>
            <div class="news-page__card-body">
              <div class="news-page__card-meta">
                <span class="news-page__card-tag">{{ item.category }}</span>
                <span class="news-page__card-date">{{ item.date }}</span>
              </div>
              <h3 class="news-page__card-title">{{ item.title }}</h3>
            </div>
          </div>
        </div>

        <div v-if="hasMore(section.code)" class="news-page__load-more-wrap">
          <button class="news-page__load-more" @click="loadMore(section.code)" :disabled="loadingMoreMap[section.code]">
            <span>{{ loadingMoreMap[section.code] ? '加载中...' : $t('news.loadMore') }}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.news-page {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-brand: #0163FF;
  --color-brand-dark: #0264FF;
  --color-tag-bg: #E5F0FF;
  --color-text-heading: #181C20;
  --font-body: 'PingFang SC', 'Noto Sans SC', sans-serif;
  --shadow-card: 0 0 1.8125rem 0 rgba(148, 148, 148, 0.22);
  --shadow-btn: 0 0.5625rem 0.625rem 0 rgba(1, 94, 255, 0.14);
  --card-width: 30.75rem;
  --card-height: 38.25rem;
  --card-image-height: 22.5rem;
  --card-radius: 1.875rem;

  background: var(--color-white);
  margin-bottom: 6.25rem;
}

.no-news {
  text-align: center;
  padding: 10rem 0;
  color: var(--color-text-muted);
  font-size: 1.25rem;
}

/* ========== Banner ========== */
.news-page__banner {
  position: relative;
  width: 100%;
  height: 35rem;
  overflow: hidden;
}

.news-page__banner-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #EFF6FF 0%, #BBD4F3 100%);
  z-index: 0;
}

.news-page__banner-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.news-page__banner-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* ========== Breadcrumb ========== */
.news-page__content {
  max-width: 120rem;
  margin: 0 auto;
  position: relative;
}

.news-page__breadcrumb {
  position: absolute;
  top: 8.875rem;
  left: 10rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: -0.0536em;
  color: #FFFFFF;
}

.news-page__breadcrumb-link {
  cursor: pointer;
  transition: color 0.2s;
}

.news-page__breadcrumb-link:hover {
  color: var(--color-brand);
}

.news-page__breadcrumb-current {
  color: var(--color-text-muted);
}

/* ========== Section ========== */
.news-page__section {
  padding: 0 10rem;
  margin-top: 6.25rem;
}

/* ========== Heading ========== */
.news-page__heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 5rem;
}

.news-page__heading-bar {
  width: 0.3125rem;
  height: 2.25rem;
  background: var(--color-brand);
  flex-shrink: 0;
}

.news-page__heading-text {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 2.25rem;
  color: var(--color-text-heading);
}

/* ========== Card Grid ========== */
.news-page__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3.25rem;
  justify-content: flex-start;
}

/* ========== Card ========== */
.news-page__card {
  width: var(--card-width);
  height: var(--card-height);
  background: var(--color-white);
  border-radius: var(--card-radius);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;
}

.news-page__card:hover {
  box-shadow: 0 0.5rem 1.875rem rgba(0, 0, 0, 0.12);
  transform: translateY(-0.125rem);
}

.news-page__card-image {
  width: var(--card-width);
  height: var(--card-image-height);
  overflow: hidden;
}

.news-page__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-page__card-body {
  position: relative;
  padding: 3.125rem 3.125rem 0;
}

.news-page__card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.news-page__card-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0.625rem 0.75rem;
  background: var(--color-tag-bg);
  border-radius: 3.125rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-brand);
  margin-left: 0.0625rem;
}

.news-page__card-date {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-black);
}

.news-page__card-decor {
  width: 0.1875rem;
  height: 1.125rem;
  background: var(--color-black);
  margin-top: 0.3125rem;
}

.news-page__card-title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.625rem;
  line-height: 2.75rem;
  color: var(--color-black);
  max-width: 24.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ========== Load More ========== */
.news-page__load-more-wrap {
  display: flex;
  justify-content: center;
  margin-top: 3.25rem;
}

.news-page__load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 13.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-brand-dark);
  border: none;
  border-radius: 2.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.news-page__load-more:hover {
  background: #0052d4;
}

.news-page__load-more:disabled {
  background: #99B8FF;
  cursor: not-allowed;
}

.news-page__load-more span {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-white);
  text-align: center;
}
</style>