<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import router from '@/router'

const goToCareers = () => {
  router.push({ path: '/careers' })
}
</script>

<template>
  <footer class="bg-[#323438] pt-[99px] pb-5">
    <div class="max-w-[1920px] mx-auto px-[230px]">
      <div class="flex justify-between pb-[60px] mb-[50px]">
        <!-- 左侧公司信息 -->
        <div class="max-w-[299px]">
          <div class="mb-[19px]">
            <img src="@/assets/logo.svg" alt="logo">
          </div>
          <p class="text-[15px] text-[#A0A1A2] leading-[22px] mb-[35px]">
            全球唯一同时拥有三大植入式神经调控平台的尖端创新医疗科技企业，致力于打破技术壁垒，守护人类健康。
          </p>
          <button
            class="flex items-center gap-2.5 border border-[#0163FF] text-[#0163FF] font-normal text-[15px] pl-[41px] pr-[43px] py-[15px] rounded-sm hover:bg-[#0163FF] hover:text-white transition-colors cursor-pointer group"
            @click="goToCareers">
            加入非凡团队
            <ArrowRight class="w-[13px] h-[13px] transition-transform" />
          </button>
        </div>

        <!-- 核心业务 -->
        <div>
          <h4 class="text-white font-black text-base leading-[22px] mb-[31px] font-dinblack">核心业务</h4>
          <div class="flex flex-col gap-5">
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">脊髓神经刺激系统SCS</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">外周围神经刺激系统PNS</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">植入式胫神经刺激系统TNS</a>
          </div>
        </div>
        <!-- 了解我们 -->
        <div class="flex flex-col">
          <h4 class="text-white font-black text-base leading-[22px] mb-[31px] font-dinblack">了解我们</h4>
          <div class="flex flex-col gap-5">
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">关于我们</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">神络资讯</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">博士后工作站直招</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">全国销售与市场岗位</a>
          </div>
        </div>

        <!-- 联系我们 -->
        <div>
          <h4 class="text-white font-black text-base leading-[22px] mb-[27px] font-dinblack">联系我们</h4>
          <div class="space-y-[20px]">
            <div class="flex items-center gap-[15px]">
              <div class="w-[2px] h-[55px] bg-[#0163FF]"></div>
              <div class="flex flex-col gap-[10px]">
                <span class="text-xs text-[#A0A1A2]">客服热线</span>
                <span class="text-[22px] font-black text-white leading-[22px] font-dinblack">0571-88560292</span>
              </div>
            </div>
            <div class="flex items-center gap-[15px]">
              <div class="w-[2px] h-[55px] bg-[#0163FF]"></div>
              <div class="flex flex-col gap-[10px]">
                <span class="text-xs text-[#A0A1A2]">企业邮箱</span>
                <span class="text-lg font-black text-white leading-[22px] font-dinblack">public@seeneuro.com</span>
              </div>
            </div>
          </div>
          <div class="mt-[15px] flex items-center justify-start gap-[15px]">
            <div class="w-20 h-20 bg-white mt-[6px] rounded flex items-center justify-center">
              <img src="@/assets/wechat.png" alt="wechat">
            </div>
            <span class="text-xs text-[#A0A1A2]">微信公众号</span>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="border-t border-white/10 py-5 flex justify-between items-center justify-center">
        <span class="text-xs text-[#A0A1A2]">杭州神络医疗科技有限公司. All Rights Reserved.</span>
        <span class="text-xs text-[#A0A1A2] mx-[10px]">|</span>
        <span class="text-xs text-[#A0A1A2]">杭州神络医疗科技有限公司. All Rights Reserved.</span>
      </div>
    </div>
  </footer>
</template>
