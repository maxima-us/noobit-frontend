import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dash from '../views/Dash.vue'
import Debug from '@/views/Debug.vue'
import Performance from '@/views/Performance.vue'
import Charts from '@/views/Charts.vue'
import Trade from '@/views/Trade.vue'
import Trade2 from '@/views/Trade2.vue'
import Markets from '@/views/Markets.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dash',
    name: 'Dash',
    component: Dash
  },
  { path: '/debug', name: 'Debug', component: Debug },
  { path: '/performance', name: 'Performance', component: Performance },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/trade', name: 'Trade', component: Trade },
  { path: '/trade2', name: 'Trade2', component: Trade2 },
  { path: '/markets', name: 'Markets', component: Markets }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
