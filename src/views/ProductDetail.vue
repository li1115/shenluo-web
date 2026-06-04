<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { getProductDetail } from '@/api/product'
import type { ProductItem } from '@/api/types'
import { useRevealOnScroll } from '@/shared/utils/useRevealOnScroll'

const { refresh: refreshReveal } = useRevealOnScroll()

const { t } = useI18n()
const route = useRoute()


interface ProductDetail {
  productCode: string
  id: number
  name: string
  description: string
  image: string
}



/** API 产品详情 → 页面展示数据映射 */
function mapProductDetail(detail: ProductItem): Omit<ProductDetail, 'image'> {
  return {
    productCode: detail.productCode,
    id: detail.id,
    name: detail.name,
    description: detail.description,
  }
}
import { getProductDetailData, PRODUCT_CODES, TNSBase } from '@/shared/products'
import type { ProductBaseDetail } from '@/shared/products'

const loading = ref(false)
const product = ref<ProductDetail & ProductBaseDetail>({
  enName: '',
  productCode: '',
  id: 0,
  name: '',
  description: '',
  image: '',
  specsLeft: [],
  specsRight: [],
  featureCards: [],
})

async function fetchData() {
  const productCode = (route.params.productCode as string) || ''
  if (!productCode) return
  loading.value = true
  try {
    const detailRes = await getProductDetail(productCode)
    const detail = detailRes.data || {}
    const mapped = mapProductDetail(detail)
    product.value = {
      ...mapped,
      ...getProductDetailData(PRODUCT_CODES[mapped.productCode as keyof typeof PRODUCT_CODES]),
    }
  } catch {
    product.value = {
      enName: '',
      productCode: '',
      id: 0,
      name: '',
      description: '',
      image: '',
      specsLeft: [],
      specsRight: [],
      featureCards: [],
    }
    if (productCode === 'TNS') {
      product.value = {
        ...TNSBase,
        ...getProductDetailData(PRODUCT_CODES['TNS']),
      }
    }

  } finally {
    loading.value = false
    await nextTick()
    refreshReveal()
  }
}

onMounted(() => {
  fetchData()
})

watch(
  () => route.params.productCode,
  () => {
    fetchData()
  }
)
</script>

<template>
  <div class="product-detail">
    <div class="product-detail__breadcrumb">
      <span class="product-detail__breadcrumb-link">{{ $t('products.breadcrumb1') }}</span>
      <span>/</span>
      <span class="product-detail__breadcrumb-current">{{ $t('products.breadcrumb2') }}</span>
    </div>

    <div class="product-detail__hero reveal">
      <div class="product-detail__hero-image reveal">
        <img :src="product.image" :alt="product.name" class="product-detail__hero-img" />
      </div>
      <div class="product-detail__hero-info reveal">
        <p class="product-detail__hero-eng">{{ product.enName }}</p>
        <h1 class="product-detail__hero-name">{{ product.name }}</h1>
        <p class="product-detail__hero-desc">{{ product.description }}</p>
      </div>
    </div>
    <div class="product-detail__no-data" v-if="product.noDATA">
      <p class="product-detail__no-data-text">{{ $t('products.noData') }}</p>
    </div>
    <template v-else>
      <div class="product-detail__section-heading reveal">{{ t('products.sectionHeading1') }}</div>
      <div class="product-detail__feature-cards reveal" v-if="product.featureCards.length">
        <div v-for="(card, idx) in product.featureCards" :key="idx" class="product-detail__feature-card">
          <div class="product-detail__feature-highlight-img">
            <img :src="card.image" :alt="card.title" />
          </div>
          <div class="product-detail__feature-text">
            <p class="product-detail__feature-title">{{ card.title }}</p>
          </div>
        </div>
      </div>

      <div class="product-detail__specs-section reveal" v-if="product.specsLeft.length && product.specsRight.length">
        <div class="product-detail__specs-inner reveal">
          <div class="product-detail__specs-left">
            <h3 class="product-detail__specs-heading">{{ $t('products.specsHeading') }}</h3>
            <div class="product-detail__specs-tables">
              <div class="product-detail__specs-table product-detail__specs-table--left">
                <div v-for="(row, rIdx) in product.specsLeft" :key="'l' + rIdx" class="product-detail__specs-row"
                  :class="rIdx % 2 === 0 ? 'product-detail__specs-row--alt' : 'product-detail__specs-row--white'">
                  <div class="product-detail__specs-cell product-detail__specs-cell--label"
                    :class="rIdx % 2 === 0 ? 'product-detail__specs-cell--label-even' : 'product-detail__specs-cell--label-odd'">
                    {{ $t(row.label) }}</div>
                  <div class="product-detail__specs-cell product-detail__specs-cell--value">{{ $t(row.value) }}</div>
                </div>
              </div>
              <div class="product-detail__specs-table product-detail__specs-table--right">
                <div v-for="(row, rIdx) in product.specsRight" :key="'r' + rIdx" class="product-detail__specs-row"
                  :class="rIdx % 2 === 0 ? 'product-detail__specs-row--alt' : 'product-detail__specs-row--white'">
                  <div class="product-detail__specs-cell product-detail__specs-cell--label"
                    :class="rIdx % 2 === 0 ? 'product-detail__specs-cell--label-even' : 'product-detail__specs-cell--label-odd'">
                    {{ $t(row.label) }}</div>
                  <div class="product-detail__specs-cell product-detail__specs-cell--value">{{ $t(row.value) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="product-detail__section-heading reveal">{{ $t('products.howItWorks') }}</div>

      <div class="product-detail__manual reveal">
        <div class="product-detail__manual-card">
          <div class="product-detail__manual-image-box">
            <div class="product-detail__manual-ellipse" />
            <img :src="product.pdfImg" :alt="$t('products.manualTitle')" class="product-detail__manual-img" />
          </div>
          <div class="product-detail__manual-content">
            <div class="product-detail__manual-text">
              <h4 class="product-detail__manual-title">{{ $t('products.manualTitle') }}</h4>
              <p class="product-detail__manual-desc">{{ $t('products.manualDesc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped lang="less">
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
  --transition-premium: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  background: var(--color-bg-page);

  max-width: 1920px;
  margin: auto;
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

  img {
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
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

.product-detail__no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  text-align: center;
  font-family: "PingFang SC";
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 38px;
  padding: 230px 0;
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
  transition: var(--transition-premium);

  &:hover {
    transform: translateY(-8px);

    img {
      transform: scale(1.02);
    }
  }
}


.product-detail__feature-highlight-img {
  width: 100%;
  height: 420px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }
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

.product-detail__specs-table--right .product-detail__specs-row::not(:last-child),
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
  padding: 76px 230px 126px;
}

.product-detail__manual-card {
  display: flex;
  align-items: center;
  gap: 30px;
  width: fit-content;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid transparent;
  transition: var(--transition-premium);
  cursor: pointer;

  &:hover {
    border-color: var(--color-brand);
    box-shadow: 0 8px 24px rgba(0, 82, 217, 0.04);
    transform: translateY(-4px);
  }
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

/* ========== 视差滚动入场动画 ========== */
.reveal {
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>