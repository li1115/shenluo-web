<script setup lang="ts">
import { Award, Users, Building2, Heart } from 'lucide-vue-next'

const milestones = [
  { year: '1995', title: '医院成立', description: '神络医院正式成立，开始为患者提供神经科医疗服务' },
  { year: '2003', title: '扩建升级', description: '医院进行大规模扩建，床位数量增加至300张' },
  { year: '2010', title: '成为三甲医院', description: '通过三级甲等医院评审，成为国内一流神经专科医院' },
  { year: '2018', title: '科研突破', description: '神经科学研究中心成立，多项科研成果获得国家级奖励' },
  { year: '2024', title: '智慧医院', description: '全面升级为智慧医院，引入AI辅助诊断系统' },
]

const features = [
  { icon: Building2, title: '现代化设施', description: '配备国际先进的医疗设备和舒适的就医环境' },
  { icon: Users, title: '专业团队', description: '汇聚国内外顶尖神经科专家，提供权威诊疗服务' },
  { icon: Award, title: '科研创新', description: '持续开展神经科学研究，推动医学进步' },
  { icon: Heart, title: '人文关怀', description: '以人为本的服务理念，关爱每一位患者' },
]
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">关于我们</h1>
          <p class="text-blue-100 text-lg">了解神络医院的发展历程和核心优势</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-800 mb-6">我们的使命</h2>
            <p class="text-gray-600 leading-relaxed mb-6">
              神络医院自1995年成立以来，始终致力于神经系统疾病的诊断、治疗与研究。我们汇聚了国内外顶尖的神经科专家团队，配备国际先进的医疗设备，为患者提供全方位、专业化的医疗服务。
            </p>
            <p class="text-gray-600 leading-relaxed">
              我们的使命是通过不断创新和卓越服务，帮助每一位患者恢复健康，重获新生。我们相信，科学的力量和人文的关怀能够创造奇迹。
            </p>
          </div>
          <div class="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center">
            <span class="text-gray-400">暂无图片</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">发展历程</h2>
          <p class="text-gray-600">见证神络医院的成长与蜕变</p>
        </div>

        <div class="relative">
          <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2 hidden md:block"></div>
          
          <div class="space-y-8">
            <div
              v-for="(milestone, index) in milestones"
              :key="milestone.year"
              :class="[
                'relative flex items-center',
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              ]"
            >
              <div :class="['w-full md:w-1/2 px-4', index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12']">
                <div :class="['bg-white rounded-2xl p-6 shadow-sm', index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto']">
                  <div class="text-blue-600 text-3xl font-bold mb-2">{{ milestone.year }}</div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ milestone.title }}</h3>
                  <p class="text-gray-600">{{ milestone.description }}</p>
                </div>
              </div>
              <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full items-center justify-center">
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-4">核心优势</h2>
          <p class="text-gray-600">我们的四大核心竞争力</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <component :is="feature.icon" class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
