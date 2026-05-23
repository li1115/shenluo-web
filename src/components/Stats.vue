<script setup lang="ts">
import { ref, onMounted } from 'vue'
import statsBg from '@/assets/stats-bg.png'

const stats = [
  { value: 8, suffix: '+', label: '核心研发积淀(年)', animated: ref(0) },
  { value: 100, suffix: '+', label: '专利技术', animated: ref(0) },
  { value: 20, suffix: 'K+', label: '服务患者', animated: ref(0) },
  { value: 8, suffix: '亿+', label: '研发投资', animated: ref(0) },
]

const animateValue = (stat: { value: number; animated: { value: number } }, duration: number) => {
  const startTime = performance.now()
  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    stat.animated.value = Math.floor(stat.value * easeOutQuart)
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        stats.forEach((stat, index) => {
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
  <section id="stats-section" class="relative py-[180px] overflow-hidden">
    <!-- 背景图片 -->
    <div class="absolute inset-0">
      <img :src="statsBg" alt="background" class="w-full h-full object-cover" />
    </div>
    <!-- 毛玻璃效果层 -->
    <div class="absolute inset-0 backdrop-blur-[74px] bg-white/29"></div>

    <div class="relative max-w-[1920px] mx-auto">
      <!-- 标题区域 -->
      <div class="text-center mb-[100px]">
        <span class="block text-[#0163FF] font-black text-lg mb-[27px] font-alibabapuhuiti">
          关于我们
        </span>
        <h2 class="text-[66px] font-black text-black leading-tight font-alibabapuhuiti">
          打破技术垄断，领航全球
        </h2>
      </div>

      <!-- 统计卡片 -->
      <div class="flex justify-center gap-10 w-[1584px] mx-auto">
        <div v-for="stat in stats" :key="stat.label"
          class="bg-white rounded-[18px] w-[366px] h-[260px] flex flex-col items-center justify-center gap-4">
          <div class="text-[80px] font-black text-[#0163FF] leading-none font-alibabapuhuiti">
            {{ stat.animated.value }}{{ stat.suffix }}
          </div>
          <div class="text-[#65758C] text-[22px] font-medium font-alibabapuhuiti">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
