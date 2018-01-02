import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SubPage from '@/components/SubPage'
import tel from '@/components/tel/Tel'

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
      path: '/subPage',
      name: 'SubPage',
      component: SubPage
    },
    {
      path: '/tel',
      name: 'tel',
      component: tel
    }
  ]
})
