<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 p-6">
        <div
            class="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
            <!-- Left (fixed width) -->
            <div
                class="flex-shrink-0 flex items-center justify-center w-full md:w-60 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-indigo-900 dark:to-blue-800 p-8">
                <img :src="config.profileImage as string" :alt="config.profileName as string"
                    class="w-36 h-36 rounded-full object-cover shadow-xl border-4 border-white dark:border-neutral-800" />
            </div>

            <!-- Right (flexible and scroll-safe) -->
            <div class="flex flex-col flex-grow min-w-0 p-8 text-left text-gray-800 dark:text-white">

                <Head>
                    <Title>{{ config.siteTitle }}</Title>
                    <Meta name="description" :content="String(config.metaDescription)" />
                    <Link rel="icon" type="image/png" :href="config.favicon" />
                </Head>

                <h1 class="text-4xl font-extrabold mb-2 leading-tight tracking-tight">
                    {{ config.profileName }}
                </h1>

                <p v-if="config.profileDescription"
                    class="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl leading-relaxed">
                    {{ config.profileDescription }}
                </p>

                <div class="flex flex-wrap gap-4 mb-8 w-full" aria-label="Social and external links">
                    <a v-for="(link, i) in parsedLinks" :key="i" :href="link.url" class="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 dark:border-neutral-700 dark:hover:bg-neutral-700 transition text-sm font-medium text-center dark:text-neutral-200
         w-auto sm:w-40" target="_blank" rel="noopener noreferrer">
                        <img :src="link.icon" :alt="link.label" class="w-5 h-5" />
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
// your existing script unchanged
import { useRuntimeConfig } from 'nuxt/app'
import VCard from 'vcard-creator'

const config = useRuntimeConfig().public
const parsedLinks = JSON.parse(String(config.links))

function generateVCard() {
    const card = new VCard();

    const nameParts = config.profileName.trim().split(/\s+/);
    const firstName = nameParts.shift() || '';
    const lastName = nameParts.join(' ') || '';

    if (firstName || lastName) card.addName(lastName, firstName);
    if (config.companyName) card.addCompany(String(config.companyName));
    if (config.emailAddress) card.addEmail(String(config.emailAddress));
    if (config.phoneNumber) card.addPhoneNumber(String(config.phoneNumber));
    if (config.websiteUrl) card.addURL(String(config.websiteUrl));
    if (config.address) card.addAddress(String(config.address));
    if (config.profileImage) card.addLogo(String(config.profileImage));
    if (config.profileDescription) card.addNote(String(config.profileDescription));
    if (config.socialMedia) {
        const socialMedia = JSON.parse(String(config.links)).reduce(
            (acc: Record<string, string>, link: any) => {
                if (link.socialMedia) {
                    acc[link.socialMedia] = link.url;
                }
                return acc;
            },
            {}
        );
        for (const [key, value] of Object.entries(socialMedia)) {
            if (value) card.addSocial(key, String(value));
        }
    }

    const blob = new Blob([card.toString()], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'JeanYamazian.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
</script>

<style scoped>
/* optional: smoother image border transition */
img {
    transition: border-color 0.3s ease;
}
</style>
  
