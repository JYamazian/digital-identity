// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      profileName: process.env.NUXT_PUBLIC_PROFILE_NAME,
      profileImage: process.env.NUXT_PUBLIC_PROFILE_IMAGE,
      profileDescription: process.env.NUXT_PUBLIC_PROFILE_DESCRIPTION,
      links: process.env.NUXT_PUBLIC_LINKS,
      copyright: process.env.NUXT_PUBLIC_COPYRIGHT,
      siteTitle: process.env.NUXT_PUBLIC_SITE_TITLE,
      metaDescription: process.env.NUXT_PUBLIC_META_DESCRIPTION,
      favicon: process.env.NUXT_PUBLIC_FAVICON,
      themeColor: process.env.NUXT_PUBLIC_THEME_COLOR,
      websiteUrl: process.env.NUXT_PUBLIC_WEBSITE_URL,
      emailAddress: process.env.NUXT_PUBLIC_EMAIL_ADDRESS,
      phoneNumber: process.env.NUXT_PUBLIC_PHONE_NUMBER,
      companyName: process.env.NUXT_PUBLIC_COMPANY_NAME,
      jobTitle: process.env.NUXT_PUBLIC_JOB_TITLE,
      address: process.env.NUXT_PUBLIC_ADDRESS,
      template: process.env.NUXT_PUBLIC_TEMPLATE,
      imageCover: process.env.NUXT_PUBLIC_IMAGE_COVER,
      layout: process.env.NUXT_PUBLIC_LAYOUT,
      logLevel: process.env.LOG_LEVEL || 'info',
      logFormat: process.env.LOG_FORMAT || 'text', // either 'json' or 'text'
      buildFlavor: process.env.BUILD_FLAVOR || '',
      buildVersion: process.env.BUILD_VERSION || '',
      // theme: process.env.NUXT_PUBLIC_THEME_MODE // || 'auto', // default to 'auto' if not set
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
})
