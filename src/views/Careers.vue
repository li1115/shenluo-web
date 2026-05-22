<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Job {
  id: number
  title: string
  urgent: boolean
  location: string
  type: string
  education: string
  tags: string[]
}

interface JobCategory {
  id: number
  name: string
}

const categories = ref<JobCategory[]>([
  { id: 1, name: '全部' },
  { id: 2, name: '博士后工作站' },
  { id: 3, name: '销售类' },
  { id: 4, name: '技术类' },
  { id: 5, name: '医学类' },
  { id: 6, name: '采购类' },
  { id: 7, name: '质量类' },
  { id: 8, name: '市场类' },
  { id: 9, name: '职能类' },
  { id: 10, name: '最新职位' },
])

const activeCategory = ref<number>(1)

const jobs = ref<Job[]>([
  { id: 1, title: '数字芯片设计工程师', urgent: true, location: '杭州 · 余杭区', type: '全职', education: '博士', tags: ['芯片设计', '脑机接口', '神经调控'] },
  { id: 2, title: '前端开发工程师', urgent: false, location: '杭州 · 余杭区', type: '全职', education: '硕士', tags: ['芯片设计', '脑机接口', '神经调控'] },
  { id: 3, title: '高级嵌入式软件工程师', urgent: true, location: '杭州 · 余杭区', type: '全职', education: '博士', tags: ['芯片设计', '脑机接口', '神经调控'] },
  { id: 4, title: '数字芯片设计工程师', urgent: true, location: '杭州 · 余杭区', type: '全职', education: '博士', tags: ['芯片设计', '脑机接口', '神经调控'] },
  { id: 5, title: '数字芯片设计工程师', urgent: false, location: '杭州 · 余杭区', type: '全职', education: '博士', tags: ['芯片设计', '脑机接口', '神经调控'] },
  { id: 6, title: '数字芯片设计工程师', urgent: true, location: '杭州 · 余杭区', type: '全职', education: '博士', tags: ['芯片设计', '脑机接口', '神经调控'] },
  { id: 7, title: '数字芯片设计工程师', urgent: false, location: '杭州 · 余杭区', type: '全职', education: '博士', tags: ['芯片设计', '脑机接口', '神经调控'] },
])

const totalJobs = ref(63)
const currentPage = ref(1)
const totalPages = ref(8)

const selectCategory = (id: number) => {
  activeCategory.value = id
}

const router = useRouter()

