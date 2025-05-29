<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50 text-gray-800 dark:bg-neutral-800 dark:text-white">

        <Head>
            <Title>{{ config.siteTitle }}</Title>
            <Meta name="description" :content="String(config.metaDescription)" />
            <Link rel="icon" type="image/png" :href="config.favicon" />
        </Head>

        <img :src="config.profileImage as string" :alt="config.profileName as string"
            class="w-32 h-32 rounded-full mb-4 shadow-lg object-cover" />
        <h1 class="text-3xl font-bold mb-4 dark:text-neutral-200">{{ config.profileName }}</h1>

        <p v-if="config.profileDescription" class="text-gray-600 mb-4 max-w-xl dark:text-neutral-200">
            {{ config.profileDescription }}
        </p>

        <div class="flex flex-wrap justify-center gap-4 mt-6">
            <a v-for="(link, i) in parsedLinks" :key="i" :href="link.url"
                class="flex items-center justify-center gap-2 px-4 py-2 border rounded-full shadow hover:bg-gray-100 transition dark:text-neutral-200 dark:hover:bg-neutral-700"
                target="_blank" rel="noopener noreferrer">
                <img :src="link.icon" :alt="link.label" class="w-6 h-6" />
                <!-- {{ link.label }} -->
            </a>
        </div>
        <button @click="generateVCard"
            class="flex items-center justify-center gap-2 px-4 py-2 mt-6 border rounded-full shadow hover:bg-gray-100 transition dark:text-neutral-200 dark:hover:bg-neutral-700">
            Contact (.vcf)
        </button>

        <footer class="text-sm text-gray-500 mt-8 dark:text-neutral-200">
            {{ config.copyright }}
        </footer>
    </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import VCard from 'vcard-creator'

const config = useRuntimeConfig().public
const parsedLinks = JSON.parse(String(config.links))

function generateVCard() {
    const card = new VCard();

    // Split PROFILE_NAME into first and last name
    const nameParts = config.profileName.trim().split(/\s+/);
    const firstName = nameParts.shift() || '';         // first word
    const lastName = nameParts.join(' ') || '';        // the rest

    // Add name only if at least one name part exists
    if (firstName || lastName) {
        card.addName(lastName, firstName);
    }

    // Conditionally add other fields only if provided
    if (config.companyName) card.addCompany(String(config.companyName));
    if (config.emailAddress) card.addEmail(String(config.emailAddress));
    if (config.phoneNumber) card.addPhoneNumber(String(config.phoneNumber));
    if (config.websiteUrl) card.addURL(String(config.websiteUrl));
    if (config.address) card.addAddress(String(config.address));
    if (config.profileImage) card.addLogo(String(config.profileImage));
    if (config.profileDescription) card.addNote(String(config.profileDescription));
    if (config.socialMedia) {
        const socialMedia = JSON.parse(String(config.links)).reduce((acc: Record<string, string>, link: any) => {
            if (link.socialMedia) {
                acc[link.socialMedia] = link.url;
            }
            return acc;
        }, {});
        for (const [key, value] of Object.entries(socialMedia)) {
            if (value) card.addSocial(key, String(value));
        }
    }

    const blob = new Blob([card.toString()], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'JeanYamazian.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
</script>