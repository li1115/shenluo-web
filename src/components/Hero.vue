<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Play } from 'lucide-vue-next'

const slides = [
  {
    id: 1,
    title: '引领神经医学新时代',
    subtitle: '专注神经系统疾病治疗与研究',
    description: '神络医院汇聚国内外顶尖神经科专家，采用国际前沿技术，为患者提供全方位的诊疗服务',
    image: '',
    buttonText: '了解更多',
  },
  {
    id: 2,
    title: '精准诊断，科学治疗',
    subtitle: '先进设备助力精准医疗',
    description: '配备国际领先的神经影像学设备，实现疾病的早期发现和精准治疗',
    image: '',
    buttonText: '预约检查',
  },
  {
    id: 3,
    title: '关爱患者，呵护健康',
    subtitle: '温馨舒适的就医环境',
    description: '以人为本的服务理念，为患者提供温馨、舒适、便捷的就医体验',
    image: '',
    buttonText: '在线预约',
  },
]

const currentSlide = ref(0)
let autoPlayInterval: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startAutoPlay = () => {
  autoPlayInterval = setInterval(nextSlide, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<template>
  <section class="relative h-screen overflow-hidden" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <div class="relative h-full">
      <transition-group name="fade">
        <div
          v-for="(slide, index) in slides"
          v-show="currentSlide === index"
          :key="slide.id"
          class="absolute inset-0"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent"></div>
          <img
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover"
          />
          <div class="relative z-10 h-full flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="max-w-2xl">
                <span class="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full mb-6">
                  {{ slide.subtitle }}
                </span>
                <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {{ slide.title }}
                </h1>
                <p class="text-lg text-blue-100 mb-8 leading-relaxed">
                  {{ slide.description }}
                </p>
                <div class="flex flex-wrap gap-4">
                  <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
                    {{ slide.buttonText }}
                  </button>
                  <button class="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors flex items-center space-x-2">
                    <Play class="w-5 h-5" />
                    <span>观看视频</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
    >
      <ChevronLeft class="w-6 h-6" />
    </button>
    <button
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-colors"
    >
      <ChevronRight class="w-6 h-6" />
    </button>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full transition-all',
          currentSlide === index ? 'bg-blue-600 w-8' : 'bg-white/50 hover:bg-white/80'
        ]"
      ></button>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
