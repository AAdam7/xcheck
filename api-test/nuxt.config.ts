// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-jsonapi'],
  jsonApi: {
    baseURL: 'http://localhost:3000/api',
  },
})
