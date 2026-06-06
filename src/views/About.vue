<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import investment from '@/assets/investment.png'
import promotion from '@/assets/promotion.png'
import channel from '@/assets/channel.png'
import responsible from '@/assets/responsible.png'
import highQuality from '@/assets/high-quality.png'
import mission from '@/assets/mission.png'
import efficient from '@/assets/efficient.png'
import channelIcon from '@/assets/channel.svg'
import promotionIcon from '@/assets/promotion.svg'
import investmentIcon from '@/assets/investment.svg'
import cardIconBg from '@/assets/about-icon-bg.svg'
import responsibleIcon from '@/assets/responsible.svg'
import highQualityIcon from '@/assets/high-quality.svg'
import missionIcon from '@/assets/mission.svg'
import efficientIcon from '@/assets/efficient.svg'
import timelineRight from '@/assets/timeline-right.png'
import timelineRight1 from '@/assets/timeline-right-1.png'
import timelineRight2 from '@/assets/timeline-right-2.png'
import timelineRight3 from '@/assets/timeline-right-3.png'
import timelineRight4 from '@/assets/timeline-right-4.png'

const { t } = useI18n()

interface Milestone {
  id: number
  content: string
}

const stats = computed(() => [
  { id: 1, value: 20, suffix: '+', label: t('about.stats.certificates'), animated: ref(0) },
  { id: 2, value: 100, suffix: '+', label: t('about.stats.patents'), animated: ref(0) },
  { id: 3, value: 20, suffix: 'K+', label: t('about.stats.patients'), animated: ref(0) },
  { id: 4, value: 8, suffix: '+', label: t('about.stats.rdYears'), animated: ref(0) },
])

const years = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018']
const activeYear = ref('2026')
const timelineRef = ref<HTMLElement | null>(null)
const yearRefs = ref<Record<string, HTMLElement | null>>({})

const setYearRef = (year: string, el: any) => {
  yearRefs.value[year] = el as HTMLElement | null
}

const selectYear = (year: string) => {
  activeYear.value = year
  // Scroll the timeline to show the selected year
  const yearEl = yearRefs.value[year]
  const container = timelineRef.value
  if (yearEl && container) {
    const containerWidth = container.clientWidth
    const yearLeft = yearEl.offsetLeft
    const yearWidth = yearEl.offsetWidth
    // Center the year in the container
    const scrollTarget = yearLeft - containerWidth / 2 + yearWidth / 2
    container.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' })
  }
}

const nextYear = () => {
  const idx = years.indexOf(activeYear.value)
  if (idx >= years.length - 1) return
  selectYear(years[idx + 1])
}

const prevYear = () => {
  const idx = years.indexOf(activeYear.value)
  if (idx <= 0) return
  selectYear(years[idx - 1])
}

const milestonesByYear: Record<string, Milestone[]> = {
  '2026': [
    { id: 1, content: '完成C轮近3亿元融资，植入式可充电脊髓神经刺激系统(SCS)、周围神经刺激系统(PNS)获批上市' },
  ],
  '2025': [
    { id: 1, content: '杭州市准独角兽企业、浙江省企业研究院、博士后科研工作站设立' },
  ],
  '2024': [
    { id: 1, content: '完成B+轮融资，浙江省科技厅尖兵、领雁攻关项目' },
  ],
  '2023': [
    { id: 1, content: '浙江省专精特新中小企业' },
  ],
  '2022': [
    { id: 1, content: '完成B轮融资，国家高新技术企业' },
  ],
  '2021': [
    { id: 1, content: '完成Pre-A、A轮融资，浙江省科技厅尖兵、领雁攻关项目' },
  ],
  '2020': [
    { id: 1, content: '浙江省科技型中小企业' },
  ],
  '2019': [
    { id: 1, content: '完成天使轮投资' },
  ],
  '2018': [
    { id: 1, content: '公司成立' },
  ],
}
const currentImage = computed(() => {
  switch (activeYear.value) {
    case '2026':
      return timelineRight
    case '2025':
      return timelineRight1
    case '2024':
      return timelineRight2
    case '2023':
      return timelineRight3
    case '2022':
      return timelineRight4
    default:
      return timelineRight
  }
})

const currentMilestones = computed(() => milestonesByYear[activeYear.value] || [])

