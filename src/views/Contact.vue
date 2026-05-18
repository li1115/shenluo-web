<script setup lang="ts">
import { ref } from 'vue'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-vue-next'

const formData = ref({
  name: '',
  phone: '',
  email: '',
  department: '',
  message: '',
})

const departments = [
  '神经内科',
  '神经外科',
  '心血管内科',
  '眼科',
  '康复医学科',
  '其他',
]

const handleSubmit = () => {
  alert('感谢您的留言，我们会尽快与您联系！')
  formData.value = {
    name: '',
    phone: '',
    email: '',
    department: '',
    message: '',
  }
}

const contactInfo = [
  {
    icon: MapPin,
    title: '医院地址',
    content: '北京市朝阳区神经科学大道100号',
  },
  {
    icon: Phone,
    title: '联系电话',
    content: '400-888-8888',
  },
  {
    icon: Mail,
    title: '电子邮箱',
    content: 'contact@shenluo.com',
  },
  {
    icon: Clock,
    title: '工作时间',
    content: '周一至周日 8:00-20:00',
  },
]
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">联系我们</h1>
          <p class="text-blue-100 text-lg">如有任何疑问或建议，请随时与我们联系</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-8">联系方式</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div
                v-for="info in contactInfo"
                :key="info.title"
                class="bg-gray-50 rounded-xl p-6"
              >
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <component :is="info.icon" class="w-6 h-6 text-blue-600" />
                </div>
                <h3 class="font-semibold text-gray-800 mb-2">{{ info.title }}</h3>
                <p class="text-gray-600">{{ info.content }}</p>
              </div>
            </div>

            <div class="bg-gray-50 rounded-xl overflow-hidden">
              <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span class="text-gray-400">医院外观</span>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-bold text-gray-800 mb-6">在线留言</h2>
            <form @submit.prevent="handleSubmit" class="bg-gray-50 rounded-2xl p-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-gray-700 font-medium mb-2">姓名</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    placeholder="请输入您的姓名"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">联系电话</label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    placeholder="请输入您的电话号码"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-gray-700 font-medium mb-2">电子邮箱</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    placeholder="请输入您的邮箱"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-2">咨询科室</label>
                  <select
                    v-model="formData.department"
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">请选择科室</option>
                    <option v-for="dept in departments" :key="dept" :value="dept">
                      {{ dept }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-gray-700 font-medium mb-2">留言内容</label>
                <textarea
                  v-model="formData.message"
                  rows="4"
                  placeholder="请输入您的留言内容..."
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Send class="w-5 h-5" />
                <span>提交留言</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
