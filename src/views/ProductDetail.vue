<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import product1 from '@/assets/product-1.png'
import product2 from '@/assets/product-2.png'
import product3 from '@/assets/product-3.png'

const route = useRoute()
const router = useRouter()

interface SpecRow {
  label: string
  value: string
}

interface FeatureCard {
  title: string
  highlight: { label: string; value: string }
  variant: 'gradient' | 'solid'
}

interface ProductDetail {
  id: number
  name: string
  englishName: string
  description: string
  image: string
  specsLeft: SpecRow[]
  specsRight: SpecRow[]
  featureCards: FeatureCard[]
  manualTitle: string
  manualDesc: string
  sectionHeading1: string
  sectionHeading2: string
}

const products: ProductDetail[] = [
  {
    id: 1,
    name: '植入式胫神经刺激系统TNS',
    englishName: 'Spinal Cord Stimulation . SCS',
    description: '脊髓神经刺激系统（Spinal Cord Stimulation，SCS），是一种成熟的疼痛治疗方法，已被医生使用了50多年。作为微创可逆的先进医疗技术，旨在缓解疼痛，提高患者生活能力和生活质量。主要用于治疗躯干、四肢的慢性顽固性疼痛（如腰椎术后疼痛综合征、复杂性区域疼痛综合征等）。\n通过微创植入电极至脊髓硬膜外腔',
    image: product1,
    specsLeft: [
      { label: '长（mm）', value: '55' },
      { label: '宽（mm）', value: '48' },
      { label: '厚（mm）', value: '9.4' },
      { label: '重量（g）', value: '37.7' },
    ],
    specsRight: [
      { label: '发热温度限值', value: '发热温度不超过39℃' },
      { label: '通道数', value: '左：8  右：8' },
      { label: '重量（g）', value: '37.7' },
      { label: '体积（cm³）', value: '24.8' },
    ],
    featureCards: [
      {
        title: '时可调，精准护航',
        highlight: { label: '重', value: '37.7g' },
        variant: 'gradient',
      },
      {
        title: '微小介入，轻松愈见',
        highlight: { label: '微', value: '2mm' },
        variant: 'solid',
      },
      {
        title: '广阔频宽，潜力突破',
        highlight: { label: '频', value: '10KHz' },
        variant: 'solid',
      },
    ],
    manualTitle: '脊髓神经刺激系统SCS产品手册',
    manualDesc: '了解 SCS，这是一种脊髓刺激系统，有助于治疗某些类型的慢性顽固性疼痛。',
    sectionHeading1: '产品特色',
    sectionHeading2: '如何运作',
  },
  {
    id: 2,
    name: '外周围神经刺激系统PNS',
    englishName: 'Peripheral Nerve Stimulation . PNS',
    description: '外周围神经刺激系统（Peripheral Nerve Stimulation, PNS），是一种创新的神经调控技术，通过靶向刺激外周神经，精准干预神经系统异常活动，为药物难治性神经疾病患者提供新的治疗选择。',
    image: product2,
    specsLeft: [
      { label: '长（mm）', value: '45' },
      { label: '宽（mm）', value: '32' },
      { label: '厚（mm）', value: '6.8' },
      { label: '重量（g）', value: '15.2' },
    ],
    specsRight: [
      { label: '发热温度限值', value: '发热温度不超过38℃' },
      { label: '通道数', value: '左：4  右：4' },
      { label: '重量（g）', value: '15.2' },
      { label: '体积（cm³）', value: '9.8' },
    ],
    featureCards: [
      {
        title: '闭环智能调控',
        highlight: { label: '精', value: '99.9%' },
        variant: 'gradient',
      },
      {
        title: '微创植入恢复快',
        highlight: { label: '微', value: '2mm' },
        variant: 'solid',
      },
      {
        title: '无线充电超长续航',
        highlight: { label: '续', value: '30天' },
        variant: 'solid',
      },
    ],
    manualTitle: '外周围神经刺激系统PNS产品手册',
    manualDesc: '了解 PNS，这是一种外周神经刺激系统，有助于治疗特发性震颤及癫痫等神经疾病。',
    sectionHeading1: '产品特色',
    sectionHeading2: '如何运作',
  },
  {
    id: 3,
    name: '植入式胫神经刺激系统TNS',
    englishName: 'Tibial Nerve Stimulation . TNS',
    description: '植入式胫神经刺激系统（Tibial Nerve Stimulation, TNS），是一种用于治疗膀胱功能障碍的先进神经调控技术。通过刺激胫神经，调节膀胱功能，改善患者排尿控制和盆底功能。',
    image: product3,
    specsLeft: [
      { label: '长（mm）', value: '38' },
      { label: '宽（mm）', value: '25' },
      { label: '厚（mm）', value: '5.2' },
      { label: '重量（g）', value: '8.9' },
    ],
    specsRight: [
      { label: '发热温度限值', value: '发热温度不超过37℃' },
      { label: '通道数', value: '左：2  右：2' },
      { label: '重量（g）', value: '8.9' },
      { label: '体积（cm³）', value: '4.9' },
    ],
    featureCards: [
      {
        title: '超微型无感佩戴',
        highlight: { label: '小', value: '15mm' },
        variant: 'gradient',
      },
      {
        title: '精准靶向副作用小',
        highlight: { label: '准', value: '0.1mm' },
        variant: 'solid',
      },
      {
        title: '手机程控操作便捷',
        highlight: { label: '易', value: '一键' },
        variant: 'solid',
      },
    ],
    manualTitle: '植入式胫神经刺激系统TNS产品手册',
    manualDesc: '了解 TNS，这是一种胫神经刺激系统，有助于治疗膀胱功能障碍及盆底功能问题。',
    sectionHeading1: '产品特色',
    sectionHeading2: '如何运作',
  },
]

