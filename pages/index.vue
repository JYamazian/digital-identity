<template>
  <component
    :is="currentComponent"
    :copyright-text="copyrightText"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig().public
const validTemplates = ['basic', 'modern']
const templateChoiceRaw = (config.template || '').toLowerCase()
const templateChoice = validTemplates.includes(templateChoiceRaw) ? templateChoiceRaw : 'modern'
const copyrightText = computed(() => {
  const year = new Date().getFullYear().toString()
  const copyright = config.copyright ? String(config.copyright) : `© ${year}`
  return copyright.replace('{year}', year)
})

const currentComponent = defineAsyncComponent(() =>
  templateChoice === 'basic'
    ? import('~/components/basicTemplate.vue')
    : import('~/components/modernTemplate.vue'),
)
</script>
