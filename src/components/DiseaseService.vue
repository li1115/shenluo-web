<script setup lang="ts">
import bgImage from '@/assets/disease-service-bg.png'
import phoneIcon from '@/assets/phone.svg'
import servicemask from '@/assets/service-mask.svg'
import { useRouter } from 'vue-router'

const router = useRouter()
defineProps({
  id: {
    type: String,
    default: 'home-patient-service'
  }
})
const handleClick = () => {
  router.push('/news')
}
</script>

<template>
  <section class="py-[6.25rem] bg-[#F6F6F6]" :id="id">
    <div class="flex flex-col items-center gap-[5rem]">
      <div class="flex flex-col items-center gap-[1.6875rem] px-[15rem] w-full">
        <span class="text-[1.125rem] font-black text-[#0163FF] text-center font-alibabapuhuiti">{{
          $t('home.diseaseService.label') }}</span>
        <h2 class="text-[4.125rem] font-black text-black leading-tight text-center w-full font-alibabapuhuiti">{{
          $t('home.diseaseService.heading') }}</h2>
      </div>

      <div class="flex justify-center items-stretch w-full">
        <div
          class="w-[52.125rem] h-[39.1875rem] px-[3.6875rem] pt-[4.1875rem] pb-[8.625rem] flex flex-col justify-between bg-white rounded-l-[2.25rem] shadow-[0_0_5.875rem_rgba(148,148,148,0.22)] relative flex-shrink-0">
          <div>
            <h3 class="text-[2rem] font-black text-[#0163FF] mb-[1.375rem] ml-[0.1875rem] font-alibabapuhuiti">{{
              $t('home.diseaseService.serviceTitle') }}</h3>
            <p class="text-[1rem] text-[#333] leading-[1.5625rem] max-w-[33.125rem]">
              {{ $t('home.diseaseService.serviceDesc') }}
            </p>
          </div>
          <div class=" flex items-center gap-5">
            <div class="w-[5.75rem] h-[5.75rem] bg-[#0163FF] rounded-[2rem] flex items-center justify-center">
              <img :src="phoneIcon" alt="phone" class="w-full h-full" />
            </div>
            <div>
              <p class="text-[1rem] text-black mb-[0.9375rem] leading-[1.5625rem]">{{
                $t("home.diseaseService.serviceCenter") }}</p>
              <p class="text-[1.25rem] font-black text-black">400-808-5561</p>
            </div>
          </div>
        </div>

        <div class="w-[46.625rem] h-[39.1875rem] rounded-r-[2.25rem] relative flex-shrink-0 overflow-hidden"
          :style="{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
          <div class="absolute bottom-[2.5rem] left-[2.5rem]">
            <div
              class="w-[9.875rem] h-[5rem] bg-[#375463] rounded-full absolute -bottom-[1.25rem] -left-[3.75rem] blur-[1.75rem]" />
            <img :src="servicemask" alt="service-mask"
              class="w-[9.875rem] h-[5rem] absolute bottom-[3.125rem] left-[7.8125rem]" style="object-fit: cover;" />

            <h3 class="relative text-[1.5rem] font-black text-white leading-[1.8125rem] mb-[1.0625rem] max-w-[27rem]">
              {{ $t('home.diseaseService.serviceTitle') }}
            </h3>
            <p class="relative text-[0.9375rem] text-white/80 mb-[1.0625rem]">
              {{ $t('home.diseaseService.diseaseSubtitle') }}
            </p>
            <button
              class="relative flex items-center justify-center gap-[0.1875rem] bg-[#0163FF] hover:bg-blue-600 text-white font-bold text-[0.75rem] w-[6rem] h-[2.5rem] rounded-[3.9375rem] shadow-[0_0.5625rem_0.625rem_rgba(0,190,153,0.17)] transition-colors cursor-pointer transform transition-transform duration-300 hover:scale-103"
              @click="handleClick">
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