<template>
    <component :is="currentComponent" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig().public
const validTemplates = ['basic', 'modern']
const templateChoiceRaw = (config.template || '').toLowerCase()
const templateChoice = validTemplates.includes(templateChoiceRaw) ? templateChoiceRaw : 'modern'

const currentComponent = defineAsyncComponent(() =>
    templateChoice === 'basic'
        ? import('~/components/basicTemplate.vue')
        : import('~/components/fancyTemplate.vue')
)
</script>
  