const product = computed(() => {
  const id = Number(route.params.id) || 1
  return products.find(p => p.id === id) || products[0]
})

const goToProducts = () => {
  router.push('/products')
}
</script>

<template>
  <div class="product-detail">
    <div class="product-detail__breadcrumb">
      <span class="product-detail__breadcrumb-link" @click="goToProducts">产品展示</span>
      <span>/</span>
      <span class="product-detail__breadcrumb-current">产品详情</span>
    </div>

    <div class="product-detail__hero">
      <div class="product-detail__hero-image">
        <img :src="product.image" :alt="product.name" class="product-detail__hero-img" />
      </div>
      <div class="product-detail__hero-info">
        <p class="product-detail__hero-eng">{{ product.englishName }}</p>
        <h1 class="product-detail__hero-name">{{ product.name }}</h1>
        <p class="product-detail__hero-desc">{{ product.description }}</p>
      </div>
    </div>

    <div class="product-detail__section-heading">{{ product.sectionHeading1 }}</div>

    <div class="product-detail__feature-cards">
      <div
        v-for="(card, idx) in product.featureCards"
        :key="idx"
        class="product-detail__feature-card"
      >
        <div
          class="product-detail__feature-cover"
          :class="card.variant === 'gradient' ? 'product-detail__feature-cover--gradient' : 'product-detail__feature-cover--solid'"
        >
          <div class="product-detail__feature-glow" />
          <div class="product-detail__feature-highlight">
            <span class="product-detail__feature-highlight-label">{{ card.highlight.label }}</span>
            <span class="product-detail__feature-highlight-num">{{ card.highlight.value.replace(/[^\d.]/g, '') }}</span>
            <span class="product-detail__feature-highlight-unit">{{ card.highlight.value.replace(/[\d.]/g, '') }}</span>
          </div>
        </div>
        <div class="product-detail__feature-text">
          <p class="product-detail__feature-title">{{ card.title }}</p>
        </div>
      </div>
    </div>

    <div class="product-detail__specs-section">
      <div class="product-detail__specs-inner">
        <div class="product-detail__specs-left">
          <h3 class="product-detail__specs-heading">技术规格</h3>
          <div class="product-detail__specs-tables">
            <div class="product-detail__specs-table product-detail__specs-table--left">
              <div
                v-for="(row, rIdx) in product.specsLeft"
                :key="'l' + rIdx"
                class="product-detail__specs-row"
                :class="rIdx % 2 === 0 ? 'product-detail__specs-row--alt' : 'product-detail__specs-row--white'"
              >
                <div class="product-detail__specs-cell product-detail__specs-cell--label">{{ row.label }}</div>
                <div class="product-detail__specs-cell product-detail__specs-cell--value">{{ row.value }}</div>
              </div>
            </div>
            <div class="product-detail__specs-table product-detail__specs-table--right">
              <div
                v-for="(row, rIdx) in product.specsRight"
                :key="'r' + rIdx"
                class="product-detail__specs-row"
                :class="rIdx % 2 === 0 ? 'product-detail__specs-row--alt' : 'product-detail__specs-row--white'"
              >
                <div class="product-detail__specs-cell product-detail__specs-cell--label">{{ row.label }}</div>
                <div class="product-detail__specs-cell product-detail__specs-cell--value">{{ row.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-detail__section-heading">{{ product.sectionHeading2 }}</div>

    <div class="product-detail__manual">
      <div class="product-detail__manual-card">
        <div class="product-detail__manual-image-box">
          <div class="product-detail__manual-ellipse" />
          <img :src="product.image" :alt="product.manualTitle" class="product-detail__manual-img" />
        </div>
        <div class="product-detail__manual-content">
          <div class="product-detail__manual-text">
            <h4 class="product-detail__manual-title">{{ product.manualTitle }}</h4>
            <p class="product-detail__manual-desc">{{ product.manualDesc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-brand: #0163FF;
  --color-brand-dark: #0D6AFF;
  --color-brand-light: #E0ECFF;
  --color-text-heading: #181C20;
  --color-text-body: #666666;
  --color-text-muted: #999999;
  --color-text-manual-desc: #64748B;
  --color-bg-page: #FFFFFF;
  --color-bg-section: #F7F9FE;
  --color-bg-table-alt: #F4F4F4;
  --color-bg-table-cell: #EBEBEB;
  --color-border-table: #F1F5F9;
  --color-manual-bg: #081F43;
  --color-manual-border: #F6F6F6;
  --color-gradient-start: rgba(169, 202, 255, 1);
  --color-gradient-end: rgba(71, 138, 245, 1);
  --color-gradient-cover: #0D6AFF;
  --font-heading: 'Alibaba PuHuiTi 3.0', 'PingFang SC', sans-serif;
  --font-body: 'PingFang SC', 'Noto Sans SC', sans-serif;
  --font-display: 'DIN Black', 'DIN', 'PingFang SC', sans-serif;

  background: var(--color-bg-page);
}

/* ========== Breadcrumb ========== */
.product-detail__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 36px 160px 0;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.0536em;
  color: var(--color-text-muted);
}
.product-detail__breadcrumb-link {
  cursor: pointer;
  transition: color 0.2s;
}
.product-detail__breadcrumb-link:hover {
  color: var(--color-brand);
}
.product-detail__breadcrumb-current {
  color: var(--color-text-muted);
}

/* ========== Hero ========== */
.product-detail__hero {
  display: flex;
  align-items: flex-start;
  padding: 0 160px;
  margin-top: 30px;
  gap: 50px;
}
.product-detail__hero-image {
  width: 710px;
  height: 500px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.product-detail__hero-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.product-detail__hero-info {
  width: 834px;
  padding-top: 80px;
}
.product-detail__hero-eng {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.125em;
  color: var(--color-black);
  margin-bottom: 12px;
}
.product-detail__hero-name {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 60px;
  line-height: 74px;
  color: var(--color-black);
  margin-bottom: 24px;
}
.product-detail__hero-desc {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 24px;
  line-height: 38px;
  color: var(--color-text-body);
  max-width: 702px;
  white-space: pre-line;
}

/* ========== Section Heading ========== */
.product-detail__section-heading {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 36px;
  line-height: 40px;
  letter-spacing: -0.0208em;
  color: var(--color-text-heading);
  padding: 0 160px;
  margin-top: 150px;
}

/* ========== Feature Cards ========== */
.product-detail__feature-cards {
  display: flex;
  justify-content: flex-start;
  gap: 70px;
  padding: 100px 230px 0;
}
.product-detail__feature-card {
  width: 440px;
  background: var(--color-white);
  border-radius: 30px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
}
.product-detail__feature-cover {
  position: relative;
  width: 440px;
  height: 424px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-detail__feature-cover--gradient {
  background: #0D6AFF;
}
.product-detail__feature-cover--solid {
  background: #81B1FF;
}
.product-detail__feature-glow {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 170px;
  height: 73px;
  border-radius: 50%;
  filter: blur(20px);
}
.product-detail__feature-cover--gradient .product-detail__feature-glow {
  background: #0D6AFF;
}
.product-detail__feature-cover--solid .product-detail__feature-glow {
  background: rgba(255, 255, 255, 0.3);
}
.product-detail__feature-highlight {
  position: absolute;
  top: 10px;
  right: 40px;
  display: flex;
  align-items: baseline;
  gap: 2px;
}
.product-detail__feature-cover--gradient .product-detail__feature-highlight {
  color: var(--color-brand);
}
.product-detail__feature-cover--solid .product-detail__feature-highlight {
  color: var(--color-white);
}
.product-detail__feature-highlight-label {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 11px;
}
.product-detail__feature-highlight-num {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 58px;
  line-height: 1;
}
.product-detail__feature-highlight-unit {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 18px;
}
.product-detail__feature-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  padding: 30px;
}
.product-detail__feature-title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 32px;
  line-height: 36px;
  color: var(--color-black);
  text-align: center;
}

/* ========== Specs Section ========== */
.product-detail__specs-section {
  background: var(--color-bg-section);
  margin-top: 80px;
  padding: 80px 0;
}
.product-detail__specs-inner {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 230px;
}
.product-detail__specs-heading {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 32px;
  line-height: 36px;
  letter-spacing: -0.0234em;
  color: var(--color-text-heading);
  margin-bottom: 40px;
}
.product-detail__specs-tables {
  display: flex;
  gap: 100px;
}
.product-detail__specs-table {
  width: 730px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.04);
}
.product-detail__specs-table--left {
  border-radius: 8px 0 0 8px;
}
.product-detail__specs-table--right {
  border-radius: 0 8px 8px 0;
}
.product-detail__specs-row {
  display: flex;
  height: 58px;
  border-bottom: 1px solid var(--color-border-table);
}
.product-detail__specs-row:last-child {
  border-bottom: none;
}
.product-detail__specs-row--alt {
  background: var(--color-bg-table-alt);
}
.product-detail__specs-row--white {
  background: var(--color-bg-table-cell);
}
.product-detail__specs-cell {
  display: flex;
  align-items: center;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  height: 58px;
  padding: 0 16px;
}
.product-detail__specs-cell--label {
  width: 260px;
  flex-shrink: 0;
  background: var(--color-bg-table-cell);
  color: var(--color-text-body);
}
.product-detail__specs-cell--value {
  flex: 1;
  padding: 0 16px;
  color: var(--color-black);
}

/* ========== Product Manual ========== */
.product-detail__manual {
  padding: 100px 230px 100px;
}
.product-detail__manual-card {
  display: flex;
  align-items: center;
  gap: 30px;
}
.product-detail__manual-image-box {
  position: relative;
  width: 92px;
  height: 118px;
  flex-shrink: 0;
  background: var(--color-manual-bg);
  border: 1px solid var(--color-manual-border);
  border-radius: 10px;
  box-shadow: 2px 4px 14px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.product-detail__manual-ellipse {
  position: absolute;
  left: -9px;
  top: 55px;
  width: 118px;
  height: 97px;
  border-radius: 50%;
  background: linear-gradient(238deg, rgba(113, 247, 249, 1) 16%, rgba(0, 60, 255, 1) 83%);
}
.product-detail__manual-img {
  position: relative;
  z-index: 1;
  width: 68px;
  height: auto;
  object-fit: contain;
}
.product-detail__manual-content {
  display: flex;
  flex-direction: column;
}
.product-detail__manual-text {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.product-detail__manual-title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 28px;
  line-height: 28px;
  color: var(--color-brand);
}
.product-detail__manual-desc {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: var(--color-text-manual-desc);
  max-width: 567px;
}
</style>