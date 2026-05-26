<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const activeCareer = ref<string>(router.currentRoute.value.query.job as string || 'academic')

interface Hero {
  id: string
  title: string
  subtitle: string
  tag: string
}
const heroList = computed(() => ({
  other: {
    id: 'other',
    tag: t('careers.joinTag'),
    title: t('careers.joinTitle.other'),
    subtitle: t('careers.joinSubtitle'),
  },
  sales: {
    id: 'sales',
    tag: t('careers.joinTag'),
    title: t('careers.joinTitle.sales'),
    subtitle: t('careers.joinSubtitle'),
  },
  academic: {
    id: 'academic',
    tag: t('careers.joinTag'),
    title: t('careers.joinTitle.academic'),
    subtitle: t('careers.joinSubtitle'),
  },
} as Record<string, Hero>))
const heroHero = computed(() => heroList.value[activeCareer.value])
// const heroInfo = computed(() => heroList[activeCareer.value])
const careers = computed(() => [{
  id: 'academic',
  name: t('careers.postdoctoral'),
  description: t('careers.postdoctoralDesc'),
}, {
  id: 'sales',
  name: t('careers.salesJobs'),
  description: t('careers.salesJobsDesc'),
}, {
  id: 'other',
  name: t('careers.other'),
  description: t('careers.otherDesc'),
}])

const showCareer = computed(() => careers.value.filter(c => c.id !== activeCareer.value))
interface Job {
  id: number
  title: string
  urgent: boolean
  location: string
  type: string
  education: string
  tags: string[]
}

const categories = computed(() => [
  { id: 1, name: t('careers.categories.all') },
  { id: 2, name: t('careers.categories.postdoctoral') },
  { id: 3, name: t('careers.categories.sales') },
  { id: 4, name: t('careers.categories.technical') },
  { id: 5, name: t('careers.categories.medical') },
  { id: 6, name: t('careers.categories.procurement') },
  { id: 7, name: t('careers.categories.quality') },
  { id: 8, name: t('careers.categories.marketing') },
  { id: 9, name: t('careers.categories.functional') },
  { id: 10, name: t('careers.categories.latest') },
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
const getJobList = async (_key: string) => {
  debugger
  // jobs.value = jobs.value.filter(j => j.type === key)
  // return jobs.value
}
const toOtherCareer = (id: string) => {
  router.push({ query: { job: id } })
  getJobList(id)
}

onMounted(() => {
  getJobList(activeCareer.value)
  toOtherCareer(activeCareer.value)
})
const pageSize = 7
const totalJobs = ref(7)
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(totalJobs.value / pageSize))

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return jobs.value.slice(start, start + pageSize)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)
  return pages
})

