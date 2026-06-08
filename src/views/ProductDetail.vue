<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
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
import { getProductDetailData, PRODUCT_CODES } from '@/shared/products'
import type { ProductBaseDetail, SpecRow } from '@/shared/products'

/** Calculate rowspan for table-mode cells. A cell spans rows if it has content
 *  and subsequent rows in the same column are empty. */
function getRowSpan(rows: SpecRow[][], rowIdx: number, colIdx: number): number {
  const cell = rows[rowIdx]?.[colIdx]
  const hasContent = Boolean(cell?.label || cell?.value)
  if (!hasContent) return 1
  let span = 1
  for (let r = rowIdx + 1; r < rows.length; r++) {
    const nextCell = rows[r]?.[colIdx]
    if (!nextCell?.label && !nextCell?.value) {
      span++
    } else {
      break
    }
  }
  return span
}

/** Check if a column at a given row is covered by a rowspan from a previous row. */
function isCellCovered(rows: SpecRow[][], rowIdx: number, colIdx: number): boolean {
  for (let r = rowIdx - 1; r >= 0; r--) {
    const span = getRowSpan(rows, r, colIdx)
    if (span > 1 && r + span > rowIdx) {
      return true
    }
  }
  return false
}

const loading = ref(false)
const product = ref<ProductDetail & ProductBaseDetail>({
  enName: '',
  productCode: '',
  id: 0,
  name: '',
  description: '',
  image: '',
  specGroups: [],
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
      specGroups: [],
      featureCards: [],
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

      <div class="product-detail__specs-section reveal" v-if="product.specGroups.length">
        <div class="product-detail__specs-container">
          <h3 class="product-detail__specs-heading">{{ $t('products.specsHeading') }}</h3>
          <div class="product-detail__specs-tables">
            <div v-for="(group, gIdx) in product.specGroups" :key="gIdx" class="product-detail__specs-table">
              <div class="product-detail__specs-table-header">{{ $t(group.groupName) }}</div>

              <!-- LR / TB mode: flat label-value grid -->
              <div v-if="group.type === 'lr' || group.type === 'tb'" class="product-detail__specs-table-body" :class="{
                'product-detail__specs-table-body--lr': group.type === 'lr',
                'product-detail__specs-table-body--tb': group.type === 'tb',
              }" :style="group.type === 'tb' ? { gridTemplateColumns: `repeat(${group.specs.length}, 1fr)` } : {}">
                <template v-if="group.type === 'lr'">
                  <template v-for="(item, iIdx) in group.specs" :key="iIdx">
                    <div class="product-detail__specs-cell product-detail__specs-label"
                      :style="{ minHeight: group.minHeight || '3.5rem' }">{{ $t(item.label) }}</div>
                    <div class="product-detail__specs-cell product-detail__specs-value"
                      :style="{ minHeight: group.minHeight || '3.5rem' }">{{ $t(item.value) }}</div>
                  </template>
                </template>
                <template v-if="group.type === 'tb'">
                  <div v-for="(item, iIdx) in group.specs" :key="iIdx" class="product-detail__specs-col-tb">
                    <div class="product-detail__specs-cell product-detail__specs-label"
                      :style="{ minHeight: group.minHeight || '3.5rem' }">{{ $t(item.label) }}</div>
                    <div class="product-detail__specs-cell product-detail__specs-value"
                      :style="{ minHeight: group.minHeight || '3.5rem' }">{{ $t(item.value) }}</div>
                  </div>
                </template>
              </div>

              <!-- Table mode: row-based with merged cells support -->
              <table v-if="group.type === 'table' && group.rows" class="product-detail__specs-table-elem">
                <tbody>
                  <tr v-for="(row, rIdx) in group.rows" :key="rIdx"
                    :class="{ 'product-detail__specs-header-row': rIdx === 0 }">
                    <td v-for="(cell, cIdx) in row" :key="cIdx" v-show="!isCellCovered(group.rows!, rIdx, cIdx)"
                      class="product-detail__specs-td" :class="{
                        'product-detail__specs-td--label': rIdx === 0,
                        'product-detail__specs-td--value': rIdx > 0,
                        'product-detail__specs-td--empty': !cell.value && !cell.label,
                      }" :rowspan="getRowSpan(group.rows!, rIdx, cIdx)">
                      <template v-if="cell.label">{{ $t(cell.label) }}</template>
                      <template v-else-if="cell.value">{{ $t(cell.value) }}</template>
                    </td>
                  </tr>
                </tbody>
              </table>
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
              <h4 class="product-detail__manual-title">{{ product.name }}产品手册</h4>
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

  max-width: 120rem;
  margin: auto;
}

/* ========== Breadcrumb ========== */
.product-detail__breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding-left: 10rem;
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: -0.0536em;
  color: var(--color-text-muted);
  margin-top: 8.875rem;
}

.product-detail__breadcrumb-current {
  color: var(--color-text-muted);
}

/* ========== Hero ========== */
.product-detail__hero {
  display: flex;
  align-items: flex-start;
  padding: 0 10.125rem;
  margin-top: 9.375rem;
  gap: 3.125rem;
}

.product-detail__hero-image {
  width: 44.375rem;
  height: 31.25rem;
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
  width: 52.125rem;
  padding-top: 5rem;
}

.product-detail__hero-eng {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: 0.125em;
  color: var(--color-black);
  margin-bottom: 1.25rem;
}

.product-detail__hero-name {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 3.75rem;
  line-height: 4.625rem;
  color: var(--color-black);
  margin-bottom: 1.25rem;
}

.product-detail__hero-desc {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.375rem;
  color: var(--color-text-body);
  max-width: 43.875rem;
  white-space: pre-line;
}

