

export default {
  loading: true,
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  router: {
      base: '/cinema-app/'
  },
  head: {
    title: 'cinema-front',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {  
        as: 'style',  
        rel: 'stylesheet preload prefetch',   
      },  
    ],  
  },
  loading: {
    color: 'red',
    height: '4px'
  },
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'reset-css/reset.css',
  ],  
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins:[
    {src:'~/plugins/route'},
    {src: '~/plugins/directives.js'},
    {src: '~/plugins/vue-slider.js'},
  ] ,


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Inter: [300,500,700],
      Rufina: [400, 700],
    }
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    'nuxt-route-meta',
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    ['@nuxtjs/firebase',
      {
        config: {
        apiKey: "AIzaSyCmsne_-eGUX_Lh80u06uPvDtPCkp78dz0",
        authDomain: "cinema-base.firebaseapp.com",
        projectId: "cinema-base",
        storageBucket: "cinema-base.appspot.com",
        messagingSenderId: "387877820092",
        appId: "1:387877820092:web:16f73a5403191218e9a2b9",
        measurementId: "G-JC40VXZ9FV"
        },
        services: {
          auth: true
        }
      } 
    ]
  ],
  buildModules: [
    '@nuxtjs/composition-api/module'
  ],
  styleResources: {  
    scss: ['./assets/styles/variables.scss'],  
  },
  
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  
}
