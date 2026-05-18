<script setup lang="ts">
import { ref } from 'vue'
import { Clock, MapPin, FileText, Phone, ChevronDown, ChevronUp } from 'lucide-vue-next'

const activeTab = ref('register')

const tabs = [
  { id: 'register', name: '预约挂号' },
  { id: 'process', name: '就诊流程' },
  { id: 'time', name: '就诊时间' },
  { id: 'location', name: '医院位置' },
]

const faqs = [
  {
    question: '如何预约挂号？',
    answer: '您可以通过以下方式预约挂号：1. 登录医院官方网站进行在线预约；2. 拨打预约热线400-888-8888；3. 下载医院官方APP进行预约；4. 前往医院挂号窗口现场预约。',
  },
  {
    question: '预约成功后如何取号？',
    answer: '预约成功后，请在就诊当天携带患者有效身份证件（身份证、医保卡等）前往医院挂号窗口或自助取号机办理取号手续。建议提前30分钟到达医院。',
  },
  {
    question: '就诊需要携带哪些证件？',
    answer: '就诊时请携带患者本人的有效身份证件（身份证、户口本等）、医保卡（如有）、既往病历资料、检查报告、化验结果等相关医疗文件。',
  },
  {
    question: '如何查询检查报告？',
    answer: '您可以通过医院官方网站、APP或微信公众号查询检查报告。一般情况下，检查报告在检查完成后的1-3个工作日内可查询。',
  },
  {
    question: '医院提供哪些支付方式？',
    answer: '医院支持多种支付方式：现金、银行卡、医保卡、微信支付、支付宝支付等。',
  },
]

const activeFaq = ref<number | null>(0)

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
}
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">就诊指南</h1>
          <p class="text-blue-100 text-lg">为您提供详细的就诊信息和指引</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all',
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>

        <div v-if="activeTab === 'register'" class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">预约挂号方式</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl p-6 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">官网预约</h3>
              <p class="text-gray-600 text-sm">登录医院官方网站进行在线预约</p>
            </div>
            <div class="bg-white rounded-xl p-6 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">电话预约</h3>
              <p class="text-gray-600 text-sm">拨打预约热线 400-888-8888</p>
            </div>
            <div class="bg-white rounded-xl p-6 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">APP预约</h3>
              <p class="text-gray-600 text-sm">下载医院官方APP进行预约</p>
            </div>
            <div class="bg-white rounded-xl p-6 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">现场预约</h3>
              <p class="text-gray-600 text-sm">前往医院挂号窗口预约</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'process'" class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">就诊流程</h2>
          <div class="relative">
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
            <div class="space-y-8">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">预约挂号</h3>
                  <p class="text-gray-600">选择科室和医生，完成预约挂号</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">签到候诊</h3>
                  <p class="text-gray-600">凭预约信息或身份证到科室签到等候</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">医生诊疗</h3>
                  <p class="text-gray-600">医生问诊、检查，制定治疗方案</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">4</div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">缴费取药</h3>
                  <p class="text-gray-600">凭处方到药房取药或办理检查</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'time'" class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">就诊时间</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <Clock class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-semibold text-gray-800">门诊时间</h3>
              </div>
              <div class="space-y-2 text-gray-600">
                <p>周一至周五：8:00 - 17:30</p>
                <p>周六：8:00 - 12:00</p>
                <p>周日及节假日：休息</p>
              </div>
            </div>
            <div class="bg-white rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <Clock class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-semibold text-gray-800">急诊时间</h3>
              </div>
              <div class="space-y-2 text-gray-600">
                <p>全年无休，24小时接诊</p>
                <p>急诊热线：400-888-9999</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'location'" class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">医院位置</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl overflow-hidden">
              <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span class="text-gray-400">地图区域</span>
              </div>
            </div>
            <div>
              <div class="flex items-start space-x-3 mb-4">
                <MapPin class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">地址</h3>
                  <p class="text-gray-600">北京市朝阳区神经科学大道100号</p>
                </div>
              </div>
              <div class="flex items-start space-x-3 mb-4">
                <Phone class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">电话</h3>
                  <p class="text-gray-600">400-888-8888</p>
                </div>
              </div>
              <div class="text-gray-600">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">交通路线</h3>
                <ul class="space-y-1">
                  <li>地铁：10号线神经科站B口出</li>
                  <li>公交：123、456、789路神络医院站</li>
                  <li>驾车：导航搜索"神络医院"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">常见问题</h2>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-xl overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-800">{{ faq.question }}</span>
              <ChevronDown v-if="activeFaq !== index" class="w-5 h-5 text-gray-500" />
              <ChevronUp v-else class="w-5 h-5 text-blue-600" />
            </button>
            <div
              v-show="activeFaq === index"
              class="px-6 pb-6 text-gray-600"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
