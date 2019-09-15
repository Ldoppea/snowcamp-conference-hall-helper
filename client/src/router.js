import Vue from 'vue'
import Router from 'vue-router'
import Authors from '@/views/Authors'
import Languages from '@/views/Languages'
import Tags from '@/views/Tags'
import Travelers from '@/views/Travelers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Authors',
      component: Authors
    },
    {
      path: '/languages',
      name: 'Languages',
      component: Languages
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/travelers',
      name: 'Travelers',
      component: Travelers
    }
  ]
})
