<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import statsBg from '@/assets/stats-bg.png'

const { t } = useI18n()

const stats = computed(() => [
  { value: 8, suffix: '+', label: t('home.stats.rdYears'), animated: ref(0) },
  { value: 100, suffix: '+', label: t('home.stats.patents'), animated: ref(0) },
  { value: 20, suffix: 'K+', label: t('home.stats.patients'), animated: ref(0) },
  { value: 8, suffix: '亿+', label: t('home.stats.rdInvestment'), animated: ref(0) },
])

const animateValue = (stat: { value: number; animated: { value: number } }, duration: number) => {
  const totalSteps = stat.value
  const interval = duration / totalSteps
  let step = 0
  stat.animated.value = 0

  const timer = setInterval(() => {
    step++
    stat.animated.value = step
    if (step >= totalSteps) {
      clearInterval(timer)
    }
  }, interval)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stats.value.forEach((stat, index) => {
          setTimeout(() => {
            animateValue(stat, 2000)
          }, index * 200)
        })
        observer.disconnect()
      }
    })
  })
  const el = document.getElementById('stats-section')
  if (el) observer.observe(el)
})
</script>

<template>
  <section id="stats-section" class="relative py-[11.25rem] overflow-hidden">
    <!-- 背景图片 -->
    <div class="absolute inset-0">
      <img :src="statsBg" alt="background" class="w-full h-full object-cover" />
    </div>
    <!-- 毛玻璃效果层 -->
    <div class="absolute inset-0 backdrop-blur-[4.625rem] bg-white/29"></div>

    <div class="relative max-w-[120rem] mx-auto">
      <!-- 标题区域 -->
      <div class="text-center mb-[6.25rem]">
        <span class="block text-[#0163FF] font-black text-lg mb-[1.6875rem] font-alibabapuhuiti">
          {{ $t('home.stats.aboutLabel') }}
        </span>
        <h2 class="text-[4.125rem] font-black text-black leading-tight font-alibabapuhuiti">
          {{ $t('home.stats.heading') }}
        </h2>
      </div>

      <!-- 统计卡片 -->
      <div class="flex justify-center gap-10 w-[99rem] mx-auto">
        <div v-for="stat in stats" :key="stat.label"
          class="bg-white rounded-[1.125rem] w-[22.875rem] h-[16.25rem] flex flex-col items-center justify-center gap-4 transition-transform duration-300 hover:-translate-y-2 hover:box-shadow-[0_0.5rem_1.875rem_rgba(0,0,0,0.1)]">
          <div class="text-[5rem] font-black text-[#0163FF] leading-none font-alibabapuhuiti">
            {{ stat.animated.value }}{{ stat.suffix }}
          </div>
          <div class="text-[#65758C] text-[1.375rem] font-medium font-alibabapuhuiti">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
