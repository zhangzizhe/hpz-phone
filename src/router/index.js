import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Tel from '@/components/tel/Tel'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/tel',
      name: 'Tel',
      component: Tel
    }
  ]
})
