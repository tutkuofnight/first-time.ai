// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    apiSecretKey: process.env.OPENROUTER_API_KEY,
    modelName: process.env.MODEL_NAME,
    apiUrl: process.env.API_URL,
    visitRules: process.env.VISIT_RULES,
    useRules: process.env.USE_RULES,
    guideRules: process.env.GUIDE_RULES,
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    'nuxt-lucide-icons',
    'motion-v/nuxt'
  ],
  lucide: {
    namePrefix: 'Icon'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})