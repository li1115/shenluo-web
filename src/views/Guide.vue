<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Clock, MapPin, FileText, Phone, ChevronDown, ChevronUp } from 'lucide-vue-next'

const { t } = useI18n()

const activeTab = ref('register')

const tabs = computed(() => [
  { id: 'register', name: t('guide.tabs.register') },
  { id: 'process', name: t('guide.tabs.process') },
  { id: 'time', name: t('guide.tabs.time') },
  { id: 'location', name: t('guide.tabs.location') },
])

const faqs = computed(() => [
  {
    question: t('guide.faq.q1'),
    answer: t('guide.faq.a1'),
  },
  {
    question: t('guide.faq.q2'),
    answer: t('guide.faq.a2'),
  },
  {
    question: t('guide.faq.q3'),
    answer: t('guide.faq.a3'),
  },
  {
    question: t('guide.faq.q4'),
    answer: t('guide.faq.a4'),
  },
  {
    question: t('guide.faq.q5'),
    answer: t('guide.faq.a5'),
  },
])

const activeFaq = ref<number | null>(0)

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
}
</script>

<template>
  <div class="pt-24">
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ $t('guide.heading') }}</h1>
          <p class="text-blue-100 text-lg">{{ $t('guide.subtitle') }}</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all',
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ tab.name }}
          </button>
        </div>

        <div v-if="activeTab === 'register'" class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('guide.register.heading') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl p-6 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.register.online') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('guide.register.onlineDesc') }}</p>
            </div>
            <div class="bg-white rounded-xl p-6 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.register.phone') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('guide.register.phoneDesc') }}</p>
            </div>
            <div class="bg-white rounded-xl p-6 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.register.app') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('guide.register.appDesc') }}</p>
            </div>
            <div class="bg-white rounded-xl p-6 text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.register.onsite') }}</h3>
              <p class="text-gray-600 text-sm">{{ $t('guide.register.onsiteDesc') }}</p>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'process'" class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('guide.process.heading') }}</h2>
          <div class="relative">
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block"></div>
            <div class="space-y-8">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">1</div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.process.step1Title') }}</h3>
                  <p class="text-gray-600">{{ $t('guide.process.step1Desc') }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">2</div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.process.step2Title') }}</h3>
                  <p class="text-gray-600">{{ $t('guide.process.step2Desc') }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">3</div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.process.step3Title') }}</h3>
                  <p class="text-gray-600">{{ $t('guide.process.step3Desc') }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">4</div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.process.step4Title') }}</h3>
                  <p class="text-gray-600">{{ $t('guide.process.step4Desc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'time'" class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('guide.time.heading') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <Clock class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-semibold text-gray-800">{{ $t('guide.time.outpatientTitle') }}</h3>
              </div>
              <div class="space-y-2 text-gray-600">
                <p>{{ $t('guide.time.outpatientWeekday') }}</p>
                <p>{{ $t('guide.time.outpatientSaturday') }}</p>
                <p>{{ $t('guide.time.outpatientHoliday') }}</p>
              </div>
            </div>
            <div class="bg-white rounded-xl p-6">
              <div class="flex items-center space-x-3 mb-4">
                <Clock class="w-6 h-6 text-blue-600" />
                <h3 class="text-lg font-semibold text-gray-800">{{ $t('guide.time.emergencyTitle') }}</h3>
              </div>
              <div class="space-y-2 text-gray-600">
                <p>{{ $t('guide.time.emergency24h') }}</p>
                <p>{{ $t('guide.time.emergencyPhone') }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'location'" class="bg-gray-50 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('guide.location.heading') }}</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-xl overflow-hidden">
              <div class="w-full h-64 bg-gray-200 flex items-center justify-center">
                <span class="text-gray-400">{{ $t('guide.location.mapPlaceholder') }}</span>
              </div>
            </div>
            <div>
              <div class="flex items-start space-x-3 mb-4">
                <MapPin class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ $t('guide.location.address') }}</h3>
                  <p class="text-gray-600">{{ $t('guide.location.addressValue') }}</p>
                </div>
              </div>
              <div class="flex items-start space-x-3 mb-4">
                <Phone class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ $t('guide.location.phone') }}</h3>
                  <p class="text-gray-600">{{ $t('guide.location.phoneValue') }}</p>
                </div>
              </div>
              <div class="text-gray-600">
                <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ $t('guide.location.transport') }}</h3>
                <ul class="space-y-1">
                  <li>{{ $t('guide.location.metro') }}</li>
                  <li>{{ $t('guide.location.bus') }}</li>
                  <li>{{ $t('guide.location.car') }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-8">常见问题</h2>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-white rounded-xl overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-800">{{ faq.question }}</span>
              <ChevronDown v-if="activeFaq !== index" class="w-5 h-5 text-gray-500" />
              <ChevronUp v-else class="w-5 h-5 text-blue-600" />
            </button>
            <div
              v-show="activeFaq === index"
              class="px-6 pb-6 text-gray-600"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  div[class*="pt-24"] {
    padding-top: 72px !important;
  }
  section[class*="py-20"] {
    padding-top: 40px !important;
    padding-bottom: 40px !important;
  }
  h1[class*="text-4xl"] {
    font-size: 28px !important;
  }
  div[class*="p-8"] {
    padding: 20px !important;
  }
  div[class*="p-6"] {
    padding: 16px !important;
  }
  div[class*="space-x-4"][class*="flex"][class*="items-start"] {
    flex-shrink: 0;
  }
}

@media (max-width: 480px) {
  h1[class*="text-4xl"] {
    font-size: 22px !important;
  }
  section[class*="py-16"] {
    padding-top: 32px !important;
    padding-bottom: 32px !important;
  }
  div[class*="gap-4"][class*="flex-wrap"] {
    gap: 8px !important;
  }
  button[class*="px-6"][class*="py-3"] {
    padding: 8px 16px !important;
    font-size: 13px !important;
  }
}
</style>
