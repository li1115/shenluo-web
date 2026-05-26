<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import product1 from '@/assets/product-1.png'
import product2 from '@/assets/product-2.png'
import product3 from '@/assets/product-3.png'
import productD1 from '@/assets/product-d-1.png'
import productD2 from '@/assets/product-d-2.png'
import productD3 from '@/assets/product-d-3.png'

const { t } = useI18n()
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
  image: string
}

interface ProductDetail {
  id: number
  name: string
  englishName: string
  description: string
  image: string
}

interface ProductBaseDetail {
  specsLeft: SpecRow[]
  specsRight: SpecRow[]
  featureCards: FeatureCard[]
  sectionHeading1: string
}

const baseData = computed<ProductBaseDetail>(() => ({
  specsLeft: [
    { label: t('products.specs.length'), value: '55' },
    { label: t('products.specs.width'), value: '48' },
    { label: t('products.specs.thickness'), value: '9.4' },
    { label: t('products.specs.weight'), value: '37.7' },
  ],
  specsRight: [
    { label: t('products.specs.tempLimit'), value: t('products.specs.tempValue') },
    { label: t('products.specs.channels'), value: t('products.specs.channelsValue') },
    { label: t('products.specs.weight'), value: '37.7' },
    { label: t('products.specs.volume'), value: t('products.specs.volumeValue') },
  ],
  featureCards: [
    {
      title: t('products.features.card1Title'),
      highlight: { label: '重', value: '37.7g' },
      variant: 'gradient',
      image: productD1,
    },
    {
      title: t('products.features.card2Title'),
      highlight: { label: '微', value: '2mm' },
      variant: 'solid',
      image: productD2,
    },
    {
      title: t('products.features.card3Title'),
      highlight: { label: '频', value: '10KHz' },
      variant: 'solid',
      image: productD3,
    },
  ],
  sectionHeading1: t('products.sectionHeading1'),
}))
const products = computed<ProductDetail[]>(() => [
  {
    id: 1,
    name: t('products.scsName'),
    englishName: t('products.scsEngName'),
    description: t('products.scsDesc'),
    image: product1,
    ...baseData.value,
  },
  {
    id: 2,
    name: t('products.pnsName'),
    englishName: t('products.pnsEngName'),
    description: t('products.pnsDesc'),
    image: product2,
    ...baseData.value,
  },
  {
    id: 3,
    name: t('products.tnsName'),
    englishName: t('products.tnsEngName'),
    description: t('products.tnsDesc'),
    image: product3,
    ...baseData.value,
  },
])
let product = ref<ProductDetail & ProductBaseDetail>({
  id: 0,
  name: '',
  englishName: '',
  description: '',
  image: '',
  specsLeft: [],
  specsRight: [],
  featureCards: [],
  sectionHeading1: '',
})

const goToProducts = () => {
  router.push('/products')
}
const getProduct = () => {
  const id = route.params.id || 1
  return products.value.find(p => p.id === id) || products.value[0]
}
onMounted(async () => {
  product.value = await getProduct() as ProductDetail & ProductBaseDetail
})
</script>

