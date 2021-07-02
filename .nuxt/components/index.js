import { wrapFunctional } from './utils'

export { default as Logo } from '../..\\components\\Logo.vue'
export { default as AdminNavBar } from '../..\\components\\Admin\\NavBar.vue'
export { default as ClientNavBar } from '../..\\components\\Client\\NavBar.vue'
export { default as ClientSearch } from '../..\\components\\Client\\search.vue'

export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyAdminNavBar = import('../..\\components\\Admin\\NavBar.vue' /* webpackChunkName: "components/admin-nav-bar" */).then(c => wrapFunctional(c.default || c))
export const LazyClientNavBar = import('../..\\components\\Client\\NavBar.vue' /* webpackChunkName: "components/client-nav-bar" */).then(c => wrapFunctional(c.default || c))
export const LazyClientSearch = import('../..\\components\\Client\\search.vue' /* webpackChunkName: "components/client-search" */).then(c => wrapFunctional(c.default || c))
