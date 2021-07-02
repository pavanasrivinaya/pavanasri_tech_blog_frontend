import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  Logo: () => import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c)),
  AdminNavBar: () => import('../..\\components\\Admin\\NavBar.vue' /* webpackChunkName: "components/admin-nav-bar" */).then(c => wrapFunctional(c.default || c)),
  ClientNavBar: () => import('../..\\components\\Client\\NavBar.vue' /* webpackChunkName: "components/client-nav-bar" */).then(c => wrapFunctional(c.default || c)),
  ClientSearch: () => import('../..\\components\\Client\\search.vue' /* webpackChunkName: "components/client-search" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