const selectCategory = (id: number) => {
  activeCategory.value = id
}

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
      <div class="careers__hero-bg-img">
        <img class="careers__hero-img" src="@/assets/carceers-hero.png" alt="加入我们" />
      </div>
      <div class="careers__hero-gradient" />

      <div class="careers__hero-content">
        <div class="careers__breadcrumb">
          <span class="careers__breadcrumb-item">{{ $t('careers.breadcrumb1') }}</span>
          <span class="careers__breadcrumb-sep">/</span>
          <span class="careers__breadcrumb-item">{{ $t('careers.breadcrumb2') }}</span>
        </div>
        <div class="careers__hero-badge">
          <span class="careers__hero-badge-text">{{ heroHero.tag }}</span>
        </div>
        <h1 class="careers__hero-title" v-html="heroHero.title"></h1>
        <p class="careers__hero-subtitle">
          {{ heroHero.subtitle }}
        </p>
      </div>
    </section>

    <section class="careers__content">
      <div class="careers__main">
        <div class="careers__heading">
          <div class="careers__heading-title-wrap">
            <h2 class="careers__heading-title">{{ $t('careers.jobHeading') }}</h2>
            <span class="careers__heading-count">{{ totalJobs }}</span>
          </div>
        </div>

        <div class="careers__tabs">
          <button v-for="cat in categories" :key="cat.id"
            :class="['careers__tab', { 'careers__tab--active': activeCategory === cat.id }]"
            @click="selectCategory(cat.id)">
            {{ cat.name }}
          </button>
        </div>

        <div class="careers__job-list">
          <div v-for="job in paginatedJobs" :key="job.id" class="careers__job-card">
            <div class="careers__job-top">
              <div class="careers__job-info">
                <div class="careers__job-title-row">
                  <h3 class="careers__job-title">{{ job.title }}</h3>
                  <span v-if="job.urgent" class="careers__job-urgent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M6.61619 14.667C6.61619 14.667 0.703193 13.3663 3.34603 6.91095C3.34603 6.91095 3.94603 7.62828 3.86353 7.97345C3.86353 7.97345 4.33386 6.34412 5.34903 5.37078C6.22069 4.53445 7.10636 2.18328 6.28953 1.33362C6.28953 1.33362 10.3354 2.18328 10.7857 6.43328C10.7857 6.43328 11.3032 5.07912 12.3657 4.94528C12.3657 4.94528 12.039 5.68928 12.3657 6.80528C12.3657 6.80528 15.717 12.542 9.94136 14.481C9.94136 14.481 11.6727 12.5151 8.00103 9.14162C8.00103 9.14162 7.13536 10.9483 6.61769 11.585C6.61619 11.5866 5.17203 13.2056 6.61619 14.667Z"
                        fill="#862300" />
                    </svg>
                    {{ $t('careers.urgent') }}
                  </span>
                </div>
                <div class="careers__job-meta">
                  <span class="careers__job-meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
                      <path
                        d="M6 7.5C6.4125 7.5 6.76562 7.35312 7.05937 7.05937C7.35312 6.76562 7.5 6.4125 7.5 6C7.5 5.5875 7.35312 5.23438 7.05937 4.94063C6.76562 4.64688 6.4125 4.5 6 4.5C5.5875 4.5 5.23438 4.64688 4.94063 4.94063C4.64688 5.23438 4.5 5.5875 4.5 6C4.5 6.4125 4.64688 6.76562 4.94063 7.05937C5.23438 7.35312 5.5875 7.5 6 7.5ZM6 13.0125C7.525 11.6125 8.65625 10.3406 9.39375 9.19687C10.1313 8.05312 10.5 7.0375 10.5 6.15C10.5 4.7875 10.0656 3.67188 9.19687 2.80312C8.32812 1.93437 7.2625 1.5 6 1.5C4.7375 1.5 3.67188 1.93437 2.80312 2.80312C1.93437 3.67188 1.5 4.7875 1.5 6.15C1.5 7.0375 1.86875 8.05312 2.60625 9.19687C3.34375 10.3406 4.475 11.6125 6 13.0125ZM6 15C3.9875 13.2875 2.48438 11.6969 1.49063 10.2281C0.496875 8.75937 0 7.4 0 6.15C0 4.275 0.603125 2.78125 1.80938 1.66875C3.01562 0.55625 4.4125 0 6 0C7.5875 0 8.98438 0.55625 10.1906 1.66875C11.3969 2.78125 12 4.275 12 6.15C12 7.4 11.5031 8.75937 10.5094 10.2281C9.51562 11.6969 8.0125 13.2875 6 15Z"
                        fill="#64748B" />
                    </svg>
                    {{ job.location }}
                  </span>
                  <span class="careers__job-meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M9.975 11.025L11.025 9.975L8.25 7.2V3.75H6.75V7.8L9.975 11.025ZM7.5 15C6.4625 15 5.4875 14.8031 4.575 14.4094C3.6625 14.0156 2.86875 13.4812 2.19375 12.8062C1.51875 12.1312 0.984375 11.3375 0.590625 10.425C0.196875 9.5125 0 8.5375 0 7.5C0 6.4625 0.196875 5.4875 0.590625 4.575C0.984375 3.6625 1.51875 2.86875 2.19375 2.19375C2.86875 1.51875 3.6625 0.984375 4.575 0.590625C5.4875 0.196875 6.4625 0 7.5 0C8.5375 0 9.5125 0.196875 10.425 0.590625C11.3375 0.984375 12.1312 1.51875 12.8062 2.19375C13.4812 2.86875 14.0156 3.6625 14.4094 4.575C14.8031 5.4875 15 6.4625 15 7.5C15 8.5375 14.8031 9.5125 14.4094 10.425C14.0156 11.3375 13.4812 12.1312 12.8062 12.8062C12.1312 13.4812 11.3375 14.0156 10.425 14.4094C9.5125 14.8031 8.5375 15 7.5 15ZM7.5 13.5C9.1625 13.5 10.5781 12.9156 11.7469 11.7469C12.9156 10.5781 13.5 9.1625 13.5 7.5C13.5 5.8375 12.9156 4.42188 11.7469 3.25312C10.5781 2.08437 9.1625 1.5 7.5 1.5C5.8375 1.5 4.42188 2.08437 3.25312 3.25312C2.08437 4.42188 1.5 5.8375 1.5 7.5C1.5 9.1625 2.08437 10.5781 3.25312 11.7469C4.42188 12.9156 5.8375 13.5 7.5 13.5Z"
                        fill="#64748B" />
                    </svg>
                    {{ job.type }}
                  </span>
                  <span class="careers__job-meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="14" viewBox="0 0 17 14" fill="none">
                      <path
                        d="M8.25 13.5L3 10.65V6.15L0 4.5L8.25 0L16.5 4.5V10.5H15V5.325L13.5 6.15V10.65L8.25 13.5ZM8.25 7.275L13.3875 4.5L8.25 1.725L3.1125 4.5L8.25 7.275ZM8.25 11.7937L12 9.76875V6.9375L8.25 9L4.5 6.9375V9.76875L8.25 11.7937Z"
                        fill="#64748B" />
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
                {{ $t('careers.applyJob') }}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="#0163FF" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="careers__pagination">
          <button class="careers__page-btn careers__page-btn--nav" @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z" fill="#94A3B8" />
            </svg>
          </button>
          <template v-for="(page, idx) in visiblePages" :key="idx">
            <span v-if="page === '...'" class="careers__page-ellipsis">...</span>
            <button v-else :class="['careers__page-btn', { 'careers__page-btn--active': currentPage === page }]"
              @click="goToPage(page as number)">
              {{ page }}
            </button>
          </template>
          <button class="careers__page-btn careers__page-btn--nav" @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z" fill="#94A3B8" />
            </svg>
          </button>
        </div>
      </div>

      <aside class="careers__sidebar">
        <div v-for="(career, index) in showCareer" :key="career.id"
          :class="`careers__sidebar-card ${index === 0 ? 'careers__sidebar-card--primary' : 'careers__sidebar-card--secondary'}`">
          <div class="careers__sidebar-blur" />
          <h3
            :class="`careers__sidebar-heading ${index === 0 ? 'careers__sidebar-heading--white' : 'careers__sidebar-heading--dark'}`">
            {{ career.name }}</h3>
          <p
            :class="`careers__sidebar-desc ${index === 0 ? 'careers__sidebar-desc--light' : 'careers__sidebar-desc--muted'}`">
            {{ career.description }}
          </p>
          <button
            :class="`careers__sidebar-link ${index === 0 ? 'careers__sidebar-link--white' : 'careers__sidebar-link--blue'}`"
            @click="toOtherCareer(career.id)">
            {{ $t('careers.viewDetails') }}
            <svg v-if="index === 0" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="#0163FF" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
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
  --content-bg: #F7F9FE;
}

