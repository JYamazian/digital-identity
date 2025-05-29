// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      profileName: process.env.PROFILE_NAME,
      profileImage: process.env.PROFILE_IMAGE,
      profileDescription: process.env.PROFILE_DESCRIPTION,
      links: process.env.LINKS,
      copyright: process.env.COPYRIGHT,
      siteTitle: process.env.SITE_TITLE,
      metaDescription: process.env.META_DESCRIPTION,
      favicon: process.env.FAVICON,
      themeColor: process.env.THEME_COLOR,
      websiteUrl: process.env.WEBSITE_URL,
      emailAddress: process.env.EMAIL_ADDRESS,
      phoneNumber: process.env.PHONE_NUMBER,
      companyName: process.env.COMPANY_NAME,
      address: process.env.ADDRESS,
      template: process.env.TEMPLATE

      // theme: process.env.THEME_MODE // || 'auto', // default to 'auto' if not set
    }
  },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
})
