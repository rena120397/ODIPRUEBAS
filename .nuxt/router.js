import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _11bf5943 = () => interopDefault(import('..\\pages\\error.vue' /* webpackChunkName: "pages/error" */))
const _779aa795 = () => interopDefault(import('..\\pages\\generar-token.vue' /* webpackChunkName: "pages/generar-token" */))
const _6d1bfacf = () => interopDefault(import('..\\pages\\loading-update.vue' /* webpackChunkName: "pages/loading-update" */))
const _ace82242 = () => interopDefault(import('..\\pages\\logout.vue' /* webpackChunkName: "pages/logout" */))
const _799a3981 = () => interopDefault(import('..\\pages\\mantenimiento.vue' /* webpackChunkName: "pages/mantenimiento" */))
const _18bc9d02 = () => interopDefault(import('..\\pages\\mensaje-ibk.vue' /* webpackChunkName: "pages/mensaje-ibk" */))
const _fb3511fc = () => interopDefault(import('..\\pages\\perfil-usuario.vue' /* webpackChunkName: "pages/perfil-usuario" */))
const _6e081b24 = () => interopDefault(import('..\\pages\\perfil-usuario-update.vue' /* webpackChunkName: "pages/perfil-usuario-update" */))
const _3bc3efe7 = () => interopDefault(import('..\\pages\\perfilador.vue' /* webpackChunkName: "pages/perfilador" */))
const _d53148ee = () => interopDefault(import('..\\pages\\validar-identidad.vue' /* webpackChunkName: "pages/validar-identidad" */))
const _640d89e6 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/error",
    component: _11bf5943,
    name: "error"
  }, {
    path: "/generar-token",
    component: _779aa795,
    name: "generar-token"
  }, {
    path: "/loading-update",
    component: _6d1bfacf,
    name: "loading-update"
  }, {
    path: "/logout",
    component: _ace82242,
    name: "logout"
  }, {
    path: "/mantenimiento",
    component: _799a3981,
    name: "mantenimiento"
  }, {
    path: "/mensaje-ibk",
    component: _18bc9d02,
    name: "mensaje-ibk"
  }, {
    path: "/perfil-usuario",
    component: _fb3511fc,
    name: "perfil-usuario"
  }, {
    path: "/perfil-usuario-update",
    component: _6e081b24,
    name: "perfil-usuario-update"
  }, {
    path: "/perfilador",
    component: _3bc3efe7,
    name: "perfilador"
  }, {
    path: "/validar-identidad",
    component: _d53148ee,
    name: "validar-identidad"
  }, {
    path: "/",
    component: _640d89e6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
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
