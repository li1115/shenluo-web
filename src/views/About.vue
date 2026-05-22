<script setup lang="ts">
import { ref } from 'vue'

interface Milestone {
  id: number
  month: string
  content: string
}

interface ValueItem {
  id: number
  name: string
  nameEn: string
  subtitles: string[]
  bgColor: string
}

interface PartnerCard {
  id: number
  title: string
  description: string
}

interface StatItem {
  id: number
  number: string
  label: string
}

const stats = ref<StatItem[]>([
  { id: 1, number: '2000+', label: '㎡ GMP标准厂房' },
  { id: 2, number: '100+', label: '专利技术' },
  { id: 3, number: '8亿+', label: '研发投资' },
  { id: 4, number: '8+', label: '核心研发积淀(年)' },
])

const years = ['2026', '2025', '2024', '2023', '2022', '2021', '2020']
const activeYear = ref('2026')

const milestones = ref<Milestone[]>([
  { id: 1, month: '2月', content: '被认定为创新型中小企业、国家级科技型中小企业、国家高新技术企业被认定为创新型中小企业、国家级科技型中小企业、国家高新技术企业' },
  { id: 2, month: '4月', content: '被认定为创新型中小企业、国家级科技型中小企业' },
  { id: 3, month: '6月', content: '被认定为创新型中小企业、国家级科技型中小企业' },
  { id: 4, month: '8月', content: '被认定为创新型中小企业、国家级科技型中小企业' },
  { id: 5, month: '12月', content: '被认定为创新型中小企业、国家级科技型中小企业' },
])

const values = ref<ValueItem[]>([
  {
    id: 1,
    name: '使命',
    nameEn: 'Mission',
    subtitles: ['急患者之所急', '想患者之所想'],
    bgColor: '#F6F6F6',
  },
  {
    id: 2,
    name: '担当',
    nameEn: 'Responsible',
    subtitles: ['侠之大者', '结伴前行'],
    bgColor: '#F6F6F6',
  },
  {
    id: 3,
    name: '高质',
    nameEn: 'High Quality',
    subtitles: ['攀技术之巅', '登品质之峰'],
    bgColor: '#EDEDED',
  },
  {
    id: 4,
    name: '高效',
    nameEn: 'Efficient',
    subtitles: ['雷厉风行', '事半功倍'],
    bgColor: '#F6F6F6',
  },
])

const activeValue = ref(1)

const partnerCards = ref<PartnerCard[]>([
  {
    id: 1,
    title: '渠道合作',
    description: '如果您在神经外科、疼痛科或脊柱外科拥有\n深厚代理销售渠道网络',
  },
  {
    id: 2,
    title: '推广服务',
    description: '如果您的团队具备优秀的专业学术\n推广能力和临床服务能力',
  },
  {
    id: 3,
    title: '战略投资',
    description: '如果您认同国产创新医疗、并愿意长期为\n神经调控领域战略投资',
  },
])
</script>

