import Vue from 'vue'

import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_plugin_595d3ba1 from 'nuxt_plugin_plugin_595d3ba1' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_223db373 from 'nuxt_plugin_bootstrapvue_223db373' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_plugin_0d880bf3 from 'nuxt_plugin_plugin_0d880bf3' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_vuesweetalert2_7454b5db from 'nuxt_plugin_vuesweetalert2_7454b5db' // Source: .\\vue-sweetalert2.js (mode: 'client')
import nuxt_plugin_workbox_38ff8d60 from 'nuxt_plugin_workbox_38ff8d60' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_bc91bc40 from 'nuxt_plugin_metaplugin_bc91bc40' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_b3427158 from 'nuxt_plugin_iconplugin_b3427158' // Source: .\\pwa\\icon.plugin.js (mode: 'all')
import nuxt_plugin_axios_a43f4d78 from 'nuxt_plugin_axios_a43f4d78' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_moment_1cd660d4 from 'nuxt_plugin_moment_1cd660d4' // Source: .\\moment.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"TechBlog website","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":""}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","href":"\u002Fcss\u002Fbootstrap.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Ffont-awesome.min.css"},{"rel":"stylesheet","href":"\u002Fstyle.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fresponsive.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fcolors.css"},{"rel":"stylesheet","href":"\u002Fcss\u002Fversion\u002Ftech.css"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:300,400,500,700|Material+Icons"},{"rel":"shortcut icon","type":"image\u002Fx-icon","href":"\u002Fimages\u002Ffavicon.ico"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Poppins:300,400,500,600,700"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:100,300,400,500,700,900&display=swap"},{"rel":"stylesheet","type":"text\u002Fcss","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@mdi\u002Ffont@latest\u002Fcss\u002Fmaterialdesignicons.min.css"}],"style":[],"script":[]},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_595d3ba1 === 'function') {
    await nuxt_plugin_plugin_595d3ba1(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_223db373 === 'function') {
    await nuxt_plugin_bootstrapvue_223db373(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_0d880bf3 === 'function') {
    await nuxt_plugin_plugin_0d880bf3(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuesweetalert2_7454b5db === 'function') {
    await nuxt_plugin_vuesweetalert2_7454b5db(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_38ff8d60 === 'function') {
    await nuxt_plugin_workbox_38ff8d60(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_bc91bc40 === 'function') {
    await nuxt_plugin_metaplugin_bc91bc40(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_b3427158 === 'function') {
    await nuxt_plugin_iconplugin_b3427158(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_a43f4d78 === 'function') {
    await nuxt_plugin_axios_a43f4d78(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_1cd660d4 === 'function') {
    await nuxt_plugin_moment_1cd660d4(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    const { route } = router.resolve(app.context.route.fullPath)
    // Ignore 404s rather than blindly replacing URL
    if (!route.matched.length && process.client) {
      return resolve()
    }
    router.replace(route, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
