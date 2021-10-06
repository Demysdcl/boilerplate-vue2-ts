import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const createRoute = (componentName: string) => {
  const name = componentName.split('/')[0].replace('View', '')

  return {
    path: '/' + name,
    name,
    component: () =>
      import(
        /* webpackChunkName: "[request]" */ `../views/${componentName}.vue`
      ),
  }
}

const viewsToRoutes = () => {
  return require
    .context('../views/', true, /View.vue$/, 'lazy')
    .keys()
    .map((item) => item.replace(/\.\/|.vue/g, ''))
    .filter((item) => item !== 'Home.vue')
    .map(createRoute)
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  ...viewsToRoutes(),
]

const router = new VueRouter({
  routes,
})

export default router
