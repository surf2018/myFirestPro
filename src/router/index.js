import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Index from '@/components/Index'
import edit_interface from '@/components/interface/edit_interface'

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
    {
      path:'/add/interface',
      name:'add interface',
      component: edit_interface,
      props:true,

    },
    {
      path:'/edit/interface',
      name:'edit interface',
      component: edit_interface,
      props:true,

    }
  ]
})
