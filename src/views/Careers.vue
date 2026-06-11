<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getRecruitCategories, getRecruitPage } from '@/api/recruit'
import type { RecruitCategory, PublicRecruitItem } from '@/api/types'
import { useRevealOnScroll } from '@/shared/utils/useRevealOnScroll'
import { formatSalary } from '@/shared/utils/formatSalary'

useRevealOnScroll()

const { t } = useI18n()
const router = useRouter()
const activeCareer = computed(() => router.currentRoute.value.query.job as string || 'other')

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
    subtitle: t('careers.joinSubtitleSales'),
  },
  academic: {
    id: 'academic',
    tag: t('careers.joinTag'),
    title: t('careers.joinTitle.academic'),
    subtitle: t('careers.joinSubtitleAcademic'),
  },
} as Record<string, Hero>))
const heroHero = computed(() => heroList.value[activeCareer.value])
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

/** 页面展示用的职位 */
interface JobDisplay {
  recruitNo: string
  title: string
  urgent: boolean
  location: string
  type: string
  education: string
  tags: string[]
  salary: string
}

/** 招聘类目 Tab 项（含固定 ALL/LATEST） */
interface CategoryTab {
  code: string
  name: string
}

/** API 招聘项 → 页面展示字段映射 */
function mapRecruitItem(item: PublicRecruitItem): JobDisplay {
  return {
    recruitNo: item.recruitNo,
    title: item.title,
    urgent: item.isUrgent === 1,
    location: [item.city, item.district].filter(Boolean).join(' · '),
    type: item.employmentTypeName,
    education: item.educationLevelName,
    tags: (item.tags || []).map((t) => t.name),
    salary: formatSalary(item),
  }
}

const apiCategories = ref<RecruitCategory[]>([])
const categoryTabs = computed<CategoryTab[]>(() => {
  if (!apiCategories.value.length) return []
  const seen = new Set<string>()
  const tabs: CategoryTab[] = []
  const add = (code: string, name: string) => {
    if (seen.has(code)) return
    seen.add(code)
    tabs.push({ code, name })
  }
  add('ALL', t('careers.categories.all'))
  for (const c of apiCategories.value) {
    add(c.code, c.name)
  }
  add('LATEST', t('careers.categories.latest'))
  return tabs
})


type baseJobType = 'POSTDOC' | 'SALES' | 'ALL' | 'LATEST'
const job = (): baseJobType => {
  const JobMap: Record<string, baseJobType> = {
    academic: 'POSTDOC',
    sales: 'SALES',
    other: 'ALL',
  }
  const jobData = activeCareer.value
  return jobData && jobData in JobMap ? JobMap[jobData] : 'ALL'
}
watch(() => router.currentRoute.value.query.job,
  () => {
    activeCategoryCode.value = job()
    fetchCategories()
    fetchJobList()
  })
const activeCategoryCode = ref<string>(job() || 'ALL')

const jobs = ref<JobDisplay[]>([])
const totalJobs = ref(0)
const currentPage = ref(1)
const pageSize = 7

const totalPages = computed(() => Math.ceil(totalJobs.value / pageSize) || 1)

const paginatedJobs = computed(() => jobs.value)

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

async function fetchJobList() {
  const categoryCode = activeCategoryCode.value === 'ALL' ? undefined : activeCategoryCode.value
  try {
    const res = await getRecruitPage({ page: currentPage.value, size: pageSize, categoryCode })
    jobs.value = (res.data?.records || []).map(mapRecruitItem)
    totalJobs.value = res.data?.total || 0
  } catch {
    jobs.value = []
    totalJobs.value = 0
  }
}

async function fetchCategories() {
  if (activeCareer.value !== 'other') {
    apiCategories.value = []
    return
  }
  try {
    const catRes = await getRecruitCategories()
    apiCategories.value = catRes.data || []
  } catch {
    apiCategories.value = []
  }
}
const selectCategory = (code: string) => {
  activeCategoryCode.value = code
  currentPage.value = 1
  fetchJobList()
}