const values = computed(() => [
  {
    id: 1,
    name: t('about.values.mission'),
    nameEn: 'Mission',
    img: mission,
    icon: missionIcon,
    subtitles: [t('about.values.missionSub1'), t('about.values.missionSub2')],
    bgColor: '#F6F6F6',
  },
  {
    id: 2,
    name: t('about.values.responsible'),
    nameEn: 'Responsible',
    img: responsible,
    icon: responsibleIcon,
    subtitles: [t('about.values.responsibleSub1'), t('about.values.responsibleSub2')],
    bgColor: '#F6F6F6',
  },
  {
    id: 3,
    name: t('about.values.quality'),
    nameEn: 'High Quality',
    img: highQuality,
    icon: highQualityIcon,
    subtitles: [t('about.values.qualitySub1'), t('about.values.qualitySub2')],
    bgColor: '#EDEDED',
  },
  {
    id: 4,
    name: t('about.values.efficient'),
    nameEn: 'Efficient',
    img: efficient,
    icon: efficientIcon,
    subtitles: [t('about.values.efficientSub1'), t('about.values.efficientSub2')],
    bgColor: '#F6F6F6',
  },
])

const activeValue = ref(1)

const partnerCards = computed(() => [
  {
    id: 1,
    title: t('about.partner.channelTitle'),
    img: channel,
    icon: channelIcon,
    description: t('about.partner.channelDesc'),
  },
  {
    id: 2,
    title: t('about.partner.promotionTitle'),
    img: promotion,
    icon: promotionIcon,
    description: t('about.partner.promotionDesc'),
  },
  {
    id: 3,
    title: t('about.partner.investmentTitle'),
    img: investment,
    icon: investmentIcon,
    description: t('about.partner.investmentDesc'),
  },
])

const animateValue = (stat: { value: number; animated: { value: number } }, duration: number) => {
  const startTime = performance.now()
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    stat.animated.value = Math.floor(stat.value * easeOutQuart)
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stats.value.forEach((stat, index) => {
          setTimeout(() => {
            animateValue(stat, 2000)
          }, index * 200)
        })
        observer.disconnect()
      }
    })
  })
  const el = document.querySelector('.about__hero-stats-wrap')
  if (el) observer.observe(el)
})

import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = (key: string) => {
  router.push({ path: '/about/careers', query: { job: key } })
}
</script>

