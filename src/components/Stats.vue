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
          {{ $t('home.stats.aboutLabel') }}
        </span>
        <h2 class="text-[66px] font-black text-black leading-tight font-alibabapuhuiti">
          {{ $t('home.stats.heading') }}
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

<style scoped>
/* ========== Responsive ========== */
@media (max-width: 1600px) {
  section[class*="py-\\[180px\\]"] {
    padding-top: clamp(60px, 9vw, 180px) !important;
    padding-bottom: clamp(60px, 9vw, 180px) !important;
  }
  section h2[class*="text-\\[66px\\]"] {
    font-size: clamp(36px, 3.5vw, 66px) !important;
  }
  section>div[class*="w-\\[1584px\\]"] {
    width: 100% !important;
    padding: 0 clamp(20px, 6vw, 120px);
  }
  section>div[class*="gap-10"] {
    gap: clamp(20px, 2vw, 40px) !important;
  }
  section div[class*="w-\\[366px\\]"] {
    width: clamp(200px, 19vw, 366px) !important;
    height: clamp(180px, 13.5vw, 260px) !important;
  }
  section div[class*="text-\\[80px\\]"] {
    font-size: clamp(40px, 4.2vw, 80px) !important;
  }
  section div[class*="text-\\[22px\\]"] {
    font-size: clamp(14px, 1.15vw, 22px) !important;
  }
}

@media (max-width: 1024px) {
  section>div[class*="gap-10"] {
    flex-wrap: wrap;
    justify-content: center;
  }
  section div[class*="w-\\[366px\\]"] {
    width: calc(50% - 16px) !important;
    min-width: 240px;
    height: 180px !important;
  }
}

@media (max-width: 768px) {
  section[class*="py-\\[180px\\]"] {
    padding-top: 40px !important;
    padding-bottom: 40px !important;
  }
  section h2[class*="text-\\[66px\\]"] {
    font-size: 30px !important;
  }
  section div[class*="text-\\[80px\\]"] {
    font-size: 36px !important;
  }
  section div[class*="text-\\[22px\\]"] {
    font-size: 14px !important;
  }
  section div[class*="w-\\[366px\\]"] {
    width: 100% !important;
  }
}

@media (max-width: 480px) {
  section h2[class*="text-\\[66px\\]"] {
    font-size: 24px !important;
  }
  section div[class*="text-\\[80px\\]"] {
    font-size: 30px !important;
  }
  section div[class*="w-\\[366px\\]"] {
    height: 150px !important;
  }
}
</style>
