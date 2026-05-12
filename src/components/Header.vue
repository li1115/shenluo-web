<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Phone, Calendar } from 'lucide-vue-next'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' },
  { name: '科室介绍', path: '/departments' },
  { name: '专家团队', path: '/doctors' },
  { name: '就诊指南', path: '/guide' },
  { name: '新闻动态', path: '/news' },
  { name: '联系我们', path: '/contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const navigateTo = (path: string) => {
  router.push(path)
  closeMobileMenu()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3 cursor-pointer" @click="navigateTo('/')">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
            <span class="text-white text-xl font-bold">神络</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">神络医院</h1>
            <p class="text-xs text-gray-500">NEURAL NETWORK HOSPITAL</p>
          </div>
        </div>

        <nav class="hidden lg:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.path"
            :href="item.path"
            @click.prevent="navigateTo(item.path)"
            :class="[
              'text-sm font-medium transition-colors hover:text-blue-600',
              route.path === item.path ? 'text-blue-600' : 'text-gray-600'
            ]"
          >
            {{ item.name }}
          </a>
        </nav>

        <div class="hidden lg:flex items-center space-x-6">
          <div class="flex items-center space-x-2 text-gray-600">
            <Phone class="w-4 h-4" />
            <span class="text-sm">400-888-8888</span>
          </div>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2 transition-colors">
            <Calendar class="w-4 h-4" />
            <span>预约挂号</span>
          </button>
        </div>

        <button
          class="lg:hidden p-2 text-gray-600"
          @click="toggleMobileMenu"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden bg-white border-t shadow-lg"
    >
      <div class="px-4 py-4 space-y-3">
        <a
          v-for="item in navItems"
          :key="item.path"
          :href="item.path"
          @click.prevent="navigateTo(item.path)"
          :class="[
            'block py-2 px-4 rounded-lg text-sm font-medium transition-colors',
            route.path === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
          ]"
        >
          {{ item.name }}
        </a>
        <div class="pt-3 border-t flex flex-col space-y-3">
          <div class="flex items-center space-x-2 text-gray-600 px-4">
            <Phone class="w-4 h-4" />
            <span class="text-sm">400-888-8888</span>
          </div>
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center space-x-2 transition-colors">
            <Calendar class="w-4 h-4" />
            <span>预约挂号</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
