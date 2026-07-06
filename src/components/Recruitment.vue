<script setup lang="ts">
import recruitmentBg from '@/assets/recruitment-bg.png'
// import recruitmentAcademic from '@/assets/recruitment-academic.svg'
// import recruitmentSales from '@/assets/recruitment-sales.svg'
// import recruitmentOther from '@/assets/recruitment-other.svg'     
import router from '@/router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const jobCategories = computed(() => [
  {
    name: t('home.recruitment.postdoctoral'),
    key: 'academic',
    icon: 'academic',
  },
  {
    name: t('home.recruitment.sales'),
    key: 'sales',
    icon: 'sales',
  },
  {
    name: t('home.recruitment.other'),
    key: 'other',
    icon: 'other',
  },
])


const goToCareers = () => {
  router.push({ path: '/about/careers' })
}
const handleClick = (job: { key: string; name: string; icon: string }) => {
  router.push({ path: '/about/careers', query: { job: job.key } })
}
</script>

<template>
  <section class="relative h-[56.25rem] bg-[#F7F7F7] overflow-hidden">
    <!-- 背景图片 -->
    <div class="absolute inset-0">
      <img :src="recruitmentBg" alt="background" class="w-full h-full object-cover" />
    </div>

    <div class="relative h-full mx-auto px-[14.375rem] py-[6.25rem] flex">
      <div class="w-full h-full flex items-center justify-center absolute top-0 left-0 z-0">
        <img src="@/assets/recruitment-main-bg.png" alt="main-bg" class="w-full h-full" />
      </div>
      <div class="max-w-[98.75rem] mx-auto w-full flex flex-col items-center justify-between position-relative z-10">

        <!-- 顶部文字 -->
        <div class="w-full flex items-start justify-between">
          <div class="">
            <span class="text-[1.75rem] text-black mb-[0.625rem] block">
              {{ $t('home.recruitment.label') }}
            </span>
            <h2 class="text-[2rem] font-bold text-black mb-8">
              {{ $t('home.recruitment.heading') }}
            </h2>
          </div>
          <button
            class="flex text-[1.5rem] items-center gap-2.5 bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-[1.875rem] transition-colors cursor-pointer transform transition-transform duration-300 hover:scale-103"
            @click="goToCareers">
            {{ $t('home.recruitment.joinUs') }}
            <img src="@/assets/recruitment-arrow-r.svg" alt="arrow-right" class="w-[1.25rem] h-[1.25rem]" />
          </button>
        </div>

        <!-- 底部职位卡片 -->
        <div class="flex items-center gap-[3.125rem] mb-[13.4375rem]">
          <div v-for="job in jobCategories" :key="job.name" @click="handleClick(job)"
            class="w-[16.25rem] h-[8.125rem] bg-[#0163FF] rounded-[2.25rem] flex flex-col items-center justify-center gap-2.5 text-white hover:bg-blue-600 transition-colors cursor-pointer transform transition-transform duration-300 hover:-translate-y-2">
            <div class="w-[3.125rem] h-[3.125rem] flex items-center justify-center">
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
