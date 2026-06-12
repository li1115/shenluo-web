<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNewsDetail, getNewsRelated } from '@/api/news'
import type { PublicNewsDetail, PublicNewsItem } from '@/api/types'
import { formatDate } from '@/shared/utils/formatDate'
const route = useRoute()
const router = useRouter()

interface RelatedArticle {
  newsNo: string
  title: string
  date: string
  category: string
  image: string
}

interface ArticleDetail {
  newsNo: string
  title: string
  date: string
  category: string
  content: string
}

/** API 新闻详情 → 页面展示字段映射 */
function mapDetailToArticle(detail: PublicNewsDetail, contentHtml: string): ArticleDetail {
  return {
    newsNo: detail.newsNo,
    title: detail.title,
    date: detail.displayDate,
    category: detail.category?.name || '',
    content: contentHtml,
  }
}

/** API 相关新闻 → 页面展示字段映射 */
function mapRelatedItem(item: PublicNewsItem): RelatedArticle {
  return {
    newsNo: item.newsNo,
    title: item.title,
    date: formatDate(item.displayDate),
    category: item.categoryName,
    image: item.coverUrl,
  }
}

const article = ref<ArticleDetail | null>(null)
const relatedArticles = ref<RelatedArticle[]>([])

const loading = ref(true)

const fetchArticle = async (newsNo: string) => {
  loading.value = true
  article.value = null
  relatedArticles.value = []
  try {
    const [detailRes, relatedRes] = await Promise.allSettled([
      getNewsDetail(newsNo),
      getNewsRelated(newsNo, 5),
    ])

    if (detailRes.status === 'fulfilled') {
      const detail = detailRes.value.data
      let contentHtml = ''
      if (detail.contentUrl) {
        try {
          const resp = await fetch(detail.contentUrl)
          contentHtml = await resp.text()
        } catch {
          contentHtml = ''
        }
      }
      article.value = { ...mapDetailToArticle(detail, contentHtml) }
    }
    if (relatedRes.status === 'fulfilled') {
      const related = (relatedRes.value.data || []).map(mapRelatedItem)
      relatedArticles.value = related
    }
    loading.value = false
  } finally {
    loading.value = false
    // 测试用
    // article.value = {...mockArticles}
    // relatedArticles.value = [...mockRelatedArticles]
  }
}

const loadNews = () => {
  loading.value = true
  const newsNo = (route.params.newsNo as string) || ''
  if (newsNo) {
    fetchArticle(newsNo)
  } else {
    loading.value = false
  }
}
watch(() => route.params.newsNo, () => {
  loadNews()
})

onMounted(() => {
  loadNews()
})

const goToNews = () => {
  router.push('/news')
}

const goToArticle = (newsNo: string) => {
  router.push(`/news/${newsNo}`)
}
</script>

<template>
  <div class="news-detail">
    <div class="news-detail__banner">
      <div class="news-detail__banner-gradient" />
      <div class="news-detail__banner-bg">
        <img src="@/assets/news-hero.png" alt="banner" class="news-detail__banner-img" />
      </div>
      <div class="news-detail__breadcrumb">
        <span class="news-detail__breadcrumb-link" @click="goToNews">{{ $t('news.detail.breadcrumb1') }}</span>
        <span>/</span>
        <span class="news-detail__breadcrumb-current">{{ $t('news.detail.breadcrumb2') }}</span>
      </div>
    </div>

    <div class="news-detail__body" v-if="article">
      <div class="news-detail__main">
        <div class="news-detail__header">
          <h1 class="news-detail__title">{{ article.title }}</h1>
          <!-- <p class="news-detail__desc">{{ article.description }}</p> -->
        </div>
        <div class="news-detail__content" v-html="article.content" />
      </div>

      <aside class="news-detail__sidebar">
        <div class="news-detail__sidebar-heading">
          <div class="news-detail__sidebar-bar" />
          <h3 class="news-detail__sidebar-heading-text">{{ $t('news.detail.relatedNews') }}</h3>
        </div>
        <div class="news-detail__sidebar-list" v-show="relatedArticles.length > 0">
          <div v-for="item in relatedArticles" :key="item.newsNo" class="news-detail__sidebar-article"
            @click="goToArticle(item.newsNo)">
            <div class="news-detail__sidebar-cover">
              <img :src="item.image" :alt="item.title" class="news-detail__sidebar-img" />
            </div>
            <div class="news-detail__sidebar-text">
              <span class="news-detail__sidebar-tag">{{ item.category }}</span>
              <h4 class="news-detail__sidebar-title">{{ item.title }}</h4>
              <span class="news-detail__sidebar-date">{{ item.date }}</span>
            </div>
          </div>
        </div>
        <div v-show="relatedArticles.length === 0" class="news-detail__sidebar-no-data">
          <span class="news-detail__sidebar-no-data">{{ $t('news.detail.noRelatedNews') }}</span>
        </div>
      </aside>
    </div>

    <div v-if="loading" class="news-detail__loading">{{ $t('news.detail.loading') }}</div>
    <div v-if="!loading && !article" class="news-detail__empty">{{ $t('news.detail.empty') }}</div>
  </div>
