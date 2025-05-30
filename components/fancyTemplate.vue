<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 p-6">
        <div :class="[
            'flex w-full bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden',
            layout === 'vertical'
                ? 'flex-col max-w-3xl'
                : 'flex-col max-w-5xl md:flex-row md:max-w-5xl'
        ]">
            <div :class="[
                'flex-shrink-0 flex items-center justify-center w-full bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-indigo-900 dark:to-blue-800 p-8',
                layout === 'horizontal' ? 'md:w-82' : ''
            ]" :style="backgroundStyle">
                <img :src="config.profileImage" :alt="config.profileName"
                    class="w-36 h-36 rounded-full object-cover shadow-xl border-4 border-white dark:border-neutral-800" />
            </div>

            <div :class="[
                'flex flex-grow min-w-5 p-8 text-gray-800 dark:text-white flex-col',
                layout === 'horizontal' ? 'w-full' : 'w-full'
            ]">

                <Head>
                    <Title>{{ config.siteTitle }}</Title>
                    <Meta name="description" :content="config.metaDescription" />
                    <Link rel="icon" type="image/png" :href="config.favicon" />
                </Head>

                <h1 class="text-4xl font-extrabold mb-2 leading-tight tracking-tight text-center">
                    {{ config.profileName }}
                </h1>

                <p v-if="config.profileDescription"
                    class="text-gray-600 dark:text-gray-300 mb-6 w-full leading-relaxed text-center">
                    {{ config.profileDescription }}
                </p>

                <div class="flex flex-wrap gap-3 mb-8 w-full justify-center
                    md:grid md:grid-cols-2 md:gap-4 md:justify-center
                    lg:grid-cols-3
                    xl:grid-cols-5" aria-label="Social and external links">
                    <a v-for="(link, i) in parsedLinks" :key="i" :href="link.url" class="flex items-center justify-center gap-2 border border-gray-300 shadow-sm hover:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-700 transition text-sm font-medium dark:text-neutral-200
                        w-12 h-12 rounded-full p-0 text-lg /* Mobile: perfect circle, icon-only, larger icon */
                        sm:w-auto sm:h-auto sm:px-4 sm:py-2 sm:rounded-full sm:text-sm /* Desktop: auto width/height, padding, pill-shaped, standard text/icon size */
                        overflow-hidden whitespace-nowrap text-ellipsis" target="_blank" rel="noopener noreferrer">
                        <img :src="link.icon" :alt="link.label" class="w-6 h-6 sm:w-5 sm:h-5 flex-shrink-0" />
                        <span class="hidden sm:inline">{{ link.label }}</span>
                    </a>
                </div>

                <button @click="generateVCard"
                    class="mx-auto flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-full shadow-md transition"
                    aria-label="Download contact as VCF">
                    Contact (.vcf)
                </button>

                <footer class="mt-auto pt-10 text-sm text-gray-500 dark:text-neutral-400 text-center sm:text-right">
                    {{ config.copyright }}
                </footer>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useVCard } from '~/composables/useVCard'
const { generateVCard } = useVCard()
const config = useRuntimeConfig().public
const parsedLinks = JSON.parse(String(config.links))
const layout = config.layout?.toLowerCase() === 'vertical' ? 'vertical' : 'horizontal'
const backgroundStyle = computed(() => {
  if (!config.imageCover) return null;
  if (config.layout === 'vertical') return {
    backgroundImage: `url('${config.imageCover}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
});
</script>