const viewJobDetail = (recruitNo: string) => {
  router.push(`/about/careers/${recruitNo}`)
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    fetchJobList()
  }
}

const toOtherCareer = (id: string) => {
  router.push({ query: { job: id } })
}
const goToAbout = () => {
  router.push('/about')
}

onMounted(() => {
  fetchCategories()
  fetchJobList()
})
</script>

<template>
  <div class="careers">
    <section class="careers__hero reveal">
      <div class="careers__hero-bg-img">
        <img class="careers__hero-img" src="@/assets/carceers-hero.png" alt="加入我们" />
      </div>
      <div class="careers__hero-gradient" />

      <div class="careers__hero-content">
        <div class="careers__breadcrumb">
          <span class="careers__breadcrumb-item careers__breadcrumb-item--link" @click="goToAbout">{{
            $t('careers.breadcrumb1') }}</span>
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
        <div class="careers__heading reveal">
          <div class="careers__heading-title-wrap">
            <h2 class="careers__heading-title">{{ $t('careers.jobHeading') }}</h2>
            <span class="careers__heading-count">{{ totalJobs }}</span>
          </div>
        </div>

        <div class="careers__tabs reveal" v-show="categoryTabs.length">
          <button v-for="cat in categoryTabs" :key="cat.code"
            :class="['careers__tab', { 'careers__tab--active': activeCategoryCode === cat.code }]"
            @click="selectCategory(cat.code)">
            {{ cat.name }}
          </button>
        </div>

        <div class="careers__job-list reveal" v-show="totalJobs > 0">
          <div v-for="job in paginatedJobs" :key="job.recruitNo" class="careers__job-card">
            <div class="careers__job-top">
              <div class="careers__job-info">
                <div class="careers__job-title-row">
                  <h3 class="careers__job-title">{{ job.title }}</h3>
                  <span v-if="job.urgent" class="careers__job-urgent">
                    <svg class="w-[1rem]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                      fill="none">
                      <path
                        d="M6.61619 14.667C6.61619 14.667 0.703193 13.3663 3.34603 6.91095C3.34603 6.91095 3.94603 7.62828 3.86353 7.97345C3.86353 7.97345 4.33386 6.34412 5.34903 5.37078C6.22069 4.53445 7.10636 2.18328 6.28953 1.33362C6.28953 1.33362 10.3354 2.18328 10.7857 6.43328C10.7857 6.43328 11.3032 5.07912 12.3657 4.94528C12.3657 4.94528 12.039 5.68928 12.3657 6.80528C12.3657 6.80528 15.717 12.542 9.94136 14.481C9.94136 14.481 11.6727 12.5151 8.00103 9.14162C8.00103 9.14162 7.13536 10.9483 6.61769 11.585C6.61619 11.5866 5.17203 13.2056 6.61619 14.667Z"
                        fill="#862300" />
                    </svg>
                    {{ $t('careers.urgent') }}
                  </span>
                </div>
                <div class="careers__job-meta">
                  <span class="careers__job-meta-item">
                    <img src="@/assets/location-icon.png" alt="location" class="h-[0.9375rem]" />
                    {{ job.location }}
                  </span>
                  <span class="careers__job-meta-item">
                    <img src="@/assets/type-icon.png" alt="type" class="h-[0.9375rem]" />
                    {{ job.type }}
                  </span>
                  <span class="careers__job-meta-item">
                    <img src="@/assets/education-icon.png" alt="education" class="h-[0.9375rem]" />
                    {{ job.education }}
                  </span>
                  <span class="careers__job-meta-item">
                    <img src="@/assets/salary-icon.png" alt="salary" class="h-[0.9375rem]" />
                    {{ job.salary }}
                  </span>
                </div>
              </div>
            </div>
            <div class="careers__job-bottom">
              <div class="careers__job-tags">
                <span v-for="tag in job.tags" :key="tag" class="careers__job-tag">{{ tag }}</span>
              </div>
              <button class="careers__job-apply" @click="viewJobDetail(job.recruitNo)">
                {{ $t('careers.applyJob') }}
                <img src="@/assets/arrow-right.png" alt="arrow-right" class="h-[0.58rem]" />
              </button>
            </div>
          </div>
        </div>
        <div v-show="totalJobs === 0" class="careers__no-jobs">
          {{ $t('careers.noJobs') }}
        </div>

        <div class="careers__pagination reveal" v-show="totalJobs > 0">
          <button class="careers__page-btn careers__page-btn--nav" @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1">
            <svg class="h-[0.75rem]" xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12"
              fill="none">
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
            <svg class="h-[0.75rem]" xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12"
              fill="none">
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
            <svg v-if="index === 0" class="h-[0.75rem]" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="#0163FF" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            <svg v-else class="h-[0.75rem]" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="white" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </aside>
    </section>
  </div>