<template>
  <div class="about">
    <!-- Hero Banner -->
    <section class="about__hero">
      <img src="@/assets/about-hero-bg.png" alt="关于神络" class="about__hero-bg" />
      <div class="about__hero-overlay"></div>
      <div class="about__hero-deco-blur about__hero-deco-blur--blue"></div>
      <div class="about__hero-deco-blur about__hero-deco-blur--white"></div>

      <div class="about__hero-content">
        <div class="about__hero-left">
          <div class="about__hero-image">
            <img src="@/assets/about-hero.png" alt="关于神络" class="about__hero-img" />
          </div>
        </div>

        <div class="about__hero-right">
          <h1 class="about__hero-label">{{ $t('about.hero.label') }}</h1>
          <div class="about__hero-text-group">
            <p class="about__hero-slogan">{{ $t('about.hero.slogan') }}</p>
            <p class="about__hero-desc">
              {{ $t('about.hero.desc') }}
            </p>
          </div>
        </div>
      </div>

      <div class="about__hero-stats-wrap">
        <div class="about__hero-stats">
          <div v-for="stat in stats" :key="stat.id" class="about__hero-stat">
            <span class="about__hero-stat-number">{{ stat.animated.value }}{{ stat.suffix }}</span>
            <span class="about__hero-stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 神络里程碑 -->
    <section class="about__milestones">
      <div class="about__section-header">
        <h2 class="about__section-heading">{{ $t('about.milestones.heading') }}</h2>
        <p class="about__section-subtitle">{{ $t('about.milestones.subtitle') }}</p>
      </div>

      <div class="about__timeline-wrapper">
        <div class="about__timeline-area">
          <button class="about__timeline-nav about__timeline-nav--prev" aria-label="上一个年份" @click="prevYear">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path opacity="0.99"
                d="M6.91699 1L1.05841 6.85858C0.980308 6.93668 0.980309 7.06332 1.05841 7.14142L6.91699 13"
                stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
          <div class="about__timeline-line-area" ref="timelineRef">
            <div class="about__timeline-line-area-line">
              <div class="about__timeline-line"></div>
            </div>
            <div class="about__timeline-years">
              <button v-for="year in years" :key="year" :ref="(el) => setYearRef(year, el)"
                :class="['about__timeline-year', { 'about__timeline-year--active': activeYear === year }]"
                @click="selectYear(year)">
                <span class="about__timeline-dot"></span>
                <span class="about__timeline-year-text">{{ year }}</span>
              </button>
            </div>
          </div>
          <button class="about__timeline-nav about__timeline-nav--next" aria-label="下一个年份" @click="nextYear">
            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path opacity="0.99" d="M1 1L6.85858 6.85858C6.93668 6.93668 6.93668 7.06332 6.85858 7.14142L1 13"
                stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
      <div class="about__milestones-content">
        <div class="about__milestones-content-left">

          <div class="about__timeline-decoration">
            <span class="about__timeline-big-year">{{ activeYear }}</span>
            <span class="about__timeline-decoration-line"></span>
          </div>
          <div v-for="milestone in currentMilestones" :key="milestone.id" class="about__milestone-item">
            <span class="about__milestone-number">{{ String(milestone.id).padStart(2, '0') }}</span>
            <span class="about__milestone-text">{{ milestone.content }}</span>
          </div>
        </div>
        <div class="about__milestones-image">
          <img :src="currentImage" alt="神络里程碑" class="about__milestones-img" />
        </div>
      </div>

    </section>

    <!-- 企业文化 -->
    <section class="about__culture">
      <div class="about__culture-bg">
        <img src="@/assets/about_culture_bg.png" alt="企业文化" class="about__culture-bg-img" />
      </div>
      <div class="about__section-header">
        <h2 class="about__section-heading">{{ $t('about.culture.heading') }}</h2>
        <p class="about__section-subtitle">{{ $t('about.values.subtitle') }}</p>
      </div>

      <div class="about__values">
        <div v-for="value in values" :key="value.id"
          :class="['about__value-card', { 'about__value-card--active': activeValue === value.id, 'about__value-card--inactive': activeValue !== value.id }]"
          @click="activeValue = value.id">
          <div class="about__value-collapsed">
            <div class="about__value-icon">
              <img :src="value.icon" alt="企业文化" class="about__value-icon-img" />
            </div>
            <div class="about__value-small-content">
              <div class="about__value-small-top">
                <span class="about__value-small-name">{{ value.name }}</span>
                <span class="about__value-small-en">{{ value.nameEn }}</span>
              </div>
              <div class="about__value-small-subs">
                <span v-for="sub in value.subtitles" :key="sub" class="about__value-small-sub">{{ sub }}</span>
              </div>
            </div>
          </div>
          <div class="about__value-expanded">
            <div class="about__value-left">
              <div class="about__value-name-group">
                <span class="about__value-name">{{ value.name }}</span>
                <span class="about__value-name-en">{{ value.nameEn }}</span>
              </div>
              <div class="about__value-subtitles">
                <span v-for="sub in value.subtitles" :key="sub" class="about__value-subtitle">{{ sub }}</span>
              </div>
            </div>
            <div class="about__value-image">
              <img :src="value.img" :alt="value.name" class="about__value-img" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 商业合作 -->
    <section class="about__partners">
      <div class="about__section-header">
        <h2 class="about__section-heading">{{ $t('about.partner.heading') }}</h2>
        <p class="about__section-subtitle about__section-subtitle--narrow">
          {{ $t('about.partner.subtitle') }}</p>
      </div>

      <div class="about__partner-cards">
        <div v-for="card in partnerCards" :key="card.id" class="about__partner-card">
          <img :src="card.img" alt="合作" class="about__partner-card-bg" />
          <div class="about__partner-blur"></div>
          <div class="about__partner-icon">
            <div class="about__partner-icon-bg">
              <img :src="cardIconBg" alt="合作" class="about__partner-icon-bg-img" />
              <img :src="card.icon" alt="合作" class="about__partner-icon-img" />
            </div>
          </div>
          <h3 class="about__partner-title">{{ card.title }}</h3>
          <p class="about__partner-desc">{{ card.description }}</p>
        </div>
      </div>

      <div class="about__contact-bar">
        <div class="about__contact-content">
          <div class="about__contact-info">
            <h3 class="about__contact-heading">{{ $t('about.contactBar.heading') }}</h3>
            <p class="about__contact-text">
              {{ $t('about.contactBar.text') }}<br />
              {{ $t('about.contactBar.text2') }}<br />
              {{ $t('about.contactBar.text3') }}<br />
              {{ $t('about.contactBar.desc') }}
            </p>
          </div>

          <div class="about__contact-method--phone">
            <div class="about__contact-icon">
              <img src="@/assets/about-contact-phone.svg" alt="电话热线" class="about__contact-icon-img" />
            </div>
            <div class="about__contact-detail">
              <span class="about__contact-label">{{ $t('about.contactBar.phone') }}</span>
              <span class="about__contact-value">400-808-5561</span>
            </div>
          </div>

          <div class="about__contact-method--email">
            <div class="about__contact-icon">
              <img src="@/assets/about-contact-email.svg" alt="企业邮箱" class="about__contact-icon-img" />
            </div>
            <div class="about__contact-detail about__contact-detail--email">
              <span class="about__contact-label">{{ $t('about.contactBar.email') }}</span>
              <span class="about__contact-value">support@seeneuro.com</span>
            </div>
          </div>

          <div class="about__contact-qr">
            <div class="about__contact-qr-code">
              <img src="@/assets/about-qr.png" alt="QR Code" class="about__contact-qr-img" />
            </div>
            <span class="about__contact-qr-label">{{ $t('about.contactBar.qrLabel') }}</span>
          </div>
        </div>

      </div>
    </section>

    <!-- 加入我们 -->
    <section class="about__join">
      <div class="about__section-header about__join-header">
        <h2 class="about__section-heading about__section-heading--light">{{ $t('about.join.heading') }}</h2>
        <p class="about__section-subtitle about__section-subtitle--light">{{ $t('about.join.subtitle') }}</p>
      </div>

      <div class="about__join-cards">
        <div class="about__join-card">
          <div class="about__join-card-header">
            <div class="about__join-card-icon">
              <img src="@/assets/about-join-icon.svg" alt="加入我们" class="about__join-card-icon-img" />
            </div>
            <span class="about__join-card-tag">{{ $t('about.join.card1.tag') }}</span>
          </div>
          <h3 class="about__join-card-title">{{ $t('about.join.card1.title') }}</h3>
          <p class="about__join-card-desc">{{ $t('about.join.card1.desc') }}</p>
          <button class="about__join-card-btn" @click="handleClick('academic')">{{ $t('about.join.card1.btn')
            }}</button>
        </div>

        <div class="about__join-card">
          <div class="about__join-card-header">
            <div class="about__join-card-icon">
              <img src="@/assets/about-join-icon2.svg" alt="加入我们" class="about__join-card-icon-img" />
            </div>
            <span class="about__join-card-tag">{{ $t('about.join.card2.tag') }}</span>
          </div>
          <h3 class="about__join-card-title">{{ $t('about.join.card2.title') }}</h3>
          <p class="about__join-card-desc">{{ $t('about.join.card2.desc') }}</p>
          <button class="about__join-card-btn about__join-card-btn--outline" @click="handleClick('sales')">{{
            $t('about.join.card2.btn') }}</button>
        </div>

        <div class="about__join-card">
          <div class="about__join-card-header">
            <div class="about__join-card-icon">
              <img src="@/assets/about-join-icon3.svg" alt="加入我们" class="about__join-card-icon-img" />
            </div>
            <span class="about__join-card-tag">{{ $t('about.join.card3.tag') }}</span>
          </div>
          <h3 class="about__join-card-title">{{ $t('about.join.card3.title') }}</h3>
          <p class="about__join-card-desc">{{ $t('about.join.card3.desc') }}</p>
          <button class="about__join-card-btn about__join-card-btn--outline" @click="handleClick('other')">{{
            $t('about.join.card3.btn') }}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.about {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-brand: #0163FF;
  --color-brand-dark: #0043CB;
  --color-stat-number: #165DFC;
  --color-stat-label: #63748E;
  --color-stat-label-alt: #65758C;
  --color-text-heading: #000000;
  --color-text-subtitle: #666666;
  --color-text-milestone: #999999;
  --color-text-partner-title: #00152A;
  --color-text-partner-desc: #43474D;
  --color-text-dark: #000036;
  --color-milestone-number: #C5DEFF;
  --color-timeline-inactive: rgba(204, 204, 204, 0.8);
  --color-timeline-line: #EFEFEF;
  --color-nav-border: #E2E4E8;
  --color-culture-bg-start: rgba(210, 228, 253, 1);
  --color-culture-bg-end: rgba(245, 249, 255, 1);
  --color-partners-bg: #F7F9FE;
  --color-contact-bar-bg: #F4F7FE;
  --color-join-bg: #0163FF;
  --color-join-card-bg: rgba(255, 255, 255, 0.1);
  --color-join-card-border: rgba(255, 255, 255, 0.2);
  --color-join-desc: rgba(255, 255, 255, 0.7);
  --color-join-subtitle: rgba(255, 255, 255, 0.8);
  --color-unselected-bg-hover: #ffffff;
  --color-unselected-bg: #F6F6F6;
  --color-unselected-bg-alt: #EDEDED;
  --font-heading: 'Alibaba PuHuiTi 3.0', 'PingFang SC', sans-serif;
  --font-body: 'PingFang SC', 'Noto Sans SC', sans-serif;
  --transition-smooth: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

}