const viewJobDetail = (id: number) => {
  router.push(`/careers/${id}`)
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="careers">
    <section class="careers__hero">
      <div class="careers__hero-bg" />
      <div class="careers__hero-gradient" />
      <div class="careers__hero-content">
        <div class="careers__breadcrumb">
          <span class="careers__breadcrumb-item">关于我们</span>
          <span class="careers__breadcrumb-sep">/</span>
          <span class="careers__breadcrumb-item">招聘</span>
        </div>
        <div class="careers__hero-badge">
          <span class="careers__hero-badge-text">Join Our Mission</span>
        </div>
        <h1 class="careers__hero-title">加入神络<br />共创未来</h1>
        <p class="careers__hero-subtitle">
          在医疗科技的前沿，我们寻找富有激情的创新者。通过精密工程与关怀技术，重新定义生命品质。
        </p>
      </div>
    </section>

    <section class="careers__content">
      <div class="careers__main">
        <div class="careers__heading">
          <div class="careers__heading-title-wrap">
            <h2 class="careers__heading-title">招聘职位</h2>
            <span class="careers__heading-count">{{ totalJobs }}</span>
          </div>
        </div>

        <div class="careers__tabs">
          <button
            v-for="cat in categories"
            :key="cat.id"
            :class="['careers__tab', { 'careers__tab--active': activeCategory === cat.id }]"
            @click="selectCategory(cat.id)"
          >
            {{ cat.name }}
          </button>
        </div>

        <div class="careers__job-list">
          <div v-for="job in jobs" :key="job.id" class="careers__job-card">
            <div class="careers__job-top">
              <div class="careers__job-info">
                <div class="careers__job-title-row">
                  <h3 class="careers__job-title">{{ job.title }}</h3>
                  <span v-if="job.urgent" class="careers__job-urgent">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1.33L2.67 13.33H13.33L8 1.33Z" fill="#862300" />
                    </svg>
                    急
                  </span>
                </div>
                <div class="careers__job-meta">
                  <span class="careers__job-meta-item">
                    <svg width="12" height="15" viewBox="0 0 12 15" fill="none">
                      <path d="M6 0C3.1 0 0.75 2.35 0.75 5.25C0.75 9 6 15 6 15S11.25 9 11.25 5.25C11.25 2.35 8.9 0 6 0ZM6 7.5C4.95 7.5 4.1 6.65 4.1 5.6C4.1 4.55 4.95 3.7 6 3.7C7.05 3.7 7.9 4.55 7.9 5.6C7.9 6.65 7.05 7.5 6 7.5Z" fill="#64748B" />
                    </svg>
                    {{ job.location }}
                  </span>
                  <span class="careers__job-meta-item">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M2.5 0H12.5C13.88 0 15 1.12 15 2.5V12.5C15 13.88 13.88 15 12.5 15H2.5C1.12 15 0 13.88 0 12.5V2.5C0 1.12 1.12 0 2.5 0ZM12.5 13.75C13.19 13.75 13.75 13.19 13.75 12.5V2.5C13.75 1.81 13.19 1.25 12.5 1.25H2.5C1.81 1.25 1.25 1.81 1.25 2.5V12.5C1.25 13.19 1.81 13.75 2.5 13.75H12.5Z" fill="#64748B" />
                      <path d="M3.75 4.38H6.25V6.88H3.75V4.38Z" fill="#64748B" />
                      <path d="M8.75 4.38H11.25V6.88H8.75V4.38Z" fill="#64748B" />
                      <path d="M3.75 8.13H6.25V10.63H3.75V8.13Z" fill="#64748B" />
                      <path d="M8.75 8.13H11.25V10.63H8.75V8.13Z" fill="#64748B" />
                    </svg>
                    {{ job.type }}
                  </span>
                  <span class="careers__job-meta-item">
                    <svg width="17" height="14" viewBox="0 0 17 14" fill="none">
                      <path d="M8.5 0L2.35 3.5V5.25L8.5 1.75L14.65 5.25V3.5L8.5 0Z" fill="#64748B" />
                      <path d="M2.35 6.13L8.5 2.63L14.65 6.13V7.88L8.5 4.38L2.35 7.88V6.13Z" fill="#64748B" />
                      <path d="M2.35 9.63L8.5 6.13L14.65 9.63V11.38L8.5 7.88L2.35 11.38V9.63Z" fill="#64748B" />
                      <rect x="0" y="11" width="17" height="3" rx="1" fill="#64748B" opacity="0.3" />
                    </svg>
                    {{ job.education }}
                  </span>
                </div>
              </div>
            </div>
            <div class="careers__job-bottom">
              <div class="careers__job-tags">
                <span v-for="tag in job.tags" :key="tag" class="careers__job-tag">{{ tag }}</span>
              </div>
              <button class="careers__job-apply" @click="viewJobDetail(job.id)">
                申请职位
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="#0163FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="careers__pagination">
          <button class="careers__page-btn careers__page-btn--nav" @click="goToPage(currentPage - 1)">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M7 1L2 6L7 11" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            v-for="page in [1, 2, 3]"
            :key="page"
            :class="['careers__page-btn', { 'careers__page-btn--active': currentPage === page }]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <span class="careers__page-ellipsis">...</span>
          <button
            :class="['careers__page-btn', { 'careers__page-btn--active': currentPage === 8 }]"
            @click="goToPage(8)"
          >
            8
          </button>
          <button class="careers__page-btn careers__page-btn--nav" @click="goToPage(currentPage + 1)">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <aside class="careers__sidebar">
        <div class="careers__sidebar-card careers__sidebar-card--primary">
          <div class="careers__sidebar-blur" />
          <h3 class="careers__sidebar-heading careers__sidebar-heading--white">博士后工作站</h3>
          <p class="careers__sidebar-desc careers__sidebar-desc--light">
            Aura MedTech 现已设立省级博士后创新实践基地，诚邀全球神经科学与工程领域顶尖博士人才加入。
          </p>
          <button class="careers__sidebar-link careers__sidebar-link--white">
            了解申请详情
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="#0163FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div class="careers__sidebar-card careers__sidebar-card--secondary">
          <div class="careers__sidebar-blur" />
          <h3 class="careers__sidebar-heading careers__sidebar-heading--dark">销售</h3>
          <p class="careers__sidebar-desc careers__sidebar-desc--muted">
            Aura MedTech 现已设立省级博士后创新实践基地，诚邀全球神经科学与工程领域顶尖博士人才加入。
          </p>
          <button class="careers__sidebar-link careers__sidebar-link--blue">
            了解申请详情
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped>
.careers {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-brand: #0163FF;
  --color-text-heading: #181C20;
  --color-text-meta: #64748B;
  --color-tag-bg: #EBEEF3;
  --color-tag-text: #475569;
  --color-border: #F8FAFC;
  --color-border-light: #F1F5F9;
  --color-urgent-bg: #FFDBD1;
  --color-urgent-text: #862300;
  --color-hero-start: rgba(0, 67, 203, 1);
  --color-hero-mid: rgba(0, 67, 203, 0.8);
  --color-hero-end: rgba(0, 67, 203, 0);
  --font-body: 'PingFang SC', 'Noto Sans SC', sans-serif;
  --font-heading: 'Inter', 'PingFang SC', sans-serif;
}

/* ========== Hero Section ========== */
.careers__hero {
  position: relative;
  width: 100%;
  height: 560px;
  overflow: hidden;
}

.careers__hero-bg {
  position: absolute;
  inset: 0;
  background: url('@/assets/recruitment-bg.png') center / cover no-repeat;
  opacity: 0.4;
}

.careers__hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--color-hero-start) 0%, var(--color-hero-mid) 50%, var(--color-hero-end) 100%);
}

