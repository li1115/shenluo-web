<script setup lang="ts">
</script>

<template>
  <div class="pt-[120px]">
    <section class="py-20 bg-gradient-to-r from-[#0163FF] to-[#008ACB] text-white">
      <div class="max-w-[1460px] mx-auto px-[60px] text-center">
        <h1 class="text-5xl font-black mb-4">{{ $t('patientService.heading') }}</h1>
        <p class="text-white/70 text-lg">{{ $t('patientService.subtitle') }}</p>
      </div>
    </section>
    <section class="py-20 bg-white">
      <div class="max-w-[1460px] mx-auto px-[60px]">
        <div class="grid grid-cols-3 gap-8">
          <div class="bg-[#F9FAFC] rounded-[10px] p-10 text-center">
            <div class="w-16 h-16 bg-[#E9F1FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-[#0163FF]" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="8" width="24" height="16" rx="2"/>
                <line x1="4" y1="14" x2="28" y2="14"/>
              </svg>
            </div>
            <h3 class="text-xl font-black mb-3">{{ $t('patientService.appointment') }}</h3>
            <p class="text-[#999999] text-sm">{{ $t('patientService.appointmentDesc') }}</p>
          </div>
          <div class="bg-[#F9FAFC] rounded-[10px] p-10 text-center">
            <div class="w-16 h-16 bg-[#E9F1FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-[#0163FF]" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="16" cy="16" r="12"/>
                <polyline points="12,16 15,19 20,13"/>
              </svg>
            </div>
            <h3 class="text-xl font-black mb-3">{{ $t('patientService.reportQuery') }}</h3>
            <p class="text-[#999999] text-sm">{{ $t('patientService.reportQueryDesc') }}</p>
          </div>
          <div class="bg-[#F9FAFC] rounded-[10px] p-10 text-center">
            <div class="w-16 h-16 bg-[#E9F1FF] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-[#0163FF]" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12L16 6L10 12"/>
                <path d="M16 6V22"/>
                <rect x="8" y="14" width="16" height="12" rx="2"/>
              </svg>
            </div>
            <h3 class="text-xl font-black mb-3">{{ $t('patientService.onlineConsult') }}</h3>
            <p class="text-[#999999] text-sm">{{ $t('patientService.onlineConsultDesc') }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@media (max-width: 1024px) {
  .patient-service :deep(.px-\[230px\]) {
    padding-left: 60px;
    padding-right: 60px;
  }
}
@media (max-width: 768px) {
  .patient-service :deep(.px-\[230px\]) {
    padding-left: 24px;
    padding-right: 24px;
  }
}
</style>