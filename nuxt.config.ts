// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: { viewTransition: true },
  modules: ['vuetify-nuxt-module', '@nuxtjs/tailwindcss'],
});
