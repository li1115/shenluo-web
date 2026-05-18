<script setup lang="ts">
import { ArrowRight, Phone } from 'lucide-vue-next'
import bgImage from '@/assets/disease-service-bg.png'
</script>

<template>
  <section class="py-[100px] bg-[#F6F6F6]">
    <div class="flex flex-col items-center gap-[80px]">
      <div class="flex flex-col items-center gap-[27px] px-[240px] w-full max-w-[960px]">
        <span class="text-[18px] font-black text-[#0163FF] text-center">患者服务</span>
        <h2 class="text-[66px] font-black text-black leading-tight text-center">学习疾病知识，获取贴心服务</h2>
      </div>

      <div class="flex justify-center items-stretch w-full px-[170px]">
        <div class="w-[834px] h-[627px] bg-white rounded-l-[36px] shadow-[0px_0px_94px_rgba(148,148,148,0.22)] relative flex-shrink-0">
          <div class="px-[59px] pt-[67px]">
            <h3 class="text-[32px] font-black text-[#0163FF] mb-[27px]">服务与支持</h3>
            <p class="text-[16px] text-[#333] leading-[25px] max-w-[530px]">
              我们深知，每一次使用都关乎健康与信任。因此，从产品咨询到日常维护从操作指导到售后保障，我们为您搭建起全方位的支持体系。专业客服团队随时待命，全国服务网点便捷可达。
            </p>
          </div>
          <div class="absolute bottom-[67px] left-[59px] flex items-center gap-[15px]">
            <div class="w-[92px] h-[92px] bg-[#0163FF] rounded-[32px] flex items-center justify-center">
              <Phone class="w-[40px] h-[40px] text-white" />
            </div>
            <div>
              <p class="text-[16px] text-black">专业服务中心</p>
              <p class="text-[20px] font-black text-black">400-808-5561</p>
            </div>
          </div>
        </div>

        <div
          class="w-[746px] h-[627px] rounded-r-[36px] relative flex-shrink-0 overflow-hidden"
          :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        >
          <div class="absolute bottom-[40px] left-[40px]">
            <div class="w-[158px] h-[80px] bg-[#375463] rounded-full absolute -bottom-[20px] -left-[60px] blur-[28px]" />
            <h3 class="relative text-[24px] font-black text-white leading-[29px] mb-[5px] max-w-[432px]">
              特发性震颤的疾病简介、症状和治疗方法
            </h3>
            <p class="relative text-[15px] text-white/80 mb-[17px]">疾病知识与科普教育</p>
            <button class="relative flex items-center justify-center gap-[3px] bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-[12px] w-[96px] h-[40px] rounded-[63px] shadow-[0px_9px_10px_rgba(0,190,153,0.17)] transition-colors">
              了解更多
              <ArrowRight class="w-[12px] h-[12px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>