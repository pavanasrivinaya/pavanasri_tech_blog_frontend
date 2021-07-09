import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _113defb0 = () =>
  interopDefault(
    import(
      '..\\pages\\categories\\index.vue' /* webpackChunkName: "pages/categories/index" */
    )
  )
const _5da7f41f = () =>
  interopDefault(
    import(
      '..\\pages\\categorypage\\index.vue' /* webpackChunkName: "pages/categorypage/index" */
    )
  )
const _f21020fe = () =>
  interopDefault(
    import(
      '..\\pages\\Client\\index.vue' /* webpackChunkName: "pages/Client/index" */
    )
  )
const _69d428d6 = () =>
  interopDefault(
    import(
      '..\\pages\\posts\\index.vue' /* webpackChunkName: "pages/posts/index" */
    )
  )
const _24edb042 = () =>
  interopDefault(
    import(
      '..\\pages\\Admin\\404.vue' /* webpackChunkName: "pages/Admin/404" */
    )
  )
const _393435d6 = () =>
  interopDefault(
    import(
      '..\\pages\\Admin\\adminhome.vue' /* webpackChunkName: "pages/Admin/adminhome" */
    )
  )
const _2b6523c5 = () =>
  interopDefault(
    import(
      '..\\pages\\Admin\\categories.vue' /* webpackChunkName: "pages/Admin/categories" */
    )
  )
const _674014bc = () =>
  interopDefault(
    import(
      '..\\pages\\Client\\about.vue' /* webpackChunkName: "pages/Client/about" */
    )
  )
const _ab7289a0 = () =>
  interopDefault(
    import(
      '..\\pages\\Adminposts\\_id.vue' /* webpackChunkName: "pages/Adminposts/_id" */
    )
  )
const _6c37c3d0 = () =>
  interopDefault(
    import(
      '..\\pages\\categories\\_id.vue' /* webpackChunkName: "pages/categories/_id" */
    )
  )
const _08927247 = () =>
  interopDefault(
    import(
      '..\\pages\\categorypage\\_id.vue' /* webpackChunkName: "pages/categorypage/_id" */
    )
  )
const _39e443ae = () =>
  interopDefault(
    import(
      '..\\pages\\Client\\_id.vue' /* webpackChunkName: "pages/Client/_id" */
    )
  )
const _44e3cf3d = () =>
  interopDefault(
    import(
      '..\\pages\\posts\\_id.vue' /* webpackChunkName: "pages/posts/_id" */
    )
  )

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [
    {
      path: '/categories',
      component: _113defb0,
      name: 'categories',
    },
    {
      path: '/categorypage',
      component: _5da7f41f,
      name: 'categorypage',
    },
    {
      path: '/',
      component: _f21020fe,
      name: 'Client',
    },
    {
      path: '/posts',
      component: _69d428d6,
      name: 'posts',
    },
    {
      path: '/Admin/404',
      component: _24edb042,
      name: 'Admin-404',
    },
    {
      path: '/Admin/adminhome',
      component: _393435d6,
      name: 'Admin-adminhome',
    },
    {
      path: '/Admin/categories',
      component: _2b6523c5,
      name: 'Admin-categories',
    },
    {
      path: '/about',
      component: _674014bc,
      name: 'Client-about',
    },
    {
      path: '/Adminposts/:id?',
      component: _ab7289a0,
      name: 'Adminposts-id',
    },
    {
      path: '/categories/:id',
      component: _6c37c3d0,
      name: 'categories-id',
    },
    {
      path: '/categorypage/:id',
      component: _08927247,
      name: 'categorypage-id',
    },
    {
      path: '/Client/:id',
      component: _39e443ae,
      name: 'Client-id',
    },
    {
      path: '/posts/:id',
      component: _44e3cf3d,
      name: 'posts-id',
    },
  ],

  fallback: false,
}

export function createRouter(ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push(location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
