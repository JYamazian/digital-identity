<template>
    <div class="min-h-[100dvh] flex items-center justify-center bg-gray-50 text-gray-900 dark:bg-neutral-800 dark:text-neutral-200 p-4 sm:p-6"
        :style="config.imageCover ? backgroundStyle : {}">
        <div class="flex flex-col items-center text-center gap-8 w-full max-w-3xl" :class="{
            'rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20 backdrop-blur-md backdrop-saturate-150':
                !!config.imageCover,
        }">

            <Head>
                <Title>{{ config.siteTitle }}</Title>
                <Meta name="description" :content="String(config.metaDescription)" />
                <Link rel="icon" type="image/png" :href="config.favicon" />
            </Head>

            <img :src="config.profileImage as string" :alt="config.profileName as string"
                class="w-28 h-28 sm:w-36 sm:h-36 rounded-full shadow-lg object-cover" />
            <h1 class="text-3xl sm:text-4xl font-bold">{{ config.profileName }}</h1>

            <p v-if="config.profileDescription" class="text-base sm:text-lg max-w-xl">
                {{ config.profileDescription }}
            </p>

            <div class="flex flex-wrap justify-center gap-4 w-full max-w-lg">
                <a v-for="(link, i) in parsedLinks" :key="i" :href="link.url"
                    class="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-300 bg-white/10 shadow-sm transition-all duration-200 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:shadow-[0_0_6px_rgba(255,255,255,0.1)]"
                    target="_blank" rel="noopener noreferrer">
                    <img :src="link.icon" :alt="link.label" class="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
            </div>

            <button @click="generateVCard"
                class="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-neutral-300 bg-white/10 shadow-sm transition-all duration-200 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:shadow-[0_0_6px_rgba(255,255,255,0.1)]">
                Contact Card
            </button>

            <footer class="text-sm mt-8 sm:mt-8">
                {{ config.copyright }}
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVCard } from '~/composables/useVCard'
import { useCoverCompute } from '~/composables/coverCompute'
import { useLogger } from '~/composables/logger'

const { generateVCard } = useVCard()
const { backgroundStyle } = useCoverCompute()
const log = useLogger('basicTemplate')

const config = useRuntimeConfig().public
const parsedLinks = Array.isArray(config.links)
  ? config.links.filter((link: any) => typeof link === 'object' && link !== null && 'icon' in link && 'label' in link && 'url' in link)
  : []
log.debug('Parsed links:', parsedLinks)
</script>