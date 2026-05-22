<script setup lang="ts">
import { useRouter } from 'vue-router'
import news1 from '@/assets/news-1.png'
import news2 from '@/assets/news-2.png'
import news3 from '@/assets/news-3.png'
import news4 from '@/assets/news-4.png'
import banner1 from '@/assets/banner-1.png'

const router = useRouter()

interface NewsItem {
  id: number
  title: string
  date: string
  category: string
  image: string
}

const corporateNews: NewsItem[] = [
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
    title: '喜报  神络医疗植入式可充电脊髓神经刺激器获批上市',
    date: '2026.03.14',
    category: '企业动态',
    image: news3,
  },
  {
    id: 4,
    title: '重磅招商 | 神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴',
    date: '2026.03.14',
    category: '企业动态',
    image: news4,
  },
  {
    id: 5,
    title: '首发  神络医疗完成数亿元C轮融资，构筑"神经调控+脑机接口"...',
    date: '2026.03.14',
    category: '企业动态',
    image: news1,
  },
  {
    id: 6,
    title: '喜报  神络医疗植入式可充电脊髓神经刺激器获批上市',
    date: '2026.03.14',
    category: '企业动态',
    image: news2,
  },
]

const healthNews: NewsItem[] = [
  {
    id: 7,
    title: '重磅招商 | 神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴',
    date: '2026.03.14',
    category: '疾病科普',
    image: news3,
  },
  {
    id: 8,
    title: '首发  神络医疗完成数亿元C轮融资，构筑"神经调控+脑机接口"...',
    date: '2026.03.14',
    category: '疾病科普',
    image: news4,
  },
  {
    id: 9,
    title: '喜报  神络医疗植入式可充电脊髓神经刺激器获批上市',
    date: '2026.03.14',
    category: '疾病科普',
    image: news1,
  },
  {
    id: 10,
    title: '重磅招商 | 神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴',
    date: '2026.03.14',
    category: '疾病科普',
    image: news2,
  },
  {
    id: 11,
    title: '首发  神络医疗完成数亿元C轮融资，构筑"神经调控+脑机接口"...',
    date: '2026.03.14',
    category: '疾病科普',
    image: news3,
  },
  {
    id: 12,
    title: '喜报  神络医疗植入式可充电脊髓神经刺激器获批上市',
    date: '2026.03.14',
    category: '疾病科普',
    image: news4,
  },
]

const goToNewsDetail = (id: number) => {
  router.push(`/news/${id}`)
}

const goToNewsList = () => {
  router.push('/news')
}
</script>

<template>
  <div class="news-page">
    <div class="news-page__banner">
      <div class="news-page__banner-gradient" />
      <div class="news-page__banner-bg">
        <img :src="banner1" alt="banner" class="news-page__banner-img" />
      </div>
      <div class="news-page__breadcrumb">
        <span class="news-page__breadcrumb-link" @click="goToNewsList">资讯</span>
        <span>/</span>
        <span class="news-page__breadcrumb-current">文章详情</span>
      </div>
    </div>

    <div class="news-page__section">
      <div class="news-page__heading">
        <div class="news-page__heading-bar" />
        <h2 class="news-page__heading-text">企业动态</h2>
      </div>

      <div class="news-page__grid">
        <div
          v-for="item in corporateNews"
          :key="item.id"
          class="news-page__card"
          @click="goToNewsDetail(item.id)"
        >
          <div class="news-page__card-image">
            <img :src="item.image" :alt="item.title" class="news-page__card-img" />
          </div>
          <div class="news-page__card-body">
            <div class="news-page__card-meta">
              <span class="news-page__card-tag">{{ item.category }}</span>
              <span class="news-page__card-date">{{ item.date }}</span>
            </div>
            <div class="news-page__card-decor" />
            <h3 class="news-page__card-title">{{ item.title }}</h3>
          </div>
        </div>
      </div>

      <div class="news-page__load-more-wrap">
        <button class="news-page__load-more">
          <span>加载更多</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="news-page__section">
      <div class="news-page__heading">
        <div class="news-page__heading-bar" />
        <h2 class="news-page__heading-text">疾病知识与科普教育</h2>
      </div>

      <div class="news-page__grid">
        <div
          v-for="item in healthNews"
          :key="item.id"
          class="news-page__card"
          @click="goToNewsDetail(item.id)"
        >
          <div class="news-page__card-image">
            <img :src="item.image" :alt="item.title" class="news-page__card-img" />
          </div>
          <div class="news-page__card-body">
            <div class="news-page__card-meta">
              <span class="news-page__card-tag">{{ item.category }}</span>
              <span class="news-page__card-date">{{ item.date }}</span>
            </div>
            <div class="news-page__card-decor" />
            <h3 class="news-page__card-title">{{ item.title }}</h3>
          </div>
        </div>
      </div>

      <div class="news-page__load-more-wrap">
        <button class="news-page__load-more">
          <span>加载更多</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
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
  --shadow-card: 0px 0px 29px 0px rgba(148, 148, 148, 0.22);
  --shadow-btn: 0px 9px 10px 0px rgba(1, 94, 255, 0.14);
  --card-width: 492px;
  --card-height: 612px;
  --card-image-height: 360px;
  --card-radius: 30px;

  background: var(--color-white);
}

/* ========== Banner ========== */
.news-page__banner {
  position: relative;
  width: 100%;
  height: 560px;
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
.news-page__breadcrumb {
  position: absolute;
  top: 142px;
  left: 160px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
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
  padding: 0 160px;
  margin-top: 100px;
}

/* ========== Heading ========== */
.news-page__heading {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}
.news-page__heading-bar {
  width: 5px;
  height: 36px;
  background: var(--color-brand);
  flex-shrink: 0;
}
.news-page__heading-text {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 36px;
  line-height: 36px;
  color: var(--color-text-heading);
}

/* ========== Card Grid ========== */
.news-page__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 52px;
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
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
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
  padding: 50px 50px 0;
}

.news-page__card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.news-page__card-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 10px 12px;
  background: var(--color-tag-bg);
  border-radius: 50px;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-brand);
}

.news-page__card-date {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-black);
}

.news-page__card-decor {
  width: 3px;
  height: 18px;
  background: var(--color-black);
  margin-top: 5px;
}

.news-page__card-title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 26px;
  line-height: 44px;
  color: var(--color-black);
  max-width: 392px;
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
  margin-top: 64px;
}
.news-page__load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 220px;
  padding: 12px 24px;
  background: var(--color-brand-dark);
  border: none;
  border-radius: 46px;
  cursor: pointer;
  transition: background 0.2s;
}
.news-page__load-more:hover {
  background: #0052d4;
}
.news-page__load-more span {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-white);
  text-align: center;
}
</style>