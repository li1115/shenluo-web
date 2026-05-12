<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Users, Bed, Award, Clock } from 'lucide-vue-next'

const stats = [
  { icon: Users, value: 500000, label: '服务患者', suffix: '+', animated: ref(0) },
  { icon: Bed, value: 500, label: '床位数量', suffix: '+', animated: ref(0) },
  { icon: Award, value: 98, label: '治愈率', suffix: '%', animated: ref(0) },
  { icon: Clock, value: 24, label: '小时服务', suffix: '', animated: ref(0) },
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
  setTimeout(() => {
    stats.forEach((stat, index) => {
      setTimeout(() => {
        animateValue(stat, 2000)
      }, index * 200)
    })
  }, 500)
})
</script>

<template>
  <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center text-white"
        >
          <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
            <component :is="stat.icon" class="w-8 h-8" />
          </div>
          <div class="text-4xl md:text-5xl font-bold mb-2">
            {{ stat.animated.toLocaleString() }}{{ stat.suffix }}
          </div>
          <div class="text-blue-100">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
