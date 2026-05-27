<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getProducts } from '@/api/product'
import type { ProductItem } from '@/api/types'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)
const showDropdown = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | null = null

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (hideTimer) clearTimeout(hideTimer)
})

const productItems = ref<ProductItem[]>([])
const productsFetched = ref(false)

const productDropdownItems = computed(() => {
  if (productItems.value.length > 0) return productItems.value
  return [
    { id: 0, productCode: 'SCS', name: t('home.products.scsName'), description: '' },
    { id: 0, productCode: 'PNS', name: t('home.products.pnsName'), description: '' },
    { id: 0, productCode: 'TNS', name: t('home.products.tnsName'), description: '' },
  ]
})

const navItems = computed(() => [
  { name: t('header.home'), path: '/' },
  { name: t('header.products'), path: '/products', hasDropdown: true },
  { name: t('header.patientService'), path: '/patient-service' },
  { name: t('header.news'), path: '/news' },
  { name: t('header.about'), path: '/about' },
])

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const navigate = (path: string) => {
  router.push(path)
}

const goToProduct = (productCode: string) => {
  showDropdown.value = false
  router.push(`/product/${productCode}`)
}

const onProductMouseEnter = async () => {
  if (hideTimer) clearTimeout(hideTimer)
  showDropdown.value = true
  if (!productsFetched.value) {
    productsFetched.value = true
    try {
      const res = await getProducts()
      productItems.value = res.data || []
    } catch {
      productItems.value = []
    }
  }
}

const onProductMouseLeave = () => {
  hideTimer = setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

const onDropdownMouseEnter = () => {
  if (hideTimer) clearTimeout(hideTimer)
}

const onDropdownMouseLeave = () => {
  showDropdown.value = false
}
</script>

<template>
  <header :class="[
    'fixed z-50 transition-all duration-300 cubic-bezier(0.25, 1, 0.5, 1)  left-1/2 -translate-x-1/2',
    isScrolled
      ? 'top-0 w-full rounded-none shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]'
      : 'top-[20px]  max-w-[1732px] w-[91%] rounded-[60px]'
  ]">
    <div class="bg-white h-[86px] flex items-center justify-between px-[100px]"
      :class="isScrolled ? '' : 'rounded-[60px] shadow-[0px_4px_29px_0px_rgba(0,0,0,0.04)]'">
      <div class="flex flex-1 items-center justify-between mr-[155px]">
        <div class="w-[149px] h-[50px] flex items-center">
          <img src="@/assets/header-logo.svg" alt="logo" class="w-full h-full">
        </div>
        <nav class="flex items-center gap-[52px]">
          <template v-for="item in navItems" :key="item.path">
            <!-- 产品展示：带下拉 -->
            <div v-if="item.hasDropdown"
              class="relative"
              @mouseenter="onProductMouseEnter"
              @mouseleave="onProductMouseLeave"
              >
              <button :class="[
                'text-lg font-bold transition-all duration-200 rounded-[63px] px-9 py-3',
                isActive(item.path)
                  ? 'bg-[#E9F1FF] text-[#0163FF]'
                  : 'text-black hover:bg-[#E9F1FF] hover:text-[#0163FF]'
              ]">
                {{ item.name }}
              </button>

              <Transition name="dropdown">
                <div v-if="showDropdown"
                  class="absolute top-full left-1/2 -translate-x-1/2 pt-1 z-50"
                  @mouseenter="onDropdownMouseEnter"
                  @mouseleave="onDropdownMouseLeave">
                  <div class="flex flex-col bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.1)] border-t-[2px] border-[#0163FF]">
                    <div
                      v-for="prod in productDropdownItems"
                      :key="prod.productCode"
                      class="flex items-center justify-center px-[30px] py-[16px] border-b border-[#F6F6F6] cursor-pointer transition-colors hover:bg-[#F6F8FF]"
                      @click="goToProduct(prod.productCode)">
                      <span class="text-[18px] leading-[24px] text-[#666666] font-normal whitespace-nowrap" style="font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', sans-serif;">
                        {{ prod.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- 普通导航项 -->
            <button v-else @click="navigate(item.path)" :class="[
              'text-lg font-bold transition-all duration-200 rounded-[63px] px-9 py-3',
              isActive(item.path)
                ? 'bg-[#E9F1FF] text-[#0163FF]'
                : 'text-black hover:bg-[#E9F1FF] hover:text-[#0163FF]'
            ]">
              {{ item.name }}
            </button>
          </template>
        </nav>
      </div>
      <button @click="navigate('/contact')"
        class="bg-[#0163FF] text-white font-bold text-lg px-6 py-3 rounded-[63px] shadow-[0px_9px_10px_0px_rgba(1,94,255,0.14)] hover:bg-blue-700 transition-colors">
        {{ $t('header.contact') }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.dropdown-enter-active {
  transition: opacity 0.15s ease-out, transform 0.15s ease-out;
}
.dropdown-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-4px);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>