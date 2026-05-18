<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, ArrowRight, Search } from 'lucide-vue-next'

const newsList = [
  {
    id: 1,
    title: '神络医院成功开展首例脑机接口手术',
    excerpt: '我院神经外科团队成功完成首例脑机接口植入手术，为瘫痪患者带来新希望...',
    date: '2024-01-15',
    category: '医疗动态',
    image: '',
  },
  {
    id: 2,
    title: '新型神经保护药物临床试验取得重大突破',
    excerpt: '我院参与的新型神经保护药物临床试验取得显著成果，有望为脑卒中治疗带来革命性变化...',
    date: '2024-01-12',
    category: '科研进展',
    image: '',
  },
  {
    id: 3,
    title: '神络医院荣获"全国文明医院"称号',
    excerpt: '在全国文明医院评选中，我院凭借优质服务和良好口碑荣获此项殊荣...',
    date: '2024-01-10',
    category: '医院荣誉',
    image: '',
  },
  {
    id: 4,
    title: '冬季脑血管疾病预防知识讲座圆满结束',
    excerpt: '我院举办的冬季脑血管疾病预防知识讲座吸引了众多市民参与...',
    date: '2024-01-08',
    category: '健康科普',
    image: '',
  },
  {
    id: 5,
    title: '我院引进国际先进的神经导航系统',
    excerpt: '为提升神经外科手术精准度，我院引进了国际领先的神经导航系统...',
    date: '2024-01-05',
    category: '设备更新',
    image: '',
  },
  {
    id: 6,
    title: '春节假期门诊安排通知',
    excerpt: '春节期间，我院门诊安排如下，请患者朋友合理安排就诊时间...',
    date: '2024-01-03',
    category: '通知公告',
    image: '',
  },
]

const searchQuery = ref('')

const categories = ['全部', '医疗动态', '科研进展', '医院荣誉', '健康科普', '设备更新', '通知公告']
const activeCategory = ref('全部')

const filteredNews = newsList.filter(item => {
  const matchesCategory = activeCategory.value === '全部' || item.category === activeCategory.value
  const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
  return matchesCategory && matchesSearch
})
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">新闻动态</h1>
          <p class="text-blue-100 text-lg">了解医院最新动态和健康资讯</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div class="relative">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索新闻..."
              class="w-full md:w-80 pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="activeCategory = category"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="news in filteredNews"
            :key="news.id"
            class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div class="relative h-48 overflow-hidden">
              <div v-if="news.image">
                <img
                  :src="news.image"
                  :alt="news.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-400">暂无图片</span>
              </div>
              <div class="absolute top-4 left-4">
                <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{{ news.category }}</span>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center space-x-2 text-gray-500 text-sm mb-3">
                <Calendar class="w-4 h-4" />
                <span>{{ news.date }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {{ news.title }}
              </h3>
              <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ news.excerpt }}</p>
              <a href="#" class="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                <span>阅读更多</span>
                <ArrowRight class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div v-if="filteredNews.length === 0" class="text-center py-16">
          <p class="text-gray-500">暂无相关新闻</p>
        </div>

        <div class="flex justify-center mt-10">
          <div class="flex items-center space-x-2">
            <button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">
              <ArrowRight class="w-5 h-5 rotate-180" />
            </button>
            <button class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">1</button>
            <button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">2</button>
            <button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">3</button>
            <button class="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors">
              <ArrowRight class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
