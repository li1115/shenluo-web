<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import recruitmentBg from '@/assets/recruitment-bg.png'

const jobCategories = [
  {
    name: '博士后工作站',
    icon: 'academic',
  },
  {
    name: '销售部职位',
    icon: 'sales',
  },
  {
    name: '其他',
    icon: 'other',
  },
]
</script>

<template>
  <section class="relative h-[900px] bg-[#F7F7F7] overflow-hidden">
    <!-- 背景图片 -->
    <div class="absolute inset-0">
      <img :src="recruitmentBg" alt="background" class="w-full h-full object-cover" />
    </div>

    <div class="relative h-full max-w-[1920px] mx-auto px-[230px] flex items-center">
      <div class="w-full flex items-center justify-between">
        <!-- 左侧文字 -->
        <div class="max-w-[609px]">
          <span class="text-xs text-black mb-3 block">招聘信息</span>
          <h2 class="text-[32px] font-bold text-black mb-8">
            加入创造非凡的团队
          </h2>
          <button class="flex items-center gap-2.5 bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-[30px] transition-colors">
            加入我们
            <ArrowRight class="w-5 h-5" />
          </button>
        </div>

        <!-- 右侧职位卡片 -->
        <div class="flex items-center gap-[50px]">
          <div
            v-for="job in jobCategories"
            :key="job.name"
            class="w-[260px] h-[130px] bg-[#0163FF] rounded-[36px] flex flex-col items-center justify-center gap-2.5 text-white hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <div class="w-[50px] h-[50px] flex items-center justify-center">
              <svg v-if="job.icon === 'academic'" class="w-10 h-10" viewBox="0 0 50 50" fill="none">
                <path d="M25 8.33L8.33 16.67L25 25L41.67 16.67L25 8.33Z" stroke="white" stroke-width="2" fill="none"/>
                <path d="M12.5 20.83V33.33L25 41.67L37.5 33.33V20.83" stroke="white" stroke-width="2" fill="none"/>
                <line x1="25" y1="25" x2="25" y2="41.67" stroke="white" stroke-width="2"/>
              </svg>
              <svg v-else-if="job.icon === 'sales'" class="w-10 h-10" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="15" r="6.67" stroke="white" stroke-width="2" fill="none"/>
                <path d="M10 41.67C10 33.33 16.67 26.67 25 26.67C33.33 26.67 40 33.33 40 41.67" stroke="white" stroke-width="2" fill="none"/>
                <line x1="20" y1="36.67" x2="30" y2="36.67" stroke="white" stroke-width="2"/>
              </svg>
              <svg v-else class="w-10 h-10" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="16.67" stroke="white" stroke-width="2" fill="none"/>
                <circle cx="25" cy="25" r="5" fill="white"/>
                <circle cx="25" cy="12.5" r="3.33" fill="white"/>
                <circle cx="25" cy="37.5" r="3.33" fill="white"/>
                <circle cx="12.5" cy="25" r="3.33" fill="white"/>
                <circle cx="37.5" cy="25" r="3.33" fill="white"/>
              </svg>
            </div>
            <span class="text-lg font-bold">{{ job.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
