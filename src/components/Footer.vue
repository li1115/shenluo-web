<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import router from '@/router'
import { productsData } from '@/shared/products'

const goToCareers = () => {
  router.push({ path: '/about/careers' })
}

const goToProduct = (productCode: string) => {
  if (!productCode || productCode === 'NEURO-PNS') {
    return
  }
  router.push(`/products/product/${productCode}`)
}

const goTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <footer class="bg-[#323438] pt-[6.1875rem] pb-5">
    <div class="max-w-[120rem] mx-auto px-[14.375rem]">
      <div class="flex justify-between pb-[3.75rem] mb-[3.125rem]">
        <!-- 左侧公司信息 -->
        <div class="max-w-[18.6875rem]">
          <div class="mb-[1.1875rem]">
            <img class="w-[9.3125rem]" src="@/assets/logo.svg" alt="logo">
          </div>
          <p class="text-[0.9375rem] text-[#A0A1A2] leading-[1.375rem] mb-[2.1875rem]">
            {{ $t('footer.companyDesc') }}
          </p>
          <button
            class="flex items-center gap-2.5 border border-[#0163FF] text-[#0163FF] font-normal text-[0.9375rem] pl-[2.5625rem] pr-[2.6875rem] py-[0.9375rem] rounded-sm hover:bg-[#0163FF] hover:text-white transition-colors cursor-pointer group"
            @click="goToCareers">
            {{ $t('footer.joinTeam') }}
            <ArrowRight class="w-[0.8125rem] h-[0.8125rem] transition-transform" />
          </button>
        </div>

        <!-- 核心业务 -->
        <div>
          <h4 class="text-white font-black text-base leading-[1.375rem] mb-[1.9375rem] font-dinblack">{{
            $t('footer.coreBusiness') }}</h4>
          <div class="flex flex-col gap-5">
            <a v-for="product in productsData" :key="product.productCode" href="javascript:void(0)"
              class="text-[0.9375rem] text-[#A0A1A2] hover:text-white transition-colors"
              @click="goToProduct(product.productCode)">{{ $t(product.nameKey) }}</a>
          </div>
        </div>
        <!-- 了解我们 -->
        <div class="flex flex-col">
          <h4 class="text-white font-black text-base leading-[1.375rem] mb-[1.9375rem] font-dinblack">{{
            $t('footer.aboutUs') }}</h4>
          <div class="flex flex-col gap-5">
            <a href="javascript:void(0)" class="text-[0.9375rem] text-[#A0A1A2] hover:text-white transition-colors"
              @click="goTo('/about')">{{ $t('footer.about') }}</a>
            <a href="javascript:void(0)" class="text-[0.9375rem] text-[#A0A1A2] hover:text-white transition-colors"
              @click="goTo('/news')">{{ $t('footer.news') }}</a>
            <a href="javascript:void(0)" class="text-[0.9375rem] text-[#A0A1A2] hover:text-white transition-colors"
              @click="goTo('/about/careers?job=academic')">{{ $t('footer.postdoctoral') }}</a>
            <a href="javascript:void(0)" class="text-[0.9375rem] text-[#A0A1A2] hover:text-white transition-colors"
              @click="goTo('/about/careers?job=sales')">{{ $t('footer.salesJobs') }}</a>
          </div>
        </div>

        <!-- 联系我们 -->
        <div>
          <h4 class="text-white font-black text-base leading-[1.375rem] mb-[1.6875rem] font-dinblack">{{
            $t('footer.contactUs') }}</h4>
          <div class="space-y-[1.25rem]">
            <div class="flex items-center gap-[0.9375rem]">
              <div class="w-[0.125rem] h-[3.4375rem] bg-[#0163FF]"></div>
              <div class="flex flex-col gap-[0.625rem]">
                <span class="text-xs text-[#A0A1A2]">{{ $t('footer.serviceHotline') }}</span>
                <span
                  class="text-[1.375rem] font-black text-white leading-[1.375rem] font-dinblack">0571-88560292</span>
              </div>
            </div>
            <div class="flex items-center gap-[0.9375rem]">
              <div class="w-[0.125rem] h-[3.4375rem] bg-[#0163FF]"></div>
              <div class="flex flex-col gap-[0.625rem]">
                <span class="text-xs text-[#A0A1A2]">{{ $t('footer.companyEmail') }}</span>
                <span class="text-lg font-black text-white leading-[1.375rem] font-dinblack">public@seeneuro.com</span>
              </div>
            </div>
          </div>
          <div class="mt-[0.9375rem] flex items-center justify-start gap-[0.9375rem]">
            <div class="w-20 h-20 bg-white mt-[0.375rem] rounded flex items-center justify-center">
              <img src="@/assets/wechat.png" alt="wechat">
            </div>
            <span class="text-xs text-[#A0A1A2]">{{ $t('footer.wechatPublic') }}</span>
          </div>
        </div>
      </div>

      <!-- 底部版权 -->
      <div class="border-t border-white/10 py-5 flex justify-between items-center justify-center">
        <span class="text-xs text-[#A0A1A2]">{{ $t('footer.copyright') }}</span>
        <!-- <span class="text-xs text-[#A0A1A2] mx-[0.625rem]">|</span>
        <span class="text-xs text-[#A0A1A2]">{{ $t('footer.copyright') }}</span> -->
      </div>
    </div>
  </footer>
</template>