/* ========== Hero Banner ========== */
.about__hero {
  position: relative;
  width: 100%;
  height: 1000px;
  margin: 0 auto;
  background: linear-gradient(180deg, rgba(187, 212, 243, 1) 0%, rgba(239, 246, 255, 1) 100%);
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 239px;
}

.about__hero-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 0;
}

.about__hero-overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(205, 227, 255, 0.5) 0%, rgba(255, 255, 255, 1) 100%);
  filter: blur(14px);
  pointer-events: none;
  z-index: 1;
}

.about__hero-deco-blur {
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.about__hero-deco-blur--blue {
  left: -242px;
  top: 729px;
  width: 1220px;
  height: 387px;
  background: linear-gradient(90deg, rgba(1, 82, 237, 0.6) 0%, rgba(1, 82, 237, 0) 100%);
  filter: blur(280px);
}

.about__hero-deco-blur--white {
  left: 396px;
  top: 141px;
  width: 1045px;
  height: 672px;
  background: rgba(255, 255, 255, 0.5);
  filter: blur(244px);
  border-radius: 50%;
}

.about__hero-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* padding: 0 170px 0 161px; */
  margin: 0 auto;
  z-index: 2;
  flex-shrink: 0;
  gap: 147px;
}

.about__hero-left {
  flex-shrink: 0;
}

.about__hero-image {
  width: 680px;
  height: 427px;
  border-radius: 30px;
  overflow: hidden;
  background: linear-gradient(135deg, #E8F0FE 0%, #D4E4FD 100%);

  img {
    transition: var(--transition-smooth);
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
}

.about__hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about__hero-right {
  width: 763px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 48px;
  flex-shrink: 0;
}

.about__hero-label {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 50px;
  color: var(--color-brand);
  margin: 0;
  text-align: right;
  line-height: 1;
}

.about__hero-text-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.about__hero-slogan {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 30px;
  letter-spacing: -0.05em;
  color: var(--color-black);
  margin: 0;
  text-align: right;
}

.about__hero-desc {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: -0.05em;
  color: var(--color-text-subtitle);
  margin: 0;
  text-align: right;
}

.about__hero-stats-wrap,
.about__hero-content {
  max-width: 1920px;
  margin: 0 auto;
}

.about__hero-stats-wrap {
  margin-top: auto;
  margin-bottom: 105px;
  padding-left: 156px;
  z-index: 2;
  flex-shrink: 0;
}

.about__hero-stats {
  display: flex;
  align-items: center;
  gap: 30px;
}

.about__hero-stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border-radius: 24px;
}

.about__hero-stat:nth-child(1),
.about__hero-stat:nth-child(2),
.about__hero-stat:nth-child(3) {
  width: 397px;
}

.about__hero-stat-number {
  font-family: 'DIN Black', 'Inter', sans-serif;
  font-weight: 900;
  font-size: 80px;
  line-height: 80px;
  text-transform: uppercase;
  color: var(--color-stat-number);
}

.about__hero-stat-label {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  text-transform: uppercase;
  color: var(--color-stat-label);
}

.about__hero-stat:nth-child(4) .about__hero-stat-label {
  font-family: var(--font-heading);
  color: var(--color-stat-label-alt);
}

/* ========== Section Header (shared) ========== */
.about__section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 1216px;
  margin: 0 auto;
}

