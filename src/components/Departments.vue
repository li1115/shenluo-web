<script setup lang="ts">
import { Brain, Heart, Eye, Pill, Stethoscope, Activity } from 'lucide-vue-next'

const departments = [
  {
    id: 1,
    name: '神经内科',
    icon: Brain,
    description: '专注于脑血管疾病、帕金森病、癫痫等神经系统疾病的诊断与治疗',
    count: '120+',
    countLabel: '床位',
  },
  {
    id: 2,
    name: '神经外科',
    icon: Stethoscope,
    description: '擅长颅内肿瘤、脑血管畸形、脊髓病变等神经外科手术治疗',
    count: '80+',
    countLabel: '床位',
  },
  {
    id: 3,
    name: '心血管内科',
    icon: Heart,
    description: '提供冠心病、高血压、心律失常等心血管疾病的综合治疗',
    count: '100+',
    countLabel: '床位',
  },
  {
    id: 4,
    name: '眼科',
    icon: Eye,
    description: '涵盖白内障、青光眼、眼底病等各类眼科疾病的诊治',
    count: '50+',
    countLabel: '床位',
  },
  {
    id: 5,
    name: '康复医学科',
    icon: Activity,
    description: '为神经系统疾病患者提供专业的康复治疗和训练',
    count: '60+',
    countLabel: '床位',
  },
  {
    id: 6,
    name: '药剂科',
    icon: Pill,
    description: '提供精准的药物治疗方案和药学咨询服务',
    count: '24',
    countLabel: '小时服务',
  },
]
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <span class="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-4">
          特色科室
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          专业科室，专注诊疗
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          神络医院设有多个专业科室，汇聚各领域专家，为患者提供全方位、专业化的医疗服务
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="dept in departments"
          :key="dept.id"
          class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <component :is="dept.icon" class="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-blue-600">{{ dept.count }}</div>
              <div class="text-xs text-gray-500">{{ dept.countLabel }}</div>
            </div>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ dept.name }}</h3>
          <p class="text-gray-600 text-sm leading-relaxed">{{ dept.description }}</p>
        </div>
      </div>

      <div class="text-center mt-10">
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">
          查看全部科室
        </button>
      </div>
    </div>
  </section>
</template>
