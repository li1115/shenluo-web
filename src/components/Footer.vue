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
            {{ $t('footer.companyDesc') }}
          </p>
          <button
            class="flex items-center gap-2.5 border border-[#0163FF] text-[#0163FF] font-normal text-[15px] pl-[41px] pr-[43px] py-[15px] rounded-sm hover:bg-[#0163FF] hover:text-white transition-colors cursor-pointer group"
            @click="goToCareers">
            {{ $t('footer.joinTeam') }}
            <ArrowRight class="w-[13px] h-[13px] transition-transform" />
          </button>
        </div>

        <!-- 核心业务 -->
        <div>
          <h4 class="text-white font-black text-base leading-[22px] mb-[31px] font-dinblack">{{ $t('footer.coreBusiness') }}</h4>
          <div class="flex flex-col gap-5">
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">{{ $t('footer.scs') }}</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">{{ $t('footer.pns') }}</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">{{ $t('footer.tns') }}</a>
          </div>
        </div>
        <!-- 了解我们 -->
        <div class="flex flex-col">
          <h4 class="text-white font-black text-base leading-[22px] mb-[31px] font-dinblack">{{ $t('footer.aboutUs') }}</h4>
          <div class="flex flex-col gap-5">
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">{{ $t('footer.about') }}</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">{{ $t('footer.news') }}</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">{{ $t('footer.postdoctoral') }}</a>
            <a href="#" class="text-[15px] text-[#A0A1A2] hover:text-white transition-colors">{{ $t('footer.salesJobs') }}</a>
          </div>
        </div>

        <!-- 联系我们 -->
        <div>
          <h4 class="text-white font-black text-base leading-[22px] mb-[27px] font-dinblack">{{ $t('footer.contactUs') }}</h4>
          <div class="space-y-[20px]">
            <div class="flex items-center gap-[15px]">
              <div class="w-[2px] h-[55px] bg-[#0163FF]"></div>
              <div class="flex flex-col gap-[10px]">
                <span class="text-xs text-[#A0A1A2]">{{ $t('footer.serviceHotline') }}</span>
                <span class="text-[22px] font-black text-white leading-[22px] font-dinblack">0571-88560292</span>
              </div>
            </div>
            <div class="flex items-center gap-[15px]">
              <div class="w-[2px] h-[55px] bg-[#0163FF]"></div>
              <div class="flex flex-col gap-[10px]">
                <span class="text-xs text-[#A0A1A2]">{{ $t('footer.companyEmail') }}</span>
                <span class="text-lg font-black text-white leading-[22px] font-dinblack">public@seeneuro.com</span>
              </div>
            </div>
          </div>
          <div class="mt-[15px] flex items-center justify-start gap-[15px]">
            <div class="w-20 h-20 bg-white mt-[6px] rounded flex items-center justify-center">
              <img src="@/assets/wechat.png" alt="wechat">
            </div>
            <span class="text-xs text-[#A0A1A2]">{{ $t('footer.wechatPublic') }}</span>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="border-t border-white/10 py-5 flex justify-between items-center justify-center">
        <span class="text-xs text-[#A0A1A2]">{{ $t('footer.copyright') }}</span>
        <span class="text-xs text-[#A0A1A2] mx-[10px]">|</span>
        <span class="text-xs text-[#A0A1A2]">{{ $t('footer.copyright') }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ========== Responsive ========== */
@media (max-width: 1600px) {
  footer>div {
    padding-left: clamp(40px, 8vw, 230px) !important;
    padding-right: clamp(40px, 8vw, 230px) !important;
  }
}

@media (max-width: 1280px) {
  footer>div {
    padding-left: 40px !important;
    padding-right: 40px !important;
  }
  footer>div>div:first-child {
    flex-wrap: wrap;
    gap: 40px;
  }
}

@media (max-width: 1024px) {
  footer {
    padding-top: 60px !important;
  }
  footer>div>div:first-child {
    flex-direction: column;
    gap: 32px;
  }
  footer>div>div:first-child>div {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  footer>div {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  footer {
    padding-top: 40px !important;
  }
  footer>div>div:first-child {
    padding-bottom: 30px !important;
    margin-bottom: 30px !important;
    gap: 24px;
  }
}

@media (max-width: 480px) {
  footer>div {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  footer {
    padding-top: 30px !important;
  }
  footer>div>div:first-child {
    gap: 20px;
  }
}
</style>
