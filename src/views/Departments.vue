<script setup lang="ts">
import { ref } from 'vue'
import { Brain, Heart, Eye, Pill, Stethoscope, Activity, ArrowRight } from 'lucide-vue-next'

const departments = [
  {
    id: 1,
    name: '神经内科',
    icon: Brain,
    description: '专注于脑血管疾病、帕金森病、癫痫、多发性硬化症等神经系统疾病的诊断与治疗',
    services: ['脑血管疾病', '帕金森病', '癫痫', '多发性硬化症', '头痛眩晕'],
    doctors: 25,
    beds: 120,
  },
  {
    id: 2,
    name: '神经外科',
    icon: Stethoscope,
    description: '擅长颅内肿瘤、脑血管畸形、脊髓病变、颅脑外伤等神经外科手术治疗',
    services: ['颅内肿瘤', '脑血管畸形', '脊髓病变', '颅脑外伤', '功能神经外科'],
    doctors: 18,
    beds: 80,
  },
  {
    id: 3,
    name: '心血管内科',
    icon: Heart,
    description: '提供冠心病、高血压、心律失常、心力衰竭等心血管疾病的综合治疗',
    services: ['冠心病', '高血压', '心律失常', '心力衰竭', '心肌病'],
    doctors: 20,
    beds: 100,
  },
  {
    id: 4,
    name: '眼科',
    icon: Eye,
    description: '涵盖白内障、青光眼、眼底病、屈光不正等各类眼科疾病的诊治',
    services: ['白内障', '青光眼', '眼底病', '屈光不正', '眼表疾病'],
    doctors: 12,
    beds: 50,
  },
  {
    id: 5,
    name: '康复医学科',
    icon: Activity,
    description: '为神经系统疾病患者提供专业的康复治疗和训练，帮助患者恢复功能',
    services: ['神经康复', '运动康复', '言语康复', '认知康复', '康复工程'],
    doctors: 15,
    beds: 60,
  },
  {
    id: 6,
    name: '药剂科',
    icon: Pill,
    description: '提供精准的药物治疗方案和药学咨询服务，确保用药安全有效',
    services: ['临床药学', '药物咨询', '药物监测', '用药指导', '药品管理'],
    doctors: 8,
    beds: 0,
  },
]

const selectedDept = ref(departments[0])

const selectDept = (dept: typeof departments[0]) => {
  selectedDept.value = dept
}
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">科室介绍</h1>
          <p class="text-blue-100 text-lg">了解各科室的专业领域和服务内容</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">科室列表</h2>
            <div class="space-y-3">
              <button
                v-for="dept in departments"
                :key="dept.id"
                @click="selectDept(dept)"
                :class="[
                  'w-full flex items-center space-x-4 p-4 rounded-xl transition-all text-left',
                  selectedDept.id === dept.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                ]"
              >
                <div :class="[
                  'w-12 h-12 rounded-xl flex items-center justify-center',
                  selectedDept.id === dept.id ? 'bg-white/20' : 'bg-blue-100'
                ]">
                  <component
                    :is="dept.icon"
                    :class="[
                      'w-6 h-6',
                      selectedDept.id === dept.id ? 'text-white' : 'text-blue-600'
                    ]"
                  />
                </div>
                <div>
                  <div class="font-semibold">{{ dept.name }}</div>
                  <div class="text-sm opacity-75">{{ dept.doctors }}位医生</div>
                </div>
              </button>
            </div>
          </div>

          <div class="lg:col-span-2">
            <div class="bg-gray-50 rounded-2xl p-8">
              <div class="flex items-center space-x-4 mb-6">
                <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                  <component :is="selectedDept.icon" class="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-800">{{ selectedDept.name }}</h3>
                  <div class="flex items-center space-x-4 text-gray-500 text-sm mt-1">
                    <span>{{ selectedDept.doctors }}位医生</span>
                    <span>|</span>
                    <span v-if="selectedDept.beds > 0">{{ selectedDept.beds }}张床位</span>
                  </div>
                </div>
              </div>

              <p class="text-gray-600 mb-8 leading-relaxed">
                {{ selectedDept.description }}
              </p>

              <div class="mb-8">
                <h4 class="text-lg font-semibold text-gray-800 mb-4">诊疗范围</h4>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="service in selectedDept.services"
                    :key="service"
                    class="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>

              <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium flex items-center space-x-2 transition-colors">
                <span>预约挂号</span>
                <ArrowRight class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
