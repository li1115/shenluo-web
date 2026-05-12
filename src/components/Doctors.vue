<script setup lang="ts">
import { Star, Award } from 'lucide-vue-next'

const doctors = [
  {
    id: 1,
    name: '张明远',
    title: '主任医师',
    department: '神经内科',
    specialty: '脑血管疾病、帕金森病',
    experience: '30年临床经验',
    rating: 4.9,
    image: '',
  },
  {
    id: 2,
    name: '李芳华',
    title: '副主任医师',
    department: '神经外科',
    specialty: '颅内肿瘤、脊髓病变',
    experience: '20年临床经验',
    rating: 4.8,
    image: '',
  },
  {
    id: 3,
    name: '王建国',
    title: '主任医师',
    department: '心血管内科',
    specialty: '冠心病、心律失常',
    experience: '25年临床经验',
    rating: 4.9,
    image: '',
  },
  {
    id: 4,
    name: '陈雅琴',
    title: '副主任医师',
    department: '眼科',
    specialty: '白内障、青光眼',
    experience: '18年临床经验',
    rating: 4.7,
    image: '',
  },
]
</script>

<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <span class="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-4">
          专家团队
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          权威专家，专业诊疗
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          汇聚国内外顶尖医疗专家，为您提供权威、专业的诊疗服务
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="doctor in doctors"
          :key="doctor.id"
          class="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
          <div class="relative">
            <img
              :src="doctor.image"
              :alt="doctor.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
              <Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span class="text-sm font-medium text-gray-700">{{ doctor.rating }}</span>
            </div>
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-800">{{ doctor.name }}</h3>
              <span class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{{ doctor.title }}</span>
            </div>
            <p class="text-gray-500 text-sm mb-2">{{ doctor.department }}</p>
            <p class="text-gray-600 text-sm mb-3">{{ doctor.specialty }}</p>
            <div class="flex items-center space-x-2 text-gray-500 text-xs">
              <Award class="w-4 h-4" />
              <span>{{ doctor.experience }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-10">
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
          查看全部专家
        </button>
      </div>
    </div>
  </section>
</template>
