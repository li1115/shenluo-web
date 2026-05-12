<script setup lang="ts">
import { ref } from 'vue'
import { Star, Award, Calendar, ArrowRight } from 'lucide-vue-next'

const doctors = [
  {
    id: 1,
    name: '张明远',
    title: '主任医师',
    department: '神经内科',
    specialty: '脑血管疾病、帕金森病、癫痫',
    experience: '30年临床经验',
    education: '北京医科大学博士',
    rating: 4.9,
    image: '',
  },
  {
    id: 2,
    name: '李芳华',
    title: '副主任医师',
    department: '神经外科',
    specialty: '颅内肿瘤、脊髓病变、脑血管畸形',
    experience: '20年临床经验',
    education: '复旦大学医学院博士',
    rating: 4.8,
    image: '',
  },
  {
    id: 3,
    name: '王建国',
    title: '主任医师',
    department: '心血管内科',
    specialty: '冠心病、心律失常、心力衰竭',
    experience: '25年临床经验',
    education: '上海交通大学医学院博士',
    rating: 4.9,
    image: '',
  },
  {
    id: 4,
    name: '陈雅琴',
    title: '副主任医师',
    department: '眼科',
    specialty: '白内障、青光眼、眼底病',
    experience: '18年临床经验',
    education: '中山大学医学院博士',
    rating: 4.7,
    image: '',
  },
  {
    id: 5,
    name: '刘志强',
    title: '主任医师',
    department: '康复医学科',
    specialty: '神经康复、运动康复',
    experience: '22年临床经验',
    education: '浙江大学医学院博士',
    rating: 4.8,
    image: '',
  },
  {
    id: 6,
    name: '赵晓燕',
    title: '副主任医师',
    department: '神经内科',
    specialty: '头痛眩晕、睡眠障碍',
    experience: '15年临床经验',
    education: '中南大学湘雅医学院博士',
    rating: 4.6,
    image: '',
  },
]

const selectedDoctor = ref(doctors[0])

const selectDoctor = (doctor: typeof doctors[0]) => {
  selectedDoctor.value = doctor
}
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">专家团队</h1>
          <p class="text-blue-100 text-lg">认识我们的权威专家</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div class="lg:col-span-1">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">专家列表</h2>
            <div class="space-y-3">
              <button
                v-for="doctor in doctors"
                :key="doctor.id"
                @click="selectDoctor(doctor)"
                :class="[
                  'w-full flex items-center space-x-4 p-4 rounded-xl transition-all text-left',
                  selectedDoctor.id === doctor.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                ]"
              >
                <img
                  :src="doctor.image"
                  :alt="doctor.name"
                  class="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <div class="font-semibold">{{ doctor.name }}</div>
                  <div class="text-sm opacity-75">{{ doctor.title }}</div>
                </div>
              </button>
            </div>
          </div>

          <div class="lg:col-span-3">
            <div class="bg-gray-50 rounded-2xl overflow-hidden">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div class="md:col-span-1">
                  <img
                    :src="selectedDoctor.image"
                    :alt="selectedDoctor.name"
                    class="w-full h-80 md:h-full object-cover"
                  />
                </div>
                <div class="md:col-span-2 p-8">
                  <div class="flex items-center space-x-4 mb-4">
                    <h3 class="text-2xl font-bold text-gray-800">{{ selectedDoctor.name }}</h3>
                    <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{{ selectedDoctor.title }}</span>
                  </div>
                  
                  <div class="flex items-center space-x-4 text-gray-500 mb-6">
                    <span>{{ selectedDoctor.department }}</span>
                    <span>|</span>
                    <div class="flex items-center space-x-1">
                      <Star class="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{{ selectedDoctor.rating }}</span>
                    </div>
                  </div>

                  <div class="space-y-4 mb-8">
                    <div class="flex items-start space-x-3">
                      <Award class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div class="text-sm text-gray-500">教育背景</div>
                        <div class="text-gray-800">{{ selectedDoctor.education }}</div>
                      </div>
                    </div>
                    <div class="flex items-start space-x-3">
                      <Calendar class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div class="text-sm text-gray-500">临床经验</div>
                        <div class="text-gray-800">{{ selectedDoctor.experience }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-8">
                    <h4 class="text-lg font-semibold text-gray-800 mb-3">专业擅长</h4>
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="skill in selectedDoctor.specialty.split('、')"
                        :key="skill"
                        class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                      >
                        {{ skill }}
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
        </div>
      </div>
    </section>
  </div>
</template>
