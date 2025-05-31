<template>
    <div class="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50 text-gray-800 dark:bg-neutral-800 dark:text-white"
        :style="backgroundStyle">
        <div class="flex flex-col items-center justify-center text-center gap-6" :class="{
            'w-full max-w-3xl rounded-2xl shadow-xl p-8 border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-md backdrop-saturate-150 text-white dark:text-gray-200': config.imageCover,
            '': !config.imageCover // No additional classes when imageCover is not set
        }">

            <Head>
                <Title>{{ config.siteTitle }}</Title>
                <Meta name="description" :content="String(config.metaDescription)" />
                <Link rel="icon" type="image/png" :href="config.favicon" />
            </Head>

            <img :src="config.profileImage as string" :alt="config.profileName as string"
                class="w-42 h-42 rounded-full mb-6 shadow-lg object-cover" />
            <h1 class="text-4xl font-bold mb-6 dark:text-neutral-200">{{ config.profileName }}</h1>

            <p v-if="config.profileDescription" class="text-md mb-6 max-w-xl dark:text-neutral-200">
                {{ config.profileDescription }}
            </p>

            <div class="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-lg">
                <a v-for="(link, i) in parsedLinks" :key="i" :href="link.url"
                    class="flex items-center justify-center gap-2 px-3 py-3 border-2 border-neutral-300 rounded-full shadow hover:bg-gray-100 transition dark:text-neutral-200 dark:hover:bg-neutral-300 dark:border-neutral-700 dark:shadow-[0_0_6px_rgba(255,255,255,0.08)]"
                    target="_blank" rel="noopener noreferrer">
                    <img :src="link.icon" :alt="link.label" class="w-6 h-6" />
                </a>
            </div>
            <button @click="generateVCard"
                class="flex items-center justify-center gap-2 px-4 py-2 mb-6 border-2 border-gray-300 rounded-full shadow hover:bg-gray-100 transition dark:text-neutral-200 dark:hover:bg-neutral-300 dark:hover:text-gray-700 dark:border-neutral-700">
                Contact (.vcf)
            </button>

            <footer class="text-sm mt-10 dark:text-neutral-200">
                {{ config.copyright }}
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useVCard } from '~/composables/useVCard'
import { useCoverCompute } from '~/composables/coverCompute'

const { generateVCard } = useVCard()
const { backgroundStyle } = useCoverCompute()

const config = useRuntimeConfig().public
const parsedLinks = Array.isArray(config.links)
  ? config.links.filter((link: any) => typeof link === 'object' && link !== null && 'icon' in link && 'label' in link && 'url' in link)
  : []
</script>