<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNewsDetail, getNewsRelated } from '@/api/news'
import type { PublicNewsDetail, PublicNewsItem } from '@/api/types'

// ====== 模拟数据（已注释，保留备用） ======
import news1 from '@/assets/news-1.png'
import news2 from '@/assets/news-2.png'
import news3 from '@/assets/news-3.png'
import news4 from '@/assets/news-4.png'

 const mockArticles: ArticleDetail = 
    {
      newsNo: '1',
      title: '喜报  神络医疗植入式可充电脊髓神经刺激器获批上市。',
      date: '2026.03.14',
      category: '企业动态',
      content: `
        '在国家政策和智慧医院建设指引的要求下，在信息深度共享和业务深度协同的基础上，我们广泛应用云、大、物、移、智等新兴技术，围绕以"患者为中心，医护为核心"的服务理念；"自顶向下"的设计理念；"整体规划、急用先行、分步实施"的设计原则，打造"一大信息平台、三大数据中心、五大核心技术、六大解决方案，面向健康服务的智慧医院"。\n智慧医院是数字化医院建设的更高阶段，具有较高的信息化综合应用和智能化水平。智慧医院信息平台横向架构由六大解决方案围绕一大信息平台和三大数据中心组成',
        <h2>临床研究：数据驱动的精准决策</h2>
        <p>在大规模多中心临床试验中，Aura MedTech 的测序平台针对肺癌、胰腺癌等常见恶性肿瘤表现出了极高的灵敏度。通过对数以万计的血浆样本进行分析，研究团队成功构建了针对中国人基因特征的早筛模型。</p>
        <figure>
          <img src="${news1}" alt="自动化高通量测序平台" />
          <figcaption>图1：自动化高通量测序平台在临床样本处理中的实际应用</figcaption>
        </figure>
        <p>目前，基于该技术的筛查项目已在全国多家三甲医院展开试点，初步结果显示早期癌症的检出率提升了近35%，显著改善了患者的预后生存期。在国家政策和智慧医院建设指引的要求下，在信息深度共享和业务深度协同的基础上，我们广泛应用云、大、物、移、智等新兴技术，围绕以"患者为中心，医护为核心"的服务理念；"自顶向下"的设计理念；"整体规划、急用先行、分步实施"的设计原则，打造"一大信息平台、三大数据中心、五大核心技术、六大解决方案，面向健康服务的智慧医院"。</p>
        <p>智慧医院是数字化医院建设的更高阶段，具有较高的信息化综合应用和智能化水平。智慧医院信息平台横向架构由六大解决方案围绕一大信息平台和三大数据中心组成在国家政策和智慧医院建设指引的要求下，在信息深度共享和业务深度协同的基础上，我们广泛应用云、大、物、移、智等新兴技术。</p>
        <h2>临床研究：数据驱动的精准决策</h2>
        <p>在大规模多中心临床试验中，Aura MedTech 的测序平台针对肺癌、胰腺癌等常见恶性肿瘤表现出了极高的灵敏度。通过对数以万计的血浆样本进行分析，研究团队成功构建了针对中国人基因特征的早筛模型。</p>
        <figure>
          <img src="${news2}" alt="临床研究数据" />
          <figcaption>图2：临床研究中多组学数据的整合分析流程</figcaption>
        </figure>
        <p>目前，基于该技术的筛查项目已在全国多家三甲医院展开试点，初步结果显示早期癌症的检出率提升了近35%，显著改善了患者的预后生存期。在国家政策和智慧医院建设指引的要求下，在信息深度共享和业务深度协同的基础上，我们广泛应用云、大、物、移、智等新兴技术。</p>
        <p>智慧医院是数字化医院建设的更高阶段，具有较高的信息化综合应用和智能化水平。智慧医院信息平台横向架构由六大解决方案围绕一大信息平台和三大数据中心组成。在国家政策和智慧医院建设指引的要求下，在信息深度共享和业务深度协同的基础上，我们广泛应用云、大、物、移、智等新兴技术，围绕以"患者为中心，医护为核心"的服务理念；"自顶向下"的设计理念；"整体规划、急用先行、分步实施"的设计原则，打造"一大信息平台、三大数据中心、五大核心技术、六大解决方案，面向健康服务的智慧医院"。</p>
      `,
     
    }