</template>

<style scoped lang="less">
.news-detail {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-brand: #0163FF;
  --color-text-heading: #181C20;
  --color-text-title: #222222;
  --color-text-body: rgba(24, 28, 32, 0.9);
  --color-bg-banner-start: rgba(239, 246, 255, 1);
  --color-bg-banner-end: rgba(187, 212, 243, 1);
  --color-image-card-bg: rgba(255, 255, 255, 0);
  --font-body: 'PingFang SC', 'Noto Sans SC', sans-serif;
  --font-sidebar-heading: 'Manrope', 'PingFang SC', sans-serif;
  --content-left: 11.25rem;
  --content-width: 60.5rem;
  --sidebar-width: 24rem;
  --sidebar-x: 84.75rem;
  --page-width: 120rem;

  background: var(--color-white);
}

/* ========== Banner ========== */
.news-detail__banner {
  position: relative;
  width: 100%;
  height: 35rem;
  overflow: hidden;
}

.news-detail__banner-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--color-bg-banner-start) 0%, var(--color-bg-banner-end) 100%);
  z-index: 0;
}

.news-detail__banner-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.news-detail__banner-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* ========== Breadcrumb ========== */
.news-detail__breadcrumb {
  position: relative;
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
  max-width: var(--page-width);
  margin: 0 auto;
  margin-top: 8.875rem;
  padding-left: 10rem;
}

.news-detail__breadcrumb-link {
  cursor: pointer;
  transition: color 0.2s;
}

.news-detail__breadcrumb-link:hover {
  color: var(--color-brand);
}

.news-detail__breadcrumb-current {
  color: var(--color-text-muted);
}

/* ========== Body Layout ========== */
.news-detail__body {
  display: flex;
  padding: 0 var(--content-left);
  gap: 13rem;
  max-width: var(--page-width);
  margin: 0 auto 5rem;
}

/* ========== Main Content Area ========== */
.news-detail__main {
  width: var(--content-width);
  flex-shrink: 0;
}

/* ========== Header ========== */
.news-detail__header {
  padding-top: 5rem;
}

.news-detail__title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 3rem;
  color: var(--color-text-title);
  margin-bottom: 3.875rem;
  text-align: center;
  white-space: pre-line;
}

/* ========== Description ========== */
/* .news-detail__desc {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  line-height: 2rem;
  color: var(--color-text-body);
  white-space: pre-line;
  margin-bottom: 2.625rem;
} */

/* ========== Rich Text Content ========== */
/* 还原被 Tailwind preflight 覆盖的富文本语义样式 */
.news-detail__content {
  :deep(*) {
    all: revert; // 重置外部样式影响
    font-family: inherit;
    color: inherit;
  }

  // 再按需定义文章内元素的样式
  :deep(img) {
    max-width: 100%;
  }

  :deep(p) {
    margin-bottom: 1rem;
    line-height: 1.8;
  }
}

/* ========== Sidebar ========== */
.news-detail__sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  padding-top: 6.125rem;
}

.news-detail__sidebar-heading {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.news-detail__sidebar-bar {
  width: 0.25rem;
  height: 2rem;
  background: var(--color-brand);
  flex-shrink: 0;
}

.news-detail__sidebar-heading-text {
  font-family: var(--font-sidebar-heading);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
  color: var(--color-text-heading);
}

.news-detail__sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .news-detail__sidebar-article:hover {
    .news-detail__sidebar-title {
      color: var(--color-brand);
    }
  }
}

.news-detail__sidebar-no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 25rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  color: var(--color-text-muted);
}



.news-detail__sidebar-article {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.news-detail__sidebar-article:hover {
  opacity: 0.8;
}

.news-detail__sidebar-cover {
  width: 24rem;
  height: 17.5rem;
  overflow: hidden;
}

.news-detail__sidebar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-detail__sidebar-text {
  display: flex;
  flex-direction: column;
  gap: 0.4375rem;
}

.news-detail__sidebar-tag {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-brand);
}

.news-detail__sidebar-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.5469rem;
  color: var(--color-text-heading);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-detail__sidebar-date {
  font-family: 'Inter', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-text-heading);
}

/* ========== States ========== */
.news-detail__loading,
.news-detail__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 25rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  color: var(--color-text-muted);
}
</style>