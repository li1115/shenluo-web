<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const navItems = [
  { name: '首页', path: '/' },
  { name: '产品展示', path: '/products' },
  { name: '患者服务', path: '/patient-service' },
  { name: '资讯', path: '/news' },
  { name: '关于我们', path: '/about' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <header class="fixed top-[20px] left-1/2 -translate-x-1/2 z-50 w-[91%] max-w-[1732px]">
    <div
      class="bg-white rounded-[60px] shadow-[0px_4px_29px_0px_rgba(0,0,0,0.04)] h-[86px] flex items-center justify-between px-[100px]">
      <div class="flex flex-1 items-center justify-between mr-[217px]">
        <div class="w-[149px] h-[50px] flex items-center">
          <img src="@/assets/header-logo.svg" alt="logo" class="w-full h-full">
        </div>
        <nav class="flex items-center gap-[76px]">
          <button v-for="item in navItems" :key="item.path" @click="navigate(item.path)" :class="[
            'text-lg font-bold transition-all duration-200 rounded-[63px] px-3 py-3',
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
        联系我们
      </button>
    </div>
  </header>
</template>