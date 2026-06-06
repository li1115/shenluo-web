<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import Stats from '@/components/Stats.vue'
import News from '@/components/News.vue'
import Recruitment from '@/components/Recruitment.vue'
import Products from '@/components/Products.vue'
import DiseaseService from '@/components/DiseaseService.vue'
import { useRevealOnScroll } from '@/shared/utils/useRevealOnScroll'

useRevealOnScroll()
</script>

<template>
  <div>
    <Hero class="reveal" />
    <Products id="home-products" class="reveal" />
    <DiseaseService id="home-patient-service" class="reveal" />
    <News class="reveal" />
    <Stats class="reveal" />
    <Recruitment class="reveal" />
  </div>
</template>