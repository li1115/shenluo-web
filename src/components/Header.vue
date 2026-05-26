<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navItems = computed(() => [
  { name: t('header.home'), path: '/' },
  { name: t('header.products'), path: '/products' },
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
          <button v-for="item in navItems" :key="item.path" @click="navigate(item.path)" :class="[
            'text-lg font-bold transition-all duration-200 rounded-[63px] px-9 py-3',
            isActive(item.path)
              ? 'bg-[#E9F1FF] text-[#0163FF]'
              : 'text-black hover:text-[#0163FF]'
          ]">
            {{ item.name }}
          </button>
        </nav>
      </div>
      <button @click="navigate('/contact')"
        class="bg-[#0163FF] text-white font-bold text-lg px-6 py-3 rounded-[63px] shadow-[0px_9px_10px_0px_rgba(1,94,255,0.14)] hover:bg-blue-700 transition-colors">
        {{ $t('header.contact') }}
      </button>
    </div>
  </header>
</template>