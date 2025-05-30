// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      profileName: process.env.NUXT_PROFILE_NAME,
      profileImage: process.env.NUXT_PROFILE_IMAGE,
      profileDescription: process.env.NUXT_PROFILE_DESCRIPTION,
      links: process.env.NUXT_LINKS,
      copyright: process.env.NUXT_COPYRIGHT,
      siteTitle: process.env.NUXT_SITE_TITLE,
      metaDescription: process.env.NUXT_META_DESCRIPTION,
      favicon: process.env.NUXT_FAVICON,
      themeColor: process.env.NUXT_THEME_COLOR,
      websiteUrl: process.env.NUXT_WEBSITE_URL,
      emailAddress: process.env.NUXT_EMAIL_ADDRESS,
      phoneNumber: process.env.NUXT_PHONE_NUMBER,
      companyName: process.env.NUXT_COMPANY_NAME,
      jobTitle: process.env.NUXT_JOB_TITLE,
      address: process.env.NUXT_ADDRESS,
      template: process.env.NUXT_TEMPLATE,
      imageCover: process.env.NUXT_IMAGE_COVER_BG,
      layout: process.env.NUXT_LAYOUT
      // theme: process.env.NUXT_THEME_MODE // || 'auto', // default to 'auto' if not set
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
})