</template>

<style scoped lang="less">
.careers {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-brand: #0163FF;
  --color-text-heading: #181C20;
  --color-text-meta: #64748B;
  --color-tag-bg: #EBEEF3;
  --color-tag-text: #475569;
  --color-tag-active-border: rgba(0, 82, 217, 0.1);
  --color-tag-active-bg: rgba(0, 82, 217, 0.04);
  --color-border: #F8FAFC;
  --color-border-light: #F1F5F9;
  --border-light: rgba(0, 82, 217, 0.2);
  --shadow-card: 0 0.625rem 1.875rem rgba(0, 82, 217, 0.04);
  --color-urgent-bg: #FFDBD1;
  --color-urgent-text: #862300;
  --color-hero-start: rgba(0, 67, 203, 1);
  --color-hero-mid: rgba(0, 67, 203, 0.8);
  --color-hero-end: rgba(0, 67, 203, 0);
  --font-body: 'PingFang SC', 'Noto Sans SC', sans-serif;
  --font-heading: 'Inter', 'PingFang SC', sans-serif;
  --content-bg: #F7F9FE;
  --transition-smooth: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  --transition-premium: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.careers {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--content-bg);
}

/* ========== Hero Section ========== */
.careers__hero {
  position: relative;
  width: 100%;
  height: 35rem;
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
  max-width: 96rem;
  padding: 8.875rem 0 0;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.careers__hero-img {
  width: 100%;
}

/* ========== Breadcrumb ========== */
.careers__breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 1.6875rem;
}

.careers__breadcrumb-item {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: -0.0536em;
  color: var(--color-white);
}

.careers__breadcrumb-item--link {
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-brand);
  }
}

.careers__breadcrumb-item--link:hover {
  color: var(--color-brand);
}



.careers__breadcrumb-sep {
  color: var(--color-white);
}

.careers__hero-badge {
  display: inline-flex;
  align-items: center;
  background: #98ADFF;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  width: fit-content;
  margin-left: 8.75rem;
}

.careers__hero-badge-text {
  padding: 0.25rem 0.75rem;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #273E88;
}

.careers__hero-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 4.5rem;
  line-height: 4.5rem;
  letter-spacing: -0.05em;
  color: var(--color-white);
  margin-bottom: 1.5rem;
  margin-left: 8.75rem;
}

.careers__hero-subtitle {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2.0313rem;
  color: rgba(219, 234, 254, 0.8);
  margin-left: 8.75rem;
  max-width: 61.875rem;
}

/* ========== Content Section ========== */
.careers__content {
  display: flex;
  gap: 3rem;
  max-width: 96rem;
  margin: 0 auto;
  padding: 10rem 2rem 3.25rem;
  flex: 1;
}

.careers__main {
  flex: 1;
  min-width: 0;
  width: 69rem;
}

/* ========== Heading ========== */
.careers__heading {
  margin-bottom: 2rem;
}

.careers__heading-title-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.careers__heading-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2rem;
  color: var(--color-text-heading);
}

.careers__heading-count {
  font-family: 'DIN Black', 'DIN', sans-serif;
  font-weight: 900;
  font-size: 1.375rem;
  line-height: 1.75rem;
  color: var(--color-brand);
}

