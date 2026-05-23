<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import recruitmentBg from '@/assets/recruitment-bg.png'
// import recruitmentAcademic from '@/assets/recruitment-academic.svg'
// import recruitmentSales from '@/assets/recruitment-sales.svg'
// import recruitmentOther from '@/assets/recruitment-other.svg'     
import router from '@/router'

const jobCategories = [
  {
    name: '博士后工作站',
    key: 'academic',
    icon: 'academic',
  },
  {
    name: '销售部职位',
    key: 'sales',
    icon: 'sales',
  },
  {
    name: '其他',
    key: 'other',
    icon: 'other',
  },
]


const goToCareers = () => {
  router.push({ path: '/careers' })
}
const handleClick = (job: { key: string; name: string; icon: string }) => {
  router.push({ path: '/careers', query: { job: job.key } })
}
</script>

<template>
  <section class="relative h-[900px] bg-[#F7F7F7] overflow-hidden">
    <!-- 背景图片 -->
    <div class="absolute inset-0">
      <img :src="recruitmentBg" alt="background" class="w-full h-full object-cover" />
    </div>

    <div class="relative h-full max-w-[1920px] mx-auto px-[230px] py-[100px] flex">
      <div class="w-full h-full flex items-center justify-center absolute top-0 left-0 z-0">
        <img src="@/assets/recruitment-main-bg.png" alt="main-bg" class="w-full h-full" />
      </div>
      <div class="w-full flex flex-col items-center justify-between position-relative z-10">

        <!-- 顶部文字 -->
        <div class="w-full flex items-start justify-between">
          <div class="">
            <span class="text-xs text-black mb-[10px] block">招聘信息</span>
            <h2 class="text-[32px] font-bold text-black mb-8">
              加入创造非凡的团队
            </h2>
          </div>
          <button
            class="flex items-center gap-2.5 bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-[30px] transition-colors cursor-pointer"
            @click="goToCareers">
            加入我们
            <img src="@/assets/recruitment-arrow-r.svg" alt="arrow-right" class="w-5 h-5" />
          </button>
        </div>

        <!-- 底部职位卡片 -->
        <div class="flex items-center gap-[50px] mb-[215px]">
          <div v-for="job in jobCategories" :key="job.name"
            @click="handleClick(job)"
            class="w-[260px] h-[130px] bg-[#0163FF] rounded-[36px] flex flex-col items-center justify-center gap-2.5 text-white hover:bg-blue-600 transition-colors cursor-pointer">
            <div class="w-[50px] h-[50px] flex items-center justify-center">
              <img v-if="job.icon === 'academic'" src="@/assets/recruitment-academic.svg" alt="academic"
                class="w-10 h-10" />
              <img v-else-if="job.icon === 'sales'" src="@/assets/recruitment-sale.svg" alt="sales" class="w-10 h-10" />
              <img v-else src="@/assets/recruitment-other.svg" alt="other" class="w-10 h-10" />
            </div>
            <span class="text-lg font-bold">{{ job.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
