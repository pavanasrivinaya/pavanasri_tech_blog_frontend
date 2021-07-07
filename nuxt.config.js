const URL = 'https://pavanatechblog.herokuapp.com'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/bootstrap.css' },
      { rel: 'stylesheet', href: '/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: '/style.css' },
      { rel: 'stylesheet', href: '/css/responsive.css' },
      { rel: 'stylesheet', href: '/css/colors.css' },
      { rel: 'stylesheet', href: '/css/version/tech.css' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },

      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/images/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    baseURL: URL,
  },
  proxy: {
    '/api': URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