/* ========== Category Tabs ========== */
.careers__tabs {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.625rem 0;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.careers__tab {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.25rem;
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
  gap: 2rem;
}

.careers__no-jobs {
  padding: 6.25rem 2.25rem;
  text-align: center;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2.0313rem;
  color: rgba(219, 234, 254, 0.8);
  max-width: 31.25rem;
  margin: 0 auto;
}

.careers__job-card {
  background: var(--color-white);
  border: 0.0625rem solid transparent;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition: var(--transition-premium);

  &:hover {
    border-color: var(--border-light);
    box-shadow: var(--shadow-card);

    .careers__job-title {
      color: var(--color-brand);
    }

    .careers__job-tag {
      color: var(--color-brand);
      background: var(--color-tag-active-bg);
      border-color: var(--color-tag-active-border);
    }
  }
}

.careers__job-top {
  display: flex;
  justify-content: space-between;
}

.careers__job-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.careers__job-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.careers__job-title {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: var(--color-text-heading);
}

.careers__job-urgent {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.125rem 0.375rem;
  height: 1.25rem;
  background: var(--color-urgent-bg);
  border-radius: 0.75rem;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 0.625rem;
  line-height: 0.9375rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-urgent-text);
}

.careers__job-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.careers__job-meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-text-meta);
}

/* ========== Job Card Bottom ========== */
.careers__job-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 0.0625rem solid var(--color-border);
}

.careers__job-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;
  flex-wrap: wrap;
}

.careers__job-tag {
  padding: 0.25rem 0.75rem;
  background: var(--color-tag-bg);
  border-radius: 0.25rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1rem;
  color: var(--color-tag-text);
  border: 0.0625rem solid transparent;
  transition: all 0.2s;
}

.careers__job-apply {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  border: none;
  background: none;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-brand);
  cursor: pointer;
  transition: opacity 0.2s;
  cursor: pointer;
}

.careers__job-apply:hover {
  opacity: 0.8;
}

/* ========== Pagination ========== */
.careers__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding-top: 3.25rem;
}

.careers__page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 0.0625rem solid var(--color-border-light);
  background: var(--color-white);
  cursor: pointer;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-tag-text);
  box-shadow: 0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.careers__page-btn--nav {
  border: 0.0625rem solid var(--color-border-light);
}

.careers__page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.careers__page-btn--active {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: var(--color-white);
  box-shadow: 0 0.25rem 0.375rem -0.0625rem rgba(0, 67, 203, 0.20), 0 0.125rem 0.25rem -0.125rem rgba(0, 67, 203, 0.20);
}

.careers__page-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #94A3B8;
}

/* ========== Sidebar ========== */
.careers__sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-shrink: 0;
}

.careers__sidebar-card {
  position: relative;
  overflow: hidden;
}

.careers__sidebar-card--primary {
  background: var(--color-brand);
  border-radius: 0.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.925rem;
  transition: var(--transition-smooth);
}

.careers__sidebar-card--secondary {
  background: var(--color-white);
  border: 0.0625rem solid var(--color-border-light);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 0.0625rem 0.125rem 0 rgba(0, 0, 0, 0.05);
  transition: var(--transition-smooth);
}

.careers__sidebar-card--secondary,
.careers__sidebar-card--primary {
  &:hover {
    transform: translateY(-0.5rem);
  }
}

.careers__sidebar-blur {
  position: absolute;
  width: 12rem;
  height: 12rem;
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  filter: blur(64px);
  top: -3rem;
  right: 0;
  pointer-events: none;
}

.careers__sidebar-heading {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2rem;
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
  font-size: 0.875rem;
  line-height: 1.4219rem;
  max-width: 16rem;
  padding-bottom: 0.575rem;
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
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  transition: opacity 0.2s;
  width: fit-content;
  transition: var(--transition-smooth);

  &:hover {
    transform: scale(1.03);
  }
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