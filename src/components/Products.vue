<script setup lang="ts">
import product1 from '@/assets/product-1.png'
import product2 from '@/assets/product-2.png'
import product3 from '@/assets/product-3.png'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const products = [
  {
    id: 1,
    name: '脊髓神经刺激系统SCS',
    description: '作为长效疼痛管理的黄金标准，通过微创植入，向脊特定靶点发送高频电脉冲，精准阻断疼痛信号传导。设备支持超长无线续航与智能程控。',
    image: product1,
    selected: true,
  },
  {
    id: 2,
    name: '外周围神经刺激系统PNS',
    description: '基于闭环生物传感与智能反馈机制，专为特发性震颤及瘤病等神经疾病设计，设备自适应调控脉冲强度，温和恢复神经系统正常节律。',
    image: product2,
    selected: false,
  },
  {
    id: 3,
    name: '植入式胫神经刺激系统TNS',
    description: '打破传统神经调控的体积局限，采用超微型无线电极阵列设计，精准靶向外周神经丛，微创改善局部神经功能障碍，重塑患者行动自由。',
    image: product3,
    selected: false,
  },
]

const goToDetail = (id: number) => {
  router.push(`/product/${id}`)
}

const cardWidth = 500
const gap = 40
const step = cardWidth + gap
const totalSetWidth = products.length * step

const duplicated = computed(() => [...products])

const scrollOffset = ref(0)
const isPaused = ref(false)
let animId: number | null = null
const SPEED = 0.3

const animate = () => {
  if (!isPaused.value) {
    scrollOffset.value += SPEED
    if (scrollOffset.value >= totalSetWidth) {
      scrollOffset.value -= totalSetWidth
    }
  }
  animId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (products.length > 3) {
    animId = requestAnimationFrame(animate)
  }
})

onBeforeUnmount(() => {
  if (animId) cancelAnimationFrame(animId)
})
</script>

<template>
  <section class="pt-[100px] bg-white">
    <div class="max-w-[1920px] mx-auto">
      <div class="text-center ">
        <span class="block text-[#0163FF] font-black text-lg mb-5 font-alibabapuhuiti">
          产品展示
        </span>
        <h2 class="text-[66px] font-black text-black leading-tight font-alibabapuhuiti">
          三大核心植入平台
        </h2>
      </div>

      <div class="overflow-hidden pt-[80px] pb-[100px]" @mouseenter="isPaused = true" @mouseleave="isPaused = false">
        <div class="flex gap-10 will-change-transform mx-auto w-fit" :style="{ transform: `translateX(-${scrollOffset}px)` }">
          <div v-for="(product, idx) in duplicated" :key="idx"
            class="w-[500px] h-[500px] bg-[#F9FAFC] border border-[#F1F2F4] rounded-[10px] overflow-hidden flex flex-col flex-shrink-0 cursor-pointer 
            transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]
            hover:shadow-[0px_22px_34px_0px_#F3F3F3] hover:border-[#CDEAF5] hover:cursor-pointer hover:translate-y-[-10px] group"
              @click="goToDetail(product.id)">
            <div class="h-[340px] flex items-center justify-center overflow-hidden">
              <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 flex flex-col items-center justify-center px-[70px] gap-5 pb-[7px]">
              <h3 class="text-2xl font-black text-black text-center font-dinblack">{{ product.name }}</h3>
              <p class="text-[15px] text-[#999999] text-center leading-[23px] font-pingfang">
                {{ product.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>