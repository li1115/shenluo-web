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
            <span class="text-xs text-black mb-[10px] block">
          {{ $t('home.recruitment.label') }}
            </span>
            <h2 class="text-[32px] font-bold text-black mb-8">
          {{ $t('home.recruitment.heading') }}
            </h2>
          </div>
          <button
            class="flex items-center gap-2.5 bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-[30px] transition-colors cursor-pointer"
            @click="goToCareers">
            {{ $t('home.recruitment.joinUs') }}
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

<style scoped>
/* ========== Responsive ========== */
@media (max-width: 1600px) {
  section[class*="h-\\[900px\\]"] {
    height: clamp(480px, 46vw, 900px) !important;
  }
  section div[class*="px-\\[230px\\]"] {
    padding-left: clamp(24px, 8vw, 230px) !important;
    padding-right: clamp(24px, 8vw, 230px) !important;
  }
  section h2[class*="text-\\[32px\\]"] {
    font-size: clamp(22px, 1.7vw, 32px) !important;
  }
  section div[class*="w-\\[260px\\]"] {
    width: clamp(180px, 13.5vw, 260px) !important;
    height: clamp(100px, 6.8vw, 130px) !important;
    border-radius: clamp(20px, 1.9vw, 36px) !important;
  }
  section div[class*="gap-\\[50px\\]"] {
    gap: clamp(20px, 2.6vw, 50px) !important;
  }
}

@media (max-width: 1280px) {
  section[class*="h-\\[900px\\]"] {
    height: auto !important;
    min-height: 480px;
    padding-top: 60px !important;
    padding-bottom: 60px !important;
  }
  section div[class*="px-\\[230px\\]"] {
    padding: 40px 32px !important;
  }
}

@media (max-width: 768px) {
  section[class*="h-\\[900px\\]"] {
    min-height: 400px;
    padding-top: 40px !important;
    padding-bottom: 40px !important;
  }
  section div[class*="px-\\[230px\\]"] {
    padding: 30px 20px !important;
  }
  section h2[class*="text-\\[32px\\]"] {
    font-size: 22px !important;
  }
  section div[class*="w-\\[260px\\]"] {
    width: 150px !important;
    height: 90px !important;
    border-radius: 16px !important;
  }
  section div[class*="gap-\\[50px\\]"] {
    gap: 16px !important;
  }
}

@media (max-width: 480px) {
  section div[class*="w-\\[260px\\]"] {
    width: 100% !important;
    height: 80px !important;
  }
  section div[class*="gap-\\[50px\\]"] {
    flex-direction: column;
    width: 100%;
    gap: 12px !important;
  }
  section h2[class*="text-\\[32px\\]"] {
    font-size: 18px !important;
  }
}
</style>
