import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterDashboard from './RouterDashboard'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const RouterMain = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },

]

let allRoutes = []
allRoutes = allRoutes.concat(RouterMain, RouterDashboard)
const routes = allRoutes

const routers = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default routers