<template>
  <div class="about">
    <!-- Hero Banner -->
    <section class="about__hero">
      <div class="about__hero-overlay"></div>
      <div class="about__hero-deco-blur about__hero-deco-blur--blue"></div>
      <div class="about__hero-deco-blur about__hero-deco-blur--white"></div>

      <div class="about__hero-content">
        <div class="about__hero-left">
          <div class="about__hero-image">
            <img
              src=""
              alt="关于神络"
              class="about__hero-img"
            />
          </div>
        </div>

        <div class="about__hero-right">
          <h1 class="about__hero-label">关于神络</h1>
          <div class="about__hero-text-group">
            <p class="about__hero-slogan">打破技术垄断，领航全球</p>
            <p class="about__hero-desc">杭州神络医疗科技有限公司成立于2018年，坐落于杭州市余杭区人工智能小镇，是一家专注于神经调控产品研发与生产的高科技企业。拥有近两千平方米的十万级GMP厂房和万级生化实验室，致力于打造国际领先的神经调控产品。自主研发的产品涵盖植入式脊髓神经刺激器（SCS）、外周神经刺激器（PNS）、超小型脊髓神经刺激器（M-SCS）、胫神经刺激（TNS）以及呼吸暂停刺激器等，为患者带来显著的生活质量改善。全球唯一一家同时掌握可充电植入式脉冲发生器IPG、短期半植入、无线携能三大神经调控技术平台的企业，神络医疗持续为医生和患者提供更先进、有效的治疗手段。截至目前，公司已完成C轮融资，融资金额数亿元...</p>
          </div>
        </div>
      </div>

      <div class="about__hero-stats-wrap">
        <div class="about__hero-stats">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="about__hero-stat"
          >
            <span class="about__hero-stat-number">{{ stat.number }}</span>
            <span class="about__hero-stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 神络里程碑 -->
    <section class="about__milestones">
      <div class="about__section-header">
        <h2 class="about__section-heading">神络里程碑</h2>
        <p class="about__section-subtitle">回首过往，每一步都是对精准医疗的执着追求</p>
      </div>

      <div class="about__timeline-wrapper">
        <div class="about__timeline-decoration">
          <span class="about__timeline-big-year">{{ activeYear }}</span>
          <svg class="about__timeline-texture" width="39" height="8" viewBox="0 0 39 8" fill="none">
            <circle cx="2" cy="4" r="1" fill="#B9D7FF" />
            <line x1="7" y1="4" x2="23" y2="4" stroke="#B9D7FF" stroke-width="0.5" />
            <line x1="25" y1="4" x2="31" y2="4" stroke="#B9D7FF" stroke-width="0.5" />
            <circle cx="35" cy="4" r="1.5" fill="#B9D7FF" />
          </svg>
        </div>

        <div class="about__timeline-line"></div>

        <div class="about__timeline-ticks">
          <span
            v-for="(_tick, i) in years"
            :key="'tick-' + i"
            class="about__timeline-tick"
          ></span>
        </div>

        <button class="about__timeline-nav about__timeline-nav--prev" aria-label="上一个年份">
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
            <path d="M5 1L1 6L5 11" stroke="#0163FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="about__timeline-years">
          <button
            v-for="year in years"
            :key="year"
            :class="['about__timeline-year', { 'about__timeline-year--active': activeYear === year }]"
            @click="activeYear = year"
          >
            <span class="about__timeline-dot"></span>
            <span class="about__timeline-year-text">{{ year }}</span>
          </button>
        </div>

        <button class="about__timeline-nav about__timeline-nav--next" aria-label="下一个年份">
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
            <path d="M1 1L5 6L1 11" stroke="#0163FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="about__milestones-image">
          <img
            src=""
            alt="神络里程碑"
            class="about__milestones-img"
          />
        </div>
      </div>

      <div class="about__milestones-content">
        <div
          v-for="milestone in milestones"
          :key="milestone.id"
          class="about__milestone-item"
        >
          <span class="about__milestone-number">{{ String(milestone.id).padStart(2, '0') }}</span>
          <span class="about__milestone-text">{{ milestone.month }}：{{ milestone.content }}</span>
        </div>
      </div>
    </section>

    <!-- 企业文化 -->
    <section class="about__culture">
      <div class="about__culture-bg">
        <img src="" alt="" class="about__culture-bg-img" />
      </div>
      <div class="about__section-header">
        <h2 class="about__section-heading">企业文化</h2>
        <p class="about__section-subtitle">内化于心，外化于行，以患者为核心的价值观体系</p>
      </div>

      <div class="about__values">
        <div
          v-for="value in values"
          :key="value.id"
          :class="['about__value-card', { 'about__value-card--active': activeValue === value.id, 'about__value-card--inactive': activeValue !== value.id }]"
          @click="activeValue = value.id"
        >
          <div class="about__value-collapsed">
            <div class="about__value-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="4.76" width="70.48" height="80" rx="8" fill="#CCCCCC" fill-opacity="0.2" />
                <rect x="20" y="22" width="39" height="26.78" rx="4" fill="#CCCCCC" fill-opacity="0.3" />
              </svg>
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
              <img
                src=""
                alt=""
                class="about__value-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 商业合作 -->
    <section class="about__partners">
      <div class="about__section-header">
        <h2 class="about__section-heading">诚邀携手，共创未来</h2>
        <p class="about__section-subtitle about__section-subtitle--narrow">我们正在积极寻找与神络医疗价值观契合、优势互补的渠道、推广和战略投资伙伴，共同定义神经调控新未</p>
      </div>

      <div class="about__partner-cards">
        <div
          v-for="card in partnerCards"
          :key="card.id"
          class="about__partner-card"
        >
          <img src="" alt="" class="about__partner-card-bg" />
          <div class="about__partner-blur"></div>
          <div class="about__partner-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="22" y="22" width="36" height="36" rx="6" stroke="#0163FF" stroke-width="3" fill="none" />
              <path d="M30 35L37 42L50 29" stroke="#0163FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="about__partner-title">{{ card.title }}</h3>
          <p class="about__partner-desc">{{ card.description }}</p>
        </div>
      </div>

      <div class="about__contact-bar">
        <div class="about__contact-info">
          <h3 class="about__contact-heading">期待与您对话</h3>
          <p class="about__contact-text">
            我们深知，每一次使用都关乎健康与信任。因此，<br />
            从产品咨询到日常维护从操作指导到售后保障<br />
            我们为您搭建起全方位的支持体系。<br />
            专业客服团队随时待命，全国服务网点便捷可达。
          </p>
        </div>

        <div class="about__contact-method--phone">
            <div class="about__contact-icon">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <path d="M8.75 5.25H33.25C34.58 5.25 35.75 6.42 35.75 7.75V34.25C35.75 35.58 34.58 36.75 33.25 36.75H8.75C7.42 36.75 6.25 35.58 6.25 34.25V7.75C6.25 6.42 7.42 5.25 8.75 5.25Z" stroke="#0163FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 12.25H28C29.1 12.25 30 13.15 30 14.25V27.75C30 28.85 29.1 29.75 28 29.75H14C12.9 29.75 12 28.85 12 27.75V14.25C12 13.15 12.9 12.25 14 12.25Z" stroke="#0163FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M21 29.75V33.25" stroke="#0163FF" stroke-width="2" stroke-linecap="round" />
                <path d="M14 33.25H28" stroke="#0163FF" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <div class="about__contact-detail">
              <span class="about__contact-label">电话热线</span>
              <span class="about__contact-value">400-808-5561</span>
            </div>
          </div>

          <div class="about__contact-method--email">
            <div class="about__contact-icon">
              <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
                <rect x="1" y="1" width="40" height="32" rx="3" stroke="#0163FF" stroke-width="2.5" />
                <path d="M1 7L19.4 19.2C20.3 19.8 21.7 19.8 22.6 19.2L41 7" stroke="#0163FF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div class="about__contact-detail about__contact-detail--email">
              <span class="about__contact-label">企业邮箱</span>
              <span class="about__contact-value">support@seeneuro.com</span>
            </div>
          </div>

        <div class="about__contact-qr">
          <div class="about__contact-qr-code">
            <img
              src=""
              alt="QR Code"
              class="about__contact-qr-img"
            />
          </div>
          <span class="about__contact-qr-label">扫描添加销售总监微信</span>
        </div>
      </div>
    </section>

    <!-- 加入我们 -->
    <section class="about__join">
      <div class="about__section-header about__join-header">
        <h2 class="about__section-heading about__section-heading--light">加入我们</h2>
        <p class="about__section-subtitle about__section-subtitle--light">寻找志同道合的你，共同开启生命科技新篇章</p>
      </div>

      <div class="about__join-cards">
        <div class="about__join-card">
          <div class="about__join-card-header">
            <div class="about__join-card-icon">
              <svg width="33" height="27" viewBox="0 0 33 27" fill="none">
                <rect x="8" y="10" width="17" height="17" rx="2" stroke="white" stroke-width="2" fill="none" />
                <rect x="4" y="2" width="25" height="17" rx="2" stroke="white" stroke-width="2" fill="none" />
              </svg>
            </div>
            <span class="about__join-card-tag">高精尖人才</span>
          </div>
          <h3 class="about__join-card-title">博士后工作站</h3>
          <p class="about__join-card-desc">神络医疗设立博士后工作站，旨在吸引全球顶尖神经科学、微电子及材料学专家。提供行业领先的研发资源与实验环境，推动前沿技术的临床转化。</p>
          <button class="about__join-card-btn">立即申请</button>
        </div>

        <div class="about__join-card">
          <div class="about__join-card-header">
            <div class="about__join-card-icon">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <path d="M8 1H22C23.1 1 24 1.9 24 3V7H6V3C6 1.9 6.9 1 8 1Z" stroke="white" stroke-width="2" />
                <path d="M3 7H27V25C27 26.7 26.1 28 24 28H6C3.9 28 3 26.7 3 25V7Z" stroke="white" stroke-width="2" />
                <line x1="12" y1="14" x2="18" y2="14" stroke="white" stroke-width="2" stroke-linecap="round" />
                <line x1="15" y1="11" x2="15" y2="17" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <span class="about__join-card-tag">市场与职能</span>
          </div>
          <h3 class="about__join-card-title">销售及职能部门职位</h3>
          <p class="about__join-card-desc">我们寻找具备高度专业素养、敏锐市场触觉及强烈使命感的伙伴。无论您是经验丰富的行业精英，还是充满活力的职场新秀，神络医疗都为您提供广阔的成长舞台。</p>
          <button class="about__join-card-btn about__join-card-btn--outline">查看职位</button>
        </div>

        <div class="about__join-card">
          <div class="about__join-card-header">
            <div class="about__join-card-icon">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="10" r="6" stroke="white" stroke-width="2" />
                <path d="M6 28C6 22.5 10 18 15 18C20 18 24 22.5 24 28" stroke="white" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <span class="about__join-card-tag">其他</span>
          </div>
          <h3 class="about__join-card-title">其他</h3>
          <p class="about__join-card-desc">我们寻找具备高度专业素养、敏锐市场触觉及强烈使命感的伙伴。无论您是经验丰富的行业精英，还是充满活力的职场新秀，神络医疗都为您提供广阔的成长舞台。</p>
          <button class="about__join-card-btn about__join-card-btn--outline">查看职位</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
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
  --color-unselected-bg: #F6F6F6;
  --color-unselected-bg-alt: #EDEDED;
  --font-heading: 'Alibaba PuHuiTi 3.0', 'PingFang SC', sans-serif;
  --font-body: 'PingFang SC', 'Noto Sans SC', sans-serif;
}