.careers__hero-content {
  position: relative;
  height: 100%;
  max-width: 1536px;
  margin: 0 auto;
  padding: 142px 32px 0;
  display: flex;
  flex-direction: column;
}

/* ========== Breadcrumb ========== */
.careers__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 48px;
}

.careers__breadcrumb-item {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.0536em;
  color: var(--color-white);
}

.careers__breadcrumb-sep {
  color: var(--color-white);
}

.careers__hero-badge {
  display: inline-flex;
  align-items: center;
  background: #98ADFF;
  border-radius: 12px;
  margin-bottom: 20px;
  width: fit-content;
}

.careers__hero-badge-text {
  padding: 4px 12px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #273E88;
}

.careers__hero-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 72px;
  line-height: 72px;
  letter-spacing: -0.05em;
  color: var(--color-white);
  margin-bottom: 24px;
}

.careers__hero-subtitle {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 20px;
  line-height: 32.5px;
  color: rgba(219, 234, 254, 0.8);
  max-width: 500px;
}

/* ========== Content Section ========== */
.careers__content {
  display: flex;
  gap: 48px;
  max-width: 1536px;
  margin: 0 auto;
  padding: 80px 32px;
}

.careers__main {
  flex: 1;
  min-width: 0;
}

/* ========== Heading ========== */
.careers__heading {
  margin-bottom: 10px;
}

.careers__heading-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.careers__heading-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-text-heading);
}

.careers__heading-count {
  font-family: 'DIN Black', 'DIN', sans-serif;
  font-weight: 900;
  font-size: 22px;
  line-height: 28px;
  color: var(--color-brand);
}

/* ========== Category Tabs ========== */
.careers__tabs {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  flex-wrap: wrap;
}

.careers__tab {
  padding: 6px 12px;
  border-radius: 4px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: var(--color-brand);
  background: var(--color-white);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.careers__tab--active {
  background: var(--color-brand);
  color: var(--color-white);
}

/* ========== Job List ========== */
.careers__job-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.careers__job-card {
  background: var(--color-white);
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.careers__job-top {
  display: flex;
  justify-content: space-between;
}

.careers__job-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.careers__job-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.careers__job-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--color-text-heading);
}

.careers__job-urgent {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px 6px;
  height: 20px;
  background: var(--color-urgent-bg);
  border-radius: 12px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-urgent-text);
}

.careers__job-meta {
  display: flex;
  align-items: center;
  gap: 24px;
}

.careers__job-meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-text-meta);
}

/* ========== Job Card Bottom ========== */
.careers__job-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.careers__job-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}

.careers__job-tag {
  padding: 4px 12px;
  background: var(--color-tag-bg);
  border-radius: 4px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-tag-text);
}

.careers__job-apply {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: none;
  background: none;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-brand);
  cursor: pointer;
  transition: opacity 0.2s;
}

.careers__job-apply:hover {
  opacity: 0.8;
}

/* ========== Pagination ========== */
.careers__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding-top: 32px;
}

.careers__page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--color-border-light);
  background: var(--color-white);
  cursor: pointer;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-tag-text);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.careers__page-btn--nav {
  border: 1px solid var(--color-border-light);
}

.careers__page-btn--active {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: var(--color-white);
  box-shadow: 0px 2px 4px -2px rgba(0, 67, 203, 0.2), 0px 4px 6px -1px rgba(0, 67, 203, 0.2);
}

.careers__page-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #94A3B8;
}

/* ========== Sidebar ========== */
.careers__sidebar {
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex-shrink: 0;
}

.careers__sidebar-card {
  position: relative;
  overflow: hidden;
}

.careers__sidebar-card--primary {
  background: var(--color-brand);
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 14.8px;
}

.careers__sidebar-card--secondary {
  background: var(--color-white);
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
}

.careers__sidebar-blur {
  position: absolute;
  width: 192px;
  height: 192px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(64px);
  top: -48px;
  right: 0;
  pointer-events: none;
}

.careers__sidebar-heading {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
}

.careers__sidebar-heading--white {
  color: var(--color-white);
}

.careers__sidebar-heading--dark {
  color: var(--color-black);
}

.careers__sidebar-desc {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 22.75px;
  max-width: 256px;
  padding-bottom: 9.2px;
}

.careers__sidebar-desc--light {
  color: #DCE1FF;
}

.careers__sidebar-desc--muted {
  color: #999999;
}

.careers__sidebar-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  transition: opacity 0.2s;
  width: fit-content;
}

.careers__sidebar-link--white {
  background: var(--color-white);
  color: var(--color-brand);
}

.careers__sidebar-link--blue {
  background: #0264FF;
  color: var(--color-white);
}

.careers__sidebar-link:hover {
  opacity: 0.85;
}
</style>