.careers {
  background: var(--content-bg);
}

/* ========== Hero Section ========== */
.careers__hero {
  position: relative;
  width: 100%;
  height: 560px;
  overflow: hidden;
}

.careers__hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--color-hero-start) 0%, var(--color-hero-mid) 50%, var(--color-hero-end) 100%);
}

.careers__hero-bg-img {
  position: absolute;
  inset: 0;
  opacity: 0.4;

}

.careers__hero-content {
  position: relative;
  height: 100%;
  max-width: 1536px;
  padding: 142px 160px 0;
  display: flex;
  flex-direction: column;
}

/* ========== Breadcrumb ========== */
.careers__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 27px;
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
  margin-bottom: 24px;
  width: fit-content;
  margin-left: 140px;
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
  margin-left: 140px;
}

.careers__hero-subtitle {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 20px;
  line-height: 32.5px;
  color: rgba(219, 234, 254, 0.8);
  max-width: 500px;
  margin-left: 140px;
}

/* ========== Content Section ========== */
.careers__content {
  display: flex;
  gap: 48px;
  max-width: 1536px;
  margin: 0 auto;
  padding: 160px 32px 52px;
}

.careers__main {
  flex: 1;
  min-width: 0;
}

/* ========== Heading ========== */
.careers__heading {
  margin-bottom: 32px;
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
  margin-bottom: 32px;
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
  padding-top: 52px;
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

.careers__page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.careers__page-btn--active {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: var(--color-white);
  box-shadow: 0 4px 6px -1px rgba(0, 67, 203, 0.20), 0 2px 4px -2px rgba(0, 67, 203, 0.20);
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