<template>
  <div class="product-detail">
    <div class="product-detail__breadcrumb">
      <span class="product-detail__breadcrumb-link" @click="goToProducts">{{ $t('products.breadcrumb1') }}</span>
      <span>/</span>
      <span class="product-detail__breadcrumb-current">{{ $t('products.breadcrumb2') }}</span>
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
      <div v-for="(card, idx) in product.featureCards" :key="idx" class="product-detail__feature-card">
        <div class="product-detail__feature-cover" :class="card.variant === 'gradient' ? 'product-detail__feature-cover--gradient ' : 'product-detail__feature-cover--solid'
          ">
          <div class="product-detail__feature-glow" />
          <div class="product-detail__feature-highlight">
          </div>
          <div :class="`product-detail__feature-highlight-img img-${idx}`">
            <img v-if="idx === 0" src="@/assets/product1.svg" alt="product.image" />
            <img v-else-if="idx === 1" src="@/assets/product2.svg" alt="product.image" />
            <img v-else src="@/assets/product3.svg" alt="product.image" />
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
          <h3 class="product-detail__specs-heading">{{ $t('products.specsHeading') }}</h3>
          <div class="product-detail__specs-tables">
            <div class="product-detail__specs-table product-detail__specs-table--left">
              <div v-for="(row, rIdx) in product.specsLeft" :key="'l' + rIdx" class="product-detail__specs-row"
                :class="rIdx % 2 === 0 ? 'product-detail__specs-row--alt' : 'product-detail__specs-row--white'">
                <div class="product-detail__specs-cell product-detail__specs-cell--label" :class="rIdx % 2 === 0 ? 'product-detail__specs-cell--label-even' : 'product-detail__specs-cell--label-odd'">{{ row.label }}</div>
                <div class="product-detail__specs-cell product-detail__specs-cell--value">{{ row.value }}</div>
              </div>
            </div>
            <div class="product-detail__specs-table product-detail__specs-table--right">
              <div v-for="(row, rIdx) in product.specsRight" :key="'r' + rIdx" class="product-detail__specs-row"
                :class="rIdx % 2 === 0 ? 'product-detail__specs-row--alt' : 'product-detail__specs-row--white'">
                <div class="product-detail__specs-cell product-detail__specs-cell--label" :class="rIdx % 2 === 0 ? 'product-detail__specs-cell--label-even' : 'product-detail__specs-cell--label-odd'">{{ row.label }}</div>
                <div class="product-detail__specs-cell product-detail__specs-cell--value">{{ row.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product-detail__section-heading">{{ $t('products.howItWorks') }}</div>

    <div class="product-detail__manual">
      <div class="product-detail__manual-card">
        <div class="product-detail__manual-image-box">
          <div class="product-detail__manual-ellipse" />
          <img src="@/assets/product-pdf.png"  :alt="$t('products.manualTitle')" class="product-detail__manual-img" />
        </div>
        <div class="product-detail__manual-content">
          <div class="product-detail__manual-text">
            <h4 class="product-detail__manual-title">{{ $t('products.manualTitle') }}</h4>
            <p class="product-detail__manual-desc">{{ $t('products.manualDesc') }}</p>
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
  padding-left: 160px;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.0536em;
  color: var(--color-text-muted);
  margin-top: 142px;
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
  padding: 0 162px;
  margin-top: 150px;
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
  margin-bottom: 20px;
}

.product-detail__hero-name {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 60px;
  line-height: 74px;
  color: var(--color-black);
  margin-bottom: 20px;
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
  padding: 100px 0 0;
  justify-content: center;
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

.product-detail__feature-highlight-img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.product-detail__feature-highlight-img img.main-img {
  position: absolute;
  bottom: 0;
}

.product-detail__feature-highlight-img.img-0 {
  position: absolute;
}

.product-detail__feature-highlight-img.img-0 .product-detail__child {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.product-detail__feature-highlight-img.img-0 .product-detail__child .svg {
  position: absolute;
}

.product-detail__feature-highlight-img.img-0 .product-detail__child .svg1 {
  top: 36px;
  right: 56px;
  transform: rotate(-12deg);
}

.product-detail__feature-highlight-img.img-0 .product-detail__child .svg2 {
  bottom: 28px;
  left: 30px;
}

.product-detail__feature-highlight-img .img-2-2 {
  position: absolute;
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
  margin-top: 150px;
  padding: 80px 0;
}

.product-detail__specs-inner {
  margin: auto;
  width: fit-content
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
.product-detail__specs-table--right .product-detail__specs-row::not(:last-child) ,
.product-detail__specs-table--left .product-detail__specs-row::not(:last-child) {
 border-bottom: 1px solid #F1F5F9;
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
  color: var(--color-text-body);
}

.product-detail__specs-cell--label-odd {
  background: #D5D5D5;
}

.product-detail__specs-cell--label-even {
  background: #EBEBEB;
}

.product-detail__specs-cell--value {
  flex: 1;
  padding: 0 16px;
  color: var(--color-black);
}

/* ========== Product Manual ========== */
.product-detail__manual {
  padding: 100px 230px 150px;
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

/* ========== Responsive ========== */
@media (max-width: 1600px) {
  .product-detail__hero {
    padding-left: clamp(24px, 6vw, 160px);
  }
  .product-detail__hero-content {
    margin-top: clamp(90px, 7.5vw, 142px);
  }
  .product-detail__gallery {
    padding: 0 clamp(24px, 6vw, 162px);
    margin-top: clamp(80px, 7.8vw, 150px);
  }
  .product-detail__gallery-image {
    width: clamp(400px, 37vw, 710px);
    height: clamp(280px, 26vw, 500px);
  }
  .product-detail__gallery-info {
    width: clamp(450px, 43vw, 834px);
    padding-top: clamp(40px, 4vw, 80px);
  }
  .product-detail__gallery-title {
    font-size: clamp(32px, 3.1vw, 60px);
  }
  .product-detail__section-heading {
    font-size: clamp(28px, 2.6vw, 50px);
  }
  .product-detail__spec-section {
    padding: 0 clamp(24px, 6vw, 160px);
    margin-top: clamp(80px, 7.8vw, 150px);
  }
  .product-detail__features {
    padding: clamp(50px, 5.2vw, 100px) 0 0;
  }
  .product-detail__feature-card {
    width: clamp(260px, 23vw, 440px);
  }
  .product-detail__feature-image {
    height: clamp(250px, 22vw, 424px);
  }
  .product-detail__cta {
    margin-top: clamp(80px, 7.8vw, 150px);
    padding: clamp(40px, 4vw, 80px) 0;
  }
  .product-detail__cta-inner {
    width: clamp(400px, 38vw, 730px);
  }
}

@media (max-width: 1280px) {
  .product-detail__hero {
    padding-left: 32px;
  }
  .product-detail__gallery {
    flex-direction: column;
    align-items: center;
    padding: 0 32px;
    gap: 24px;
  }
  .product-detail__gallery-image {
    width: 100%;
    max-width: 710px;
    height: 360px;
  }
  .product-detail__gallery-info {
    width: 100%;
    max-width: 834px;
    padding-top: 20px;
  }
  .product-detail__spec-section {
    padding: 0 32px;
  }
  .product-detail__features {
    padding: 60px 0 0;
  }
}

@media (max-width: 1024px) {
  .product-detail__features-grid {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  .product-detail__feature-card {
    width: 100%;
    max-width: 500px;
  }
  .product-detail__feature-image {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .product-detail__hero {
    padding-left: 16px;
  }
  .product-detail__hero-content {
    margin-top: 60px;
  }
  .product-detail__gallery {
    padding: 0 16px;
    margin-top: 40px;
  }
  .product-detail__gallery-image {
    height: 260px;
  }
  .product-detail__gallery-title {
    font-size: 30px;
    line-height: 40px;
  }
  .product-detail__spec-section {
    padding: 0 16px;
    margin-top: 40px;
  }
  .product-detail__section-heading {
    font-size: 24px;
  }
  .product-detail__features {
    padding: 40px 0 0;
  }
  .product-detail__feature-image {
    height: 240px;
  }
  .product-detail__cta {
    margin-top: 40px;
    padding: 40px 20px;
  }
  .product-detail__cta-inner {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .product-detail__hero {
    padding-left: 12px;
  }
  .product-detail__hero-content {
    margin-top: 50px;
  }
  .product-detail__gallery {
    padding: 0 12px;
  }
  .product-detail__gallery-image {
    height: 220px;
  }
  .product-detail__gallery-title {
    font-size: 24px;
    line-height: 34px;
  }
  .product-detail__gallery-subtitle {
    font-size: 16px;
    line-height: 24px;
  }
  .product-detail__spec-section {
    padding: 0 12px;
  }
  .product-detail__section-heading {
    font-size: 20px;
  }
  .product-detail__feature-image {
    height: 200px;
  }
  .product-detail__cta {
    padding: 30px 16px;
  }
}
</style>