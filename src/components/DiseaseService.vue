<script setup lang="ts">
import bgImage from '@/assets/disease-service-bg.png'
import phoneIcon from '@/assets/phone.svg'
import servicemask from '@/assets/service-mask.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/news')
}
</script>

<template>
  <section class="py-[100px] bg-[#F6F6F6]">
    <div class="flex flex-col items-center gap-[80px]">
      <div class="flex flex-col items-center gap-[27px] px-[240px] w-full">
        <span class="text-[18px] font-black text-[#0163FF] text-center font-alibabapuhuiti">{{ $t('home.diseaseService.label') }}</span>
        <h2 class="text-[66px] font-black text-black leading-tight text-center w-full font-alibabapuhuiti">{{ $t('home.diseaseService.heading') }}</h2>
      </div>

      <div class="flex justify-center items-stretch w-full">
        <div
          class="w-[834px] h-[627px] px-[59px] pt-[67px] pb-[138px] flex flex-col justify-between bg-white rounded-l-[36px] shadow-[0px_0px_94px_rgba(148,148,148,0.22)] relative flex-shrink-0">
          <div>
            <h3 class="text-[32px] font-black text-[#0163FF] mb-[22px] ml-[3px] font-alibabapuhuiti">{{ $t('home.diseaseService.serviceTitle') }}</h3>
            <p class="text-[16px] text-[#333] leading-[25px] max-w-[530px]">
              {{ $t('home.diseaseService.serviceDesc') }}
            </p>
          </div>
          <div class=" flex items-center gap-5">
            <div class="w-[92px] h-[92px] bg-[#0163FF] rounded-[32px] flex items-center justify-center">
              <img :src="phoneIcon" alt="phone" class="w-full h-full" />
            </div>
            <div>
              <p class="text-[16px] text-black mb-[15px] leading-[25px]">{{ $t("home.diseaseService.serviceCenter") }}</p>
              <p class="text-[20px] font-black text-black">400-808-5561</p>
            </div>
          </div>
        </div>

        <div class="w-[746px] h-[627px] rounded-r-[36px] relative flex-shrink-0 overflow-hidden"
          :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
          <div class="absolute bottom-[40px] left-[40px]">
            <div
              class="w-[158px] h-[80px] bg-[#375463] rounded-full absolute -bottom-[20px] -left-[60px] blur-[28px]" />
            <img :src="servicemask" alt="service-mask" class="w-[158px] h-[80px] absolute bottom-[50px] left-[125px]"
              style="object-fit: cover;" />

            <h3 class="relative text-[24px] font-black text-white leading-[29px] mb-[17px] max-w-[432px]">
              {{ $t('home.diseaseService.serviceTitle') }}
            </h3>
            <p class="relative text-[15px] text-white/80 mb-[17px]">
              {{ $t('home.diseaseService.diseaseSubtitle') }}
            </p>
            <button
              class="relative flex items-center justify-center gap-[3px] bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-[12px] w-[96px] h-[40px] rounded-[63px] shadow-[0px_9px_10px_rgba(0,190,153,0.17)] transition-colors cursor-pointer"
              @click="handleClick"
              >
              {{ $t('home.diseaseService.learnMore') }}
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <mask id="mask0_339_2880" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="12"
                  height="12">
                  <rect width="12" height="12" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_339_2880)">
                  <path
                    d="M8.08738 6.5H1.99988V5.5H8.08738L5.28738 2.7L5.99988 2L9.99988 6L5.99988 10L5.28738 9.3L8.08738 6.5Z"
                    fill="white" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>