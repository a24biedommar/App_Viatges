// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },

  vite: {
    server: {
      fs: {
        allow: ['..', '/home/a24biedommar/Documents/1-ChatBots/RA2']
      }
    }
  },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/tailwind.css'
  ],

  tailwindcss: {
    configPath: 'tailwind.config.js'
  },

  app: {
    head: {
      title: 'ViatgerPro',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
        { name: 'description', content: 'Aplicació de gestió de viatges' },
        { name: 'theme-color', content: '#E20613' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' }
      ],
      script: [
        { src: '/sw.js', defer: true }
      ]
    }
  },

  compatibilityDate: '2026-03-17'
})