const mockRelatedArticles = [
        {
          newsNo: '0',
          title: '神络医疗与上海华能intersil合作开发可充电脊髓神经刺激器',
          date: '2026.03.14',
          category: '企业动态',
          image: news1,
        },
        {
          newsNo: '1',
          title: '重磅招商 | 神络医疗植入式可充电脊髓神经刺激器诚邀合作伙伴',
          date: '2026.03.14',
          category: '企业动态',
          image: news1,
        },
        {
          newsNo: '2',
          title: '首发  神络医疗完成数亿元C轮融资，构筑"神经调控+脑机接口"...',
          date: '2026.03.14',
          category: '企业动态',
          image: news2,
        },
        {
          newsNo: '3',
          title: '喜报  神络医疗植入式可充电脊髓神经刺激器获批上市',
          date: '2026.03.14',
          category: '疾病科普',
          image: news3,
        },
        {
          newsNo: '4',
          title: '喜报  神络医疗博士后科研工作站获批成立',
          date: '2026.03.14',
          category: '疾病科普',
          image: news4,
        },
      ]
// ====== 模拟数据结束 ======

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
    date: item.displayDate,
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
      article.value = {...mapDetailToArticle(detail, contentHtml)}
    }
    if (relatedRes.status === 'fulfilled') {
      const related = (relatedRes.value.data || []).map(mapRelatedItem)
      relatedArticles.value = related
    }
    loading.value = false
  } finally {
    loading.value = false
    // 测试用
    article.value = {...mockArticles}
    relatedArticles.value = [...mockRelatedArticles]
  }
}

onMounted(() => {
  const newsNo = (route.params.newsNo as string) || ''
  if (newsNo) {
    fetchArticle(newsNo)
  } else {
    loading.value = false
  }
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
        <div class="news-detail__sidebar-list">
          <div
            v-for="item in relatedArticles"
            :key="item.newsNo"
            class="news-detail__sidebar-article"
            @click="goToArticle(item.newsNo)"
          >
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
      </aside>
    </div>

    <div v-if="loading" class="news-detail__loading">{{ $t('news.detail.loading') }}</div>
    <div v-if="!loading && !article" class="news-detail__empty">{{ $t('news.detail.empty') }}</div>
  </div>
</template>

<style scoped>
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
  --content-left: 180px;
  --content-width: 968px;
  --sidebar-width: 384px;
  --sidebar-x: 1356px;
  --page-width: 1920px;

  background: var(--color-white);
}

/* ========== Banner ========== */
.news-detail__banner {
  position: relative;
  width: 100%;
  height: 560px;
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
  gap: 208px;
}

/* ========== Main Content Area ========== */
.news-detail__main {
  width: var(--content-width);
  flex-shrink: 0;
}

/* ========== Header ========== */
.news-detail__header {
  padding-top: 80px;
}

.news-detail__title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 48px;
  color: var(--color-text-title);
  max-width: 704px;
  margin-left: 132px;
  margin-bottom: 62px;
  white-space: pre-line;
}
/* ========== Description ========== */
/* .news-detail__desc {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: var(--color-text-body);
  white-space: pre-line;
  margin-bottom: 42px;
} */

/* ========== Rich Text Content ========== */
.news-detail__content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-bottom: 100px;
}
.news-detail__content :deep(h2) {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 30px;
  line-height: 36px;
  color: var(--color-black);
  margin: 0;
}
.news-detail__content :deep(p) {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  color: var(--color-text-body);
  margin: 0;
}
.news-detail__content :deep(figure) {
  width: 768px;
  margin: 0;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.news-detail__content :deep(figure img) {
  display: block;
  width: 100%;
  height: 400px;
  object-fit: cover;
}
.news-detail__content :deep(figcaption) {
  padding: 16px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-text-heading);
  background: var(--color-white);
}

/* ========== Sidebar ========== */
.news-detail__sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  padding-top: 98px;
}

.news-detail__sidebar-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
}
.news-detail__sidebar-bar {
  width: 4px;
  height: 32px;
  background: var(--color-brand);
  flex-shrink: 0;
}
.news-detail__sidebar-heading-text {
  font-family: var(--font-sidebar-heading);
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-text-heading);
}

.news-detail__sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.news-detail__sidebar-article {
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.news-detail__sidebar-article:hover {
  opacity: 0.8;
}

.news-detail__sidebar-cover {
  width: 384px;
  height: 280px;
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
  gap: 7px;
}

.news-detail__sidebar-tag {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-brand);
}

.news-detail__sidebar-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 18px;
  line-height: 24.75px;
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
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-heading);
}

/* ========== States ========== */
.news-detail__loading,
.news-detail__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  color: var(--color-text-muted);
}
</style>