<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
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

const productItems = ref<ProductItem[]>([])
onMounted(async () => {
  try {
    const res = await getProducts()
    productItems.value = res.data || []
  } catch {
    productItems.value = []
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (hideTimer) clearTimeout(hideTimer)
})

const productsFetched = ref(false)

const productDropdownItems = computed(() => {
  if (productItems.value.length > 0) return productItems.value
  return [
    { id: 0, productCode: 'SCS', name: t('home.products.scsName'), description: '' },
    { id: 0, productCode: 'PNS', name: t('home.products.pnsName'), description: '' },
    { id: 0, productCode: 'TNS', name: t('home.products.tnsName'), description: '' },
  ]
})

interface NavItem {
  name: string
  path: string
  hasDropdown?: boolean
  scrollId?: string
}
const navItems = computed(() => [
  { name: t('header.home'), path: '/' },
  { name: t('header.products'), path: '/products', hasDropdown: true, scrollId: 'home-products' },
  { name: t('header.patientService'), path: '/patient-service', scrollId: 'home-patient-service' },
  { name: t('header.news'), path: '/news', scrollId: '' },
  { name: t('header.about'), path: '/about', scrollId: '' },
])

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'

  return route.path.startsWith(path)
}
const navigate = (path: string) => {
  return router.push(path)
}

const goToProduct = (productCode: string) => {
  showDropdown.value = false
  router.push({
    path: `/products/product/${productCode}`
  })
}

const onProductMouseEnter = async () => {
  if (hideTimer) clearTimeout(hideTimer)
  showDropdown.value = true
  if (!productsFetched.value) {
    productsFetched.value = true
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
const goTo = async (item: NavItem) => {
  if (item.path === '/patient-service') {
    await navigate('/')
  } else if (item.path) await navigate(item.path)

  if (item.hasDropdown) {
    showDropdown.value = false
  }
  if (item.scrollId) {
    await nextTick()
    const scrollId = item.scrollId
    setTimeout(() => {
      try {
        document.getElementById(scrollId)?.scrollIntoView({ behavior: 'smooth' })
      } catch {
        return
      }
    }, 0)
  }
}

</script>

<template>
  <header id="header" class :class="[
    'fixed z-50 transition-all duration-300 cubic-bezier(0.25, 1, 0.5, 1)  left-1/2 -translate-x-1/2',
    isScrolled
      ? 'top-0 w-full rounded-none shadow-[0_0.25rem_1.25rem_0_rgba(0,0,0,0.08)]'
      : 'top-[1.25rem]  max-w-[108.25rem] w-[91%] rounded-[3.75rem]'
  ]">
    <div class="bg-white h-[5.375rem] flex items-center justify-between px-[6.25rem] header-container "
      :class="isScrolled ? '' : 'rounded-[3.75rem] shadow-[0_0.25rem_1.8125rem_0_rgba(0,0,0,0.04)]'">
      <div class="flex flex-1 items-center justify-between mr-[9.6875rem] header-left">
        <div class="w-[9.3125rem] h-[3.125rem] flex items-center header-logo">
          <img src="@/assets/header-logo.svg" alt="logo" class="w-full h-full">
        </div>
        <nav class="flex items-center gap-[3.25rem] header-nav">
          <template v-for="item in navItems" :key="item.path">
            <!-- 产品展示：带下拉 -->
            <div v-if="item.hasDropdown" class="relative" @mouseenter="onProductMouseEnter"
              @mouseleave="onProductMouseLeave" @click="goTo(item)">
              <button :class="[
                'text-lg font-bold transition-all duration-200 rounded-[3.9375rem] px-9 py-3',
                isActive(item.path)
                  ? 'bg-[#E9F1FF] text-[#0163FF]'
                  : 'text-black hover:bg-[#E9F1FF] hover:text-[#0163FF]'
              ]">
                {{ item.name }}
              </button>

              <Transition name="dropdown">
                <div v-show="showDropdown" class="absolute top-full left-1/2 -translate-x-1/2 mt-[2.1875rem] z-50"
                  @mouseenter="onDropdownMouseEnter" @mouseleave="onDropdownMouseLeave">
                  <div class="flex flex-col w-[12.8125rem] bg-white shadow-[0_0.25rem_0.25rem_0_rgba(0,0,0,0.1)]">
                    <div v-for="prod in productDropdownItems" :key="prod.productCode"
                      class="flex items-center justify-center px-[1.875rem] py-[1rem] border-b border-[#F6F6F6] cursor-pointer transition-colors hover:bg-[#F6F8FF] group"
                      @click="goToProduct(prod.productCode)">
                      <span
                        class="text-[1.125rem] leading-[1.5rem] text-[#666666] font-normal group-hover:text-[#0163FF]"
                        style="font-family: 'Alibaba PuHuiTi 3.0', 'PingFang SC', sans-serif;">
                        {{ prod.name }}
                      </span>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- 普通导航项 -->
            <button v-else @click="goTo(item)" :class="[
              'text-lg font-bold transition-all duration-200 rounded-[3.9375rem] px-9 py-3',
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
        class="bg-[#0163FF] text-white font-bold  text-lg px-6 py-3 rounded-[3.9375rem] shadow-[0_0.5625rem_0.625rem_0_rgba(1,94,255,0.14)] hover:bg-blue-700 transition-colors transition-transform duration-200 hover:scale-105">
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
  transform: translateY(-0.25rem);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
}

@media (max-width: 98.75rem) {
  .header-nav {
    gap: 1.75rem;
  }

  #header :deep(button) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  .header-left {
    margin-right: 5rem;
  }
}

@media (max-width: 75rem) {
  .header-nav {
    gap: 1.125rem;
  }

  #header :deep(button) {
    padding-left: 0.875rem;
    padding-right: 0.875rem;
    font-size: 0.9375rem;
  }

  .header-left {
    margin-right: 2.5rem;
  }
}

@media (max-width: 64rem) {
  .header-container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .header-nav {
    gap: 0.625rem;
  }

  #header :deep(button) {
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    font-size: 0.875rem;
  }

  .header-left {
    margin-right: 1.25rem;
  }
}

@media (max-width: 48rem) {
  .header-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .header-nav {
    gap: 0.375rem;
  }

  #header :deep(button) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 0.8125rem;
  }

  .header-left {
    margin-right: 0.75rem;
  }

  .header-logo {
    width: 6.875rem;
  }
}
</style>