/* ========== Hero Banner ========== */
.about__hero {
  position: relative;
  width: 1920px;
  height: 1000px;
  margin: 0 auto;
  background: linear-gradient(180deg, rgba(187, 212, 243, 1) 0%, rgba(239, 246, 255, 1) 100%);
  overflow: hidden;
  box-sizing: border-box;
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
  position: absolute;
  left: 0;
  top: 160px;
  width: 100%;
  z-index: 2;
}

.about__hero-left {
  position: absolute;
  left: 170px;
  top: 0;
}

.about__hero-image {
  width: 680px;
  height: 427px;
  border-radius: 30px;
  overflow: hidden;
  background: linear-gradient(135deg, #E8F0FE 0%, #D4E4FD 100%);
}

.about__hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.about__hero-right {
  position: absolute;
  right: 170px;
  top: 0;
  width: 763px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 48px;
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

.about__hero-stats-wrap {
  position: absolute;
  left: 156px;
  top: 774px;
  z-index: 2;
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
  position: relative;
  width: 1920px;
  height: 967px;
  margin: 0 auto;
  background: var(--color-white);
  box-sizing: border-box;
}

.about__milestones .about__section-header {
  position: absolute;
  left: 352px;
  top: 100px;
}

.about__timeline-wrapper {
  position: absolute;
  left: 0;
  top: 330px;
  width: 100%;
}

.about__timeline-decoration {
  position: absolute;
  left: 116px;
  top: 122px;
  display: flex;
  align-items: flex-end;
  gap: 0;
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

.about__timeline-line {
  position: absolute;
  left: 170px;
  right: 170px;
  top: 13px;
  border-top: 3px dashed var(--color-timeline-line);
}

.about__timeline-ticks {
  position: absolute;
  left: 190px;
  top: 0;
  display: flex;
  align-items: center;
  gap: 70px;
}

.about__timeline-tick {
  width: 1px;
  height: 15px;
  background: #CCCCCC;
}

.about__timeline-nav {
  position: absolute;
  top: -25px;
  width: 58px;
  height: 58px;
  border-radius: 29px;
  background: var(--color-white);
  border: 1px solid var(--color-nav-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.about__timeline-nav:hover {
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
}

.about__timeline-nav--prev {
  left: 160px;
  z-index: 2;
}

.about__timeline-nav--next {
  right: 160px;
  z-index: 2;
}

.about__timeline-years {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 168px;
  margin-top: 27px;
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
}

.about__timeline-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-timeline-inactive);
  transition: background 0.2s;
}

.about__timeline-year--active .about__timeline-dot {
  background: var(--color-black);
}

.about__timeline-year-text {
  font-family: 'DINCond-Bold', 'Inter', sans-serif;
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;
  color: var(--color-timeline-inactive);
  transition: color 0.2s;
}

.about__timeline-year--active .about__timeline-year-text {
  font-size: 28px;
  color: var(--color-black);
}

.about__milestones-image {
  position: absolute;
  right: 170px;
  top: 157px;
  width: 666px;
  height: 380px;
  border-radius: 12px;
  overflow: hidden;
  background: #EBEEF3;
}

.about__milestones-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.about__milestones-content {
  position: absolute;
  left: 170px;
  top: 552px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 690px;
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
  width: 1920px;
  height: 992px;
  margin: 0 auto;
  background: linear-gradient(180deg, var(--color-culture-bg-start) 0%, var(--color-culture-bg-end) 100%);
  box-sizing: border-box;
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
  position: absolute;
  left: 352px;
  top: 100px;
  z-index: 1;
}

.about__values {
  position: absolute;
  left: 170px;
  top: 312px;
  display: flex;
  align-items: stretch;
  gap: 20px;
  width: 1580px;
  height: 580px;
  border-radius: 30px;
  overflow: hidden;
}

.about__value-card {
  position: relative;
  cursor: pointer;
  border-radius: 30px;
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
  border-radius: 30px;
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
   border-radius: 30px;
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
  flex-direction: column;
  padding: 0;
  box-sizing: border-box;
  flex-shrink: 0;
}

.about__value-name-group {
  position: absolute;
  left: 44px;
  top: 140px;
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
  position: absolute;
  left: 44px;
  top: 357px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 120px;
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

.about__value-card:nth-child(1) .about__value-collapsed {
  background: var(--color-unselected-bg);
}

.about__value-card:nth-child(2) .about__value-collapsed {
  background: var(--color-unselected-bg-alt);
}

.about__value-card:nth-child(3) .about__value-collapsed {
  background: var(--color-unselected-bg);
}

.about__value-card:nth-child(4) .about__value-collapsed {
  background: var(--color-unselected-bg-alt);
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
  width: 1920px;
  height: 1141px;
  margin: 0 auto;
  background: var(--color-partners-bg);
  box-sizing: border-box;
}

.about__partners .about__section-header {
  position: absolute;
  left: 352px;
  top: 100px;
}

.about__partner-cards {
  position: absolute;
  left: 170px;
  top: 336px;
  display: flex;
  align-items: center;
  gap: 40px;
  width: 1580px;
}

.about__partner-card {
  position: relative;
  width: 500px;
  height: 424px;
  border-radius: 30px;
  overflow: hidden;
  background: linear-gradient(180deg, #EEF2FF 0%, #FFFFFF 100%);
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
  position: absolute;
  left: 30px;
  top: 170px;
  z-index: 1;
}

.about__partner-title {
  position: absolute;
  left: 30px;
  top: 274px;
  z-index: 1;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-text-partner-title);
  margin: 0;
  width: 420px;
}

.about__partner-desc {
  position: absolute;
  left: 30px;
  top: 322px;
  z-index: 1;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: var(--color-text-partner-desc);
  margin: 0;
  width: 420px;
  white-space: pre-line;
}

/* ========== 联系我们底部栏 ========== */
.about__contact-bar {
  position: absolute;
  left: 0;
  top: 841px;
  width: 1920px;
  height: 300px;
  background: var(--color-contact-bar-bg);
  border-radius: 36px;
  box-sizing: border-box;
}

.about__contact-info {
  position: absolute;
  left: 170px;
  top: 67px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
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
  position: absolute;
  left: 612px;
  top: 104px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.about__contact-method--email {
  position: absolute;
  left: 922px;
  top: 104px;
  display: flex;
  align-items: center;
  gap: 20px;
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
  position: absolute;
  left: 1556px;
  top: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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
  width: 1920px;
  margin: 0 auto;
  padding: 100px 170px;
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
  height: 356px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-sizing: border-box;
}

.about__join-card-header {
  position: absolute;
  left: 41px;
  top: 41px;
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
  position: absolute;
  left: 41px;
  top: 105px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: var(--color-white);
  margin: 0;
  width: 418px;
}

.about__join-card-desc {
  position: absolute;
  left: 41px;
  top: 153px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  width: 418px;
}

.about__join-card-btn {
  position: absolute;
  left: 41px;
  top: 263px;
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

/* ========== Responsive ========== */
@media (max-width: 1600px) {
  .about__hero,
  .about__milestones,
  .about__culture,
  .about__partners,
  .about__join {
    width: 100%;
    padding-left: 40px;
    padding-right: 40px;
  }

  .about__hero {
    height: auto;
    min-height: 600px;
    padding: 60px 40px;
  }

  .about__hero-content {
    position: relative;
    left: auto;
    top: auto;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  .about__hero-left,
  .about__hero-right {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    width: auto;
  }

  .about__hero-image {
    width: 100%;
    max-width: 680px;
    height: auto;
    aspect-ratio: 680 / 427;
  }

  .about__hero-right {
    align-items: center;
    text-align: center;
    max-width: 100%;
  }

  .about__hero-label,
  .about__hero-slogan,
  .about__hero-desc {
    text-align: center;
  }

  .about__hero-stats-wrap {
    position: relative;
    left: auto;
    top: auto;
    margin-top: 40px;
  }

  .about__hero-stats {
    flex-wrap: wrap;
    gap: 20px;
  }

  .about__hero-stat {
    width: auto !important;
    min-width: 200px;
  }

  .about__hero-stat-number {
    font-size: 48px;
    line-height: 48px;
  }

  .about__hero-stat-label {
    font-size: 16px;
    line-height: 22px;
  }

  .about__milestones {
    height: auto;
    padding: 60px 40px;
  }

  .about__milestones .about__section-header,
  .about__culture .about__section-header,
  .about__partners .about__section-header {
    position: relative;
    left: auto;
    top: auto;
  }

  .about__timeline-wrapper {
    position: relative;
    left: auto;
    top: auto;
    margin-top: 40px;
  }

  .about__milestones-content {
    position: relative;
    left: auto;
    top: auto;
    margin-top: 40px;
    width: 100%;
  }

  .about__milestones-image {
    position: relative;
    right: auto;
    top: auto;
    width: 100%;
    max-width: 666px;
    height: auto;
    aspect-ratio: 666 / 380;
    margin: 20px auto 0;
  }

  .about__timeline-decoration {
    position: relative;
    left: auto;
    top: auto;
    justify-content: center;
    margin-bottom: 20px;
  }

  .about__timeline-nav--prev {
    left: 0;
  }

  .about__timeline-nav--next {
    right: 0;
  }

  .about__timeline-years {
    gap: 60px;
  }

  .about__timeline-ticks {
    left: 20px;
    gap: 30px;
  }

  .about__timeline-line {
    left: 40px;
    right: 40px;
  }

  .about__culture {
    height: auto;
    padding: 60px 40px;
  }

  .about__values {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    flex-wrap: wrap;
    margin-top: 40px;
  }

  .about__value-card--active {
    flex-basis: 100%;
    min-width: 600px;
  }

  .about__value-card:not(.about__value-card--active) {
    flex: 1;
    min-width: 200px;
  }

  .about__partners {
    height: auto;
    padding: 60px 40px;
  }

  .about__partner-cards {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 40px;
  }

  .about__contact-bar {
    position: relative;
    left: auto;
    top: auto;
    width: calc(100% + 80px);
    margin-left: -40px;
    margin-right: -40px;
    height: auto;
    padding: 40px;
    border-radius: 36px 36px 0 0;
    margin-top: 40px;
  }

  .about__contact-info,
  .about__contact-method--phone,
  .about__contact-method--email,
  .about__contact-qr {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
  }

  .about__contact-method--phone,
  .about__contact-method--email {
    margin-top: 30px;
  }

  .about__contact-qr {
    margin-top: 30px;
  }

  .about__value-left {
    position: relative;
  }

  .about__value-name-group,
  .about__value-subtitles {
    position: relative;
    left: auto;
    top: auto;
    padding: 30px;
  }

  .about__value-left {
    height: auto;
    padding-bottom: 30px;
  }

  .about__section-header,
  .about__values,
  .about__partner-cards,
  .about__join-cards {
    width: 100%;
    max-width: 1216px;
  }

  .about__join {
    width: 100%;
  }

  .about__join-header {
    width: 100%;
  }

  .about__join-cards {
    flex-wrap: wrap;
  }

  .about__join-card {
    min-width: 300px;
  }

  .about__join-card-header {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    margin-bottom: 24px;
  }

  .about__join-card-title {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    margin-bottom: 16px;
  }

  .about__join-card-desc {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    margin-bottom: 20px;
  }

  .about__join-card-btn {
    position: relative;
    left: auto;
    top: auto;
  }
}

@media (max-width: 768px) {
  .about__section-heading {
    font-size: 36px;
  }

  .about__hero {
    min-height: auto;
    padding: 40px 20px;
  }

  .about__hero-image {
    max-width: 100%;
  }

  .about__hero-label {
    font-size: 32px;
  }

  .about__hero-slogan {
    font-size: 22px;
  }

  .about__hero-desc {
    font-size: 14px;
    line-height: 24px;
  }

  .about__hero-stat-number {
    font-size: 36px;
    line-height: 36px;
  }

  .about__hero-stat-label {
    font-size: 14px;
    line-height: 18px;
  }

  .about__timeline-years {
    gap: 30px;
  }

  .about__timeline-year-text {
    font-size: 16px;
  }

  .about__value-card--active {
    flex-direction: column;
    min-width: auto;
  }

  .about__value-left {
    width: 100%;
    height: auto;
    padding: 30px;
  }

  .about__value-image {
    width: 100%;
    height: 300px;
  }

  .about__value-name-group,
  .about__value-subtitles {
    padding: 20px;
  }

  .about__contact-bar {
    padding: 30px 20px;
  }
}
</style>