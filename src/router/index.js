/**
 * 路由器对象
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用vue-router
Vue.use(VueRouter)

export default new VueRouter({
  // 所有路由
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: () => import('../views/MSite/MSite'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: () => import('../views/Search/Search'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: () => import('../views/Order/Order'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: () => import('../views/Profile/Profile'),
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: () => import('../views/Login/Login')
    },
    {
      path: '/shop',
      component: () => import('../views/Shop/Shop'),
      children: [
        {
          path: '/shop/goods',
          component: () => import('../views/Shop/ShopGoods/ShopGoods')
        },
        {
          path: '/shop/rating',
          component: () => import('../views/Shop/ShopRating/ShopRating')
        },
        {
          path: '/shop/info',
          component: () => import('../views/Shop/ShopInfo/ShopInfo')
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