.product-detail__no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  text-align: center;
  font-family: "PingFang SC";
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.375rem;
  padding: 14.375rem 0;
}

/* ========== Section Heading ========== */
.product-detail__section-heading {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 2.25rem;
  line-height: 2.5rem;
  letter-spacing: -0.0208em;
  color: var(--color-text-heading);
  padding: 0 10rem;
  margin-top: 9.375rem;
}

/* ========== Feature Cards ========== */
.product-detail__feature-cards {
  display: flex;
  justify-content: flex-start;
  gap: 4.375rem;
  padding: 6.25rem 0 0;
  justify-content: center;
}

.product-detail__feature-card {
  width: 27.5rem;
  background: var(--color-white);
  border-radius: 1.875rem;
  box-shadow: 0 0 3.125rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex-shrink: 0;
  transition: var(--transition-premium);

  &:hover {
    transform: translateY(-0.5rem);

    img {
      transform: scale(1.02);
    }
  }
}


.product-detail__feature-highlight-img {
  width: 100%;
  height: 26.25rem;

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
  font-size: 0.6875rem;
}

.product-detail__feature-highlight-num {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 3.625rem;
  line-height: 1;
}

.product-detail__feature-highlight-unit {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.125rem;
}

.product-detail__feature-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7.5rem;
  padding: 1.875rem;
}

.product-detail__feature-title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 2rem;
  line-height: 2.25rem;
  color: var(--color-black);
  text-align: center;
}

/* ========== Specs Section ========== */
.product-detail__specs-section {
  background: #F6F6F6;
  margin-top: 9.375rem;
  padding: 5rem 0;
}

.product-detail__specs-container {
  max-width: 91.25rem;
  margin: 0 auto;
}

.product-detail__specs-heading {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 2rem;
  line-height: 2.25rem;
  letter-spacing: -0.0234em;
  color: var(--color-text-heading);
  margin-bottom: 2.5rem;
}

.product-detail__specs-tables {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.product-detail__specs-table {
  border-radius: 0.5rem;
  overflow: hidden;
  border: 0.0625rem solid #EEEEEE;
}

.product-detail__specs-table-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.625rem;
  background: var(--color-white);
  padding: 1.0625rem 1rem;
  font-family: var(--font-body);
  font-size: 1.25rem;
  line-height: 2.125rem;
  color: var(--color-text-body);
  border-bottom: 0.0625rem solid #EEEEEE;
}

.product-detail__specs-table-body {
  display: grid;
}

.product-detail__specs-table-body--lr {
  grid-template-columns: repeat(4, 1fr);
}

.product-detail__specs-col-tb {
  display: flex;
  flex-direction: column;
}

.product-detail__specs-cell {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  min-height: 3.5rem;
  background: var(--color-white);
  border-right: 0.0625rem solid #EEEEEE;
  border-bottom: 0.0625rem solid #EEEEEE;
  font-family: var(--font-body);
  font-size: 1.25rem;
  line-height: 2.125rem;
  color: var(--color-text-body);
}

.product-detail__specs-label {
  font-size: 1.25rem;
  line-height: normal;
  color: var(--color-text-body);
}

/* ========== Table Mode (SCS Electrode) ========== */
.product-detail__specs-table-elem {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.product-detail__specs-td {
  padding: 1rem 1.25rem;
  min-height: 3.5rem;
  background: var(--color-white);
  border-right: 0.0625rem solid #EEEEEE;
  border-bottom: 0.0625rem solid #EEEEEE;
  font-family: var(--font-body);
  font-size: 1.25rem;
  line-height: 2.125rem;
  color: var(--color-text-body);
  text-align: left;
  vertical-align: middle;
}

.product-detail__specs-td--label {
  font-size: 1.25rem;
  line-height: 2.125rem;
  color: var(--color-text-body);
  text-align: left;
  background: var(--color-white);
}

.product-detail__specs-td:last-child {
  border-right: none;
}

.product-detail__specs-header-row .product-detail__specs-td {
  border-bottom: 0.0625rem solid #EEEEEE;
}

/* ========== Product Manual ========== */
.product-detail__manual {
  padding: 4.75rem 14.375rem 7.875rem;
}

.product-detail__manual-card {
  display: flex;
  align-items: center;
  gap: 1.875rem;
  width: fit-content;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 0.0625rem solid transparent;
  transition: var(--transition-premium);
  cursor: pointer;

  &:hover {
    border-color: var(--color-brand);
    box-shadow: 0 0.5rem 1.5rem rgba(0, 82, 217, 0.04);
    transform: translateY(-0.25rem);
  }
}

.product-detail__manual-image-box {
  position: relative;
  width: 5.75rem;
  height: 7.375rem;
  flex-shrink: 0;
  background: var(--color-manual-bg);
  border: 0.0625rem solid var(--color-manual-border);
  border-radius: 0.625rem;
  box-shadow: 0.125rem 0.25rem 0.875rem 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-detail__manual-ellipse {
  position: absolute;
  left: -0.5625rem;
  top: 3.4375rem;
  width: 7.375rem;
  height: 6.0625rem;
  border-radius: 50%;
  background: linear-gradient(238deg, rgba(113, 247, 249, 1) 16%, rgba(0, 60, 255, 1) 83%);
}

.product-detail__manual-img {
  position: relative;
  z-index: 1;
  width: 4.25rem;
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
  gap: 0.75rem;
}

.product-detail__manual-title {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.75rem;
  line-height: 1.75rem;
  color: var(--color-brand);
}

.product-detail__manual-desc {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: var(--color-text-manual-desc);
  max-width: 35.4375rem;
}

/* ========== 视差滚动入场动画 ========== */
.reveal {
  opacity: 0;
  transform: translateY(0.9375rem);
  transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
}

.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>