import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Index',
      redirect:'/index/1',
    },
    {
      path: '/index/:tab',
      name: 'Index',
      component: Index,
      props:true,
    },
  ]
})
