<script setup lang="ts">
import { MapPin, Phone, Mail, Clock } from 'lucide-vue-next'

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' },
  { name: '科室介绍', path: '/departments' },
  { name: '专家团队', path: '/doctors' },
]

const services = [
  { name: '在线挂号', path: '/' },
  { name: '健康咨询', path: '/' },
  { name: '体检中心', path: '/' },
  { name: '远程会诊', path: '/' },
]
</script>

<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <span class="text-white text-xl font-bold">神络</span>
            </div>
            <div>
              <h3 class="text-lg font-bold">神络医院</h3>
              <p class="text-xs text-gray-400">NEURAL NETWORK HOSPITAL</p>
            </div>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            神络医院是一家专注于神经系统疾病治疗与研究的现代化专科医院，致力于为患者提供最优质的医疗服务。
          </p>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">快速链接</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <a :href="link.path" class="text-gray-400 hover:text-white text-sm transition-colors">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">医疗服务</h4>
          <ul class="space-y-2">
            <li v-for="service in services" :key="service.name">
              <a :href="service.path" class="text-gray-400 hover:text-white text-sm transition-colors">
                {{ service.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold mb-4">联系我们</h4>
          <ul class="space-y-3">
            <li class="flex items-start space-x-3">
              <MapPin class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span class="text-gray-400 text-sm">北京市朝阳区神经科学大道100号</span>
            </li>
            <li class="flex items-center space-x-3">
              <Phone class="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span class="text-gray-400 text-sm">400-888-8888</span>
            </li>
            <li class="flex items-center space-x-3">
              <Mail class="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span class="text-gray-400 text-sm">contact@shenluo.com</span>
            </li>
            <li class="flex items-center space-x-3">
              <Clock class="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span class="text-gray-400 text-sm">周一至周日 8:00-20:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-500 text-sm">
          &copy; 2024 神络医院. 保留所有权利.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">隐私政策</a>
          <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">服务条款</a>
          <a href="#" class="text-gray-500 hover:text-white text-sm transition-colors">网站地图</a>
        </div>
      </div>
    </div>
  </footer>
</template>
