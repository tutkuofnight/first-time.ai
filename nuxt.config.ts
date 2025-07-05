// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  runtimeConfig: {
    apiSecretKey: process.env.OPENROUTER_API_KEY,
    modelName: process.env.MODEL_NAME,
    apiUrl: process.env.API_URL,
    visitRules: process.env.VISIT_RULES
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})