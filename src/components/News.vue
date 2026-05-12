<script setup lang="ts">
import { Calendar, ArrowRight } from 'lucide-vue-next'

const news = [
  {
    id: 1,
    title: '神络医院成功开展首例脑机接口手术',
    excerpt: '我院神经外科团队成功完成首例脑机接口植入手术，为瘫痪患者带来新希望',
    date: '2024-01-15',
    image: '',
  },
  {
    id: 2,
    title: '新型神经保护药物临床试验取得重大突破',
    excerpt: '我院参与的新型神经保护药物临床试验取得显著成果，有望为脑卒中治疗带来革命性变化',
    date: '2024-01-12',
    image: '',
  },
  {
    id: 3,
    title: '神络医院荣获"全国文明医院"称号',
    excerpt: '在全国文明医院评选中，我院凭借优质服务和良好口碑荣获此项殊荣',
    date: '2024-01-10',
    image: '',
  },
]
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
        <div>
          <span class="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-4">
            新闻动态
          </span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800">
            医院动态，实时更新
          </h2>
        </div>
        <a href="/news" class="mt-4 md:mt-0 flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
          <span>查看全部新闻</span>
          <ArrowRight class="w-5 h-5" />
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="item in news"
          :key="item.id"
          class="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-5">
            <div class="flex items-center space-x-2 text-gray-500 text-sm mb-3">
              <Calendar class="w-4 h-4" />
              <span>{{ item.date }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm line-clamp-2">{{ item.excerpt }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