.about__section-heading {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 66px;
  text-align: center;
  color: var(--color-text-heading);
  margin: 0;
  line-height: 1;
}

.about__section-heading--light {
  color: var(--color-white);
}

.about__section-subtitle {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: var(--color-text-subtitle);
  margin: 0;
}

.about__section-subtitle--narrow {
  width: 470px;
}

.about__section-subtitle--light {
  color: var(--color-join-subtitle);
}

/* ========== 里程碑 Section ========== */
.about__milestones {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background: var(--color-white);
  box-sizing: border-box;
  padding: 100px 0;
  min-height: 967px;
  max-width: 1920px;
}

.about__milestones .about__section-header {
  margin-bottom: 80px;
}

.about__timeline-wrapper {
  padding: 0 190px;
  margin-bottom: 60px;
}

.about__timeline-area {
  width: 100%;
  max-width: 1540px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.about__timeline-decoration {
  width: 220px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  background: url('@/assets/about-timeline-year-bg.svg') no-repeat center center;
  position: relative;
  margin-bottom: 46px;
}

.about__timeline-decoration-line {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 39px;
  height: 8px;
  background-image: url('@/assets/about-timeline-line.svg');
  background-size: cover;
}

.about__timeline-line-area {
  width: 100%;
  display: grid;
  grid-template-columns: max-content;
  padding-top: 27px;
  overflow-x: auto;
  overflow-y: visible;
  scroll-behavior: smooth;
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.about__timeline-line-area::-webkit-scrollbar {
  display: none;
}

.about__timeline-line-area-line {
  position: relative;
  height: 18px;
  margin-bottom: 12px;
}

/* Tick marks via repeating CSS gradient — spans full grid column width */
.about__timeline-line-area-line::before {
  content: '';
  position: absolute;
  bottom: 3px;
  left: 0;
  right: 0;
  height: 15px;
  background-image: repeating-linear-gradient(to right,
      #CCCCCC 0px,
      #CCCCCC 1px,
      transparent 1px,
      transparent 71px);
}

.about__timeline-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 3px dashed var(--color-timeline-line);
}

.about__timeline-big-year {
  font-family: 'DIN Black', 'Inter', sans-serif;
  font-weight: 900;
  font-size: 50px;
  line-height: 50px;
  color: var(--color-brand);
}

.about__timeline-texture {
  margin-left: 12px;
  margin-bottom: 6px;
}


.about__timeline-nav {
  position: absolute;
  top: 0;
  flex: 0 0 58px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--color-brand);
  border: 1px solid var(--color-nav-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.about__timeline-nav:hover {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
}

.about__timeline-nav--prev {
  left: -29px;
}

.about__timeline-nav--next {
  right: -29px;
}

.about__timeline-years {
  display: flex;
  align-items: center;
  gap: 213px;
  margin-left: 142px;
  padding-right: 21px;
}

.about__timeline-year {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 0;
  transition: var(--transition-smooth);
  &:hover {
    transform: scale(1.03);
    .about__timeline-dot {
      background: var(--color-brand);
    }
    span {
      color: var(--color-brand);
    }
  }
}

.about__timeline-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(204, 204, 204, 0.8);
  transition: background 0.2s;
}

.about__timeline-year--active .about__timeline-dot {
  background: #000000;
}

.about__timeline-year-text {
  font-family: 'DIN Condensed Bold', 'DIN Black', sans-serif;
  font-weight: 500;
  font-size: 28px;
  line-height: 30px;
  color: rgba(204, 204, 204, 0.8);
  transition: color 0.2s;
}

.about__timeline-year--active .about__timeline-year-text {
  font-size: 28px;
  color: #000000;
}

.about__milestones-image {
  flex: 0 0 666px;
  width: 666px;
  height: 380px;
  margin-top: 30px;
  transition: var(--transition-smooth);

  &:hover {
    transform: scale(1.05);
  }
}

.about__milestones-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about__milestones-content {
  display: flex;
  gap: 224px;
  width: 1580px;
  margin: 0 auto;
}

.about__milestones-content-left {
  flex: 1;
}


.about__milestone-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.about__milestone-number {
  font-family: 'DIN Black', 'Inter', sans-serif;
  font-weight: 900;
  font-size: 20px;
  line-height: 20px;
  color: var(--color-milestone-number);
  padding-top: 6px;
  flex-shrink: 0;
  padding-left: 67px;
}

.about__milestone-text {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 19px;
  line-height: 33px;
  color: var(--color-text-milestone);
}

/* ========== 企业文化 Section ========== */
.about__culture {
  position: relative;
  width: 100%;
  background: url('@/assets/about-culture-bg.png') no-repeat center center;
  background-size: cover;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 100px 0;
}

.about__culture-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.about__culture-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about__culture .about__section-header {
  z-index: 1;
  margin-bottom: 112px;
}

.about__values {
  display: flex;
  align-items: stretch;
  width: 1580px;
  height: 580px;
  border-radius: 30px;
  overflow: hidden;
  margin: 0 auto;
}

.about__value-card {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: flex 0.6s cubic-bezier(0.4, 0, 0.2, 1), width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.about__value-card--inactive {
  flex: 0 0 230px;
  width: 230px;
}

.about__value-card--active {
  flex: 1 1 auto;
}

.about__value-collapsed {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  padding: 90px 30px;
  box-sizing: border-box;
  z-index: 1;
  transition: opacity 0.4s ease, visibility 0.4s ease;
}

.about__value-card--active .about__value-collapsed {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.about__value-card--inactive .about__value-collapsed {
  opacity: 1;
  visibility: visible;
}

.about__value-expanded {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow: hidden;
  z-index: 2;
  transition: opacity 0.4s ease 0.2s, visibility 0.4s ease 0.2s;
}

.about__value-card--inactive .about__value-expanded {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.about__value-card--active .about__value-expanded {
  opacity: 1;
  visibility: visible;
}

.about__value-left {
  width: 300px;
  height: 580px;
  background: var(--color-brand);
  display: flex;
  padding: 140px 136px 150px 44px;
  flex-direction: column;
  align-items: flex-start;
  gap: 154px;
}

.about__value-name-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 120px;
}

.about__value-name {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: var(--color-white);
}

.about__value-name-en {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: var(--color-white);
}

.about__value-subtitles {
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 120px;
  margin-top: auto;
}

.about__value-subtitle {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: 18px;
  line-height: 33px;
  color: var(--color-white);
}

.about__value-image {
  flex: 1;
  min-width: 0;
  height: 580px;
  background: linear-gradient(135deg, #0144CB 0%, #0163FF 50%, #3B82F6 100%);
}

.about__value-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.about__value-card:nth-child(1) .about__value-collapsed,
.about__value-card:nth-child(3) .about__value-collapsed {
  background: var(--color-unselected-bg-alt);
}

.about__value-card:nth-child(2) .about__value-collapsed,
.about__value-card:nth-child(4) .about__value-collapsed {
  background: var(--color-unselected-bg);
}

.about__value-card .about__value-collapsed {
  transition: background 0.3s ease;

  &:hover {
    background: var(--color-unselected-bg-hover);
  }
}

.about__value-small {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
}

.about__value-small-content {
  display: flex;
  flex-direction: column;
  gap: 139px;
  width: 100%;
}

.about__value-small-top {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.about__value-small-name {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 26px;
  color: var(--color-black);
}

.about__value-small-en {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 18px;
  color: var(--color-text-milestone);
}

.about__value-small-subs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.about__value-small-sub {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 18px;
  color: var(--color-text-milestone);
}

/* ========== 商业合作 Section ========== */
.about__partners {
  position: relative;
  width: 100%;
  margin: 0 auto;
  background: var(--color-white);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 100px 0 0;
}

.about__partners .about__section-header {
  margin-bottom: 80px;
}

.about__partner-cards {
  display: flex;
  align-items: center;
  gap: 40px;
  width: 1580px;
  margin: 0 auto;
}

.about__partner-card {
  position: relative;
  width: 500px;
  height: 424px;
  border-radius: 30px;
  overflow: hidden;
  background: linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%);
  display: flex;
  flex-direction: column;
  padding: 170px 30px 74px;
  box-sizing: border-box;
  transition: var(--transition-smooth);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 102, 255, 0.08);
    border-color: rgba(0, 102, 255, 0.12);

    .about__partner-icon {
      transform: translateY(-4px) rotate(360deg);
    }
  }
}

.about__partner-card-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about__partner-blur {
  position: absolute;
  left: -1px;
  top: 206px;
  right: 0;
  height: 218px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 36%, rgba(255, 255, 255, 1) 100%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.about__partner-icon {
  z-index: 1;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  transition: var(--transition-smooth);
}

.about__partner-icon-bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.about__partner-icon-bg-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  object-fit: cover;
  display: block;
}

.about__partner-icon-img {
  object-fit: cover;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.about__partner-title {
  z-index: 1;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-text-partner-title);
  margin: 24px 0 0;
  width: 420px;
}

.about__partner-desc {
  z-index: 1;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: var(--color-text-partner-desc);
  margin: 16px 0 0;
  width: 420px;
  white-space: pre-line;
}

/* ========== 联系我们底部栏 ========== */
.about__contact-bar {
  width: 100%;
  height: 300px;
  background: var(--color-contact-bar-bg);

  margin-top: 81px;
}

.about__contact-content {
  max-width: 1580px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 0;
}

.about__contact-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  flex-shrink: 0;
}

.about__contact-heading {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 32px;
  color: var(--color-text-dark);
  margin: 0;
}

.about__contact-text {
  font-family: 'Noto Sans SC', var(--font-body);
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: var(--color-text-subtitle);
  margin: 0;
}

.about__contact-method--phone {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 90px;
  flex-shrink: 0;
}

.about__contact-method--email {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: 60px;
  flex-shrink: 0;
}

.about__contact-icon {
  width: 92px;
  height: 92px;
  border-radius: 60px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.about__contact-detail {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 138px;
}

.about__contact-detail--email {
  width: 243px;
}

.about__contact-label {
  font-family: 'Noto Sans SC', var(--font-body);
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  color: var(--color-text-subtitle);
}

.about__contact-value {
  font-family: 'Noto Sans SC', var(--font-body);
  font-weight: 900;
  font-size: 20px;
  color: var(--color-brand);
}

.about__contact-qr {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  margin-left: auto;
}

.about__contact-qr-code {
  width: 192px;
  height: 192px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--color-white);
}

.about__contact-qr-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about__contact-qr-label {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  color: var(--color-text-subtitle);
  opacity: 0.7;
  white-space: nowrap;
}

/* ========== 加入我们 Section ========== */
.about__join {
  width: 100%;
  margin: 0 auto;
  padding: 100px 0;
  background: var(--color-join-bg);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
}

.about__join-header {
  width: 1216px;
  margin: 0;
}

.about__join-cards {
  display: flex;
  align-items: center;
  gap: 40px;
  width: 1580px;
}

.about__join-card {
  flex: 1;
  min-height: 356px;
  display: flex;
  flex-direction: column;
  padding: 41px 41px 43px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-sizing: border-box;
  transition: var(--transition-smooth);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 102, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.4);
  }
}

.about__join-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 418px;
}

.about__join-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.about__join-card-tag {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: var(--color-white);
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.about__join-card-title {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-white);
  margin: 37px 0 0;
  width: 418px;
}

.about__join-card-desc {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: rgba(255, 255, 255, 0.7);
  margin: auto 0 0;
  width: 418px;
}

.about__join-card-btn {
  padding: 12px 24px;
  border-radius: 4px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  border: none;
  background: var(--color-white);
  color: var(--color-brand-dark);
  transition: all 0.2s;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.1), 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  margin-top: auto;
  align-self: flex-start;
}

.about__join-card-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0px 6px 10px -4px rgba(0, 0, 0, 0.15), 0px 12px 18px -3px rgba(0, 0, 0, 0.15);
}

.about__join-card-btn--outline {
  background: transparent;
  border: 2px solid var(--color-white);
  color: var(--color-white);
  box-shadow: none;
}
</style>