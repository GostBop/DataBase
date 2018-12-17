import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import Index from '../components/index'
import Men from '../components/men'
import Women from '../components/women'
import Cart from '../components/cart'
import Good from '../components/good'
import Personal from '../components/personal'
import Stock from '../components/stock'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          component: Index
        },
        {
          path: '/men',
          component: Men
        },
        {
          path: '/women',
          component: Women
        },
        {
          path: '/cart',
          component: Cart
        },
        {
          path: '/good',
          component: Good
        },
        {
          path: '/personal',
          component: Personal
        },
        {
          path: '/stock',
          component: Stock
        }
      ]

    }
  ]
})
