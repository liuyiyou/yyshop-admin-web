// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/user/list',
    children: [
      // user
      {
        path: '/user',
        name: 'user',
        component: PageView,
        redirect: '/user/list',
        meta: { title: '系统管理', icon: 'setting', permission: ['table'] },
        children: [
          {
            path: '/user/list',
            name: 'userList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/user/UserList'),
            meta: { title: '用户列表', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/role/list',
            name: 'roleList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/user/UserList'),
            meta: { title: '角色列表', keepAlive: true, permission: ['table'] }
          }

        ]
      },
      //基础信息管理
      {
        path: '/base',
        name: 'base',
        redirect: '/base/baseList',
        component: PageView,
        meta: { title: '基础管理', keepAlive: true, icon: bxAnaalyse, permission: ['table'] },
        children: [
          {
            path: '/brand/BrandList',
            name: 'BrandList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/brand/BrandList'),
            meta: { title: '品牌管理', keepAlive: true, permission: ['table'] }
          },
          {
            path: '/category/CategoryList',
            name: 'CategoryList',
            component: () => import('@/views/category/CategoryList'),
            meta: { title: '类目管理', keepAlive: true }
          },
          {
            path: '/props/PropertyList',
            name: 'PropertyList',
            component: () => import('@/views/property/PropertyList'),
            meta: { title: '属性列表', permission: ['profile'] }
          },
          {
            path: '/country/BaseCountryList',
            name: 'BaseCountryList',
            component: () => import('@/views/country/BaseCountryList'),
            meta: { title: '国家管理', permission: ['table'] }
          },
          {
            path: '/tariff/TariffList',
            name: 'TariffList',
            component: () => import(/* webpackChunkName: "result" */ '@/views/tariff/TariffList'),
            meta: { title: '费率列表', keepAlive: false, hiddenHeaderContent: true, permission: ['result'] }
          }
        ]
      },

      // 商品管理
      {
        path: '/goods',
        name: 'goods',
        redirect: '/goods/GoodsList',
        component: PageView,
        meta: { title: '商品管理', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/goods/GoodsList',
            name: 'GoodsList',
            component: () => import('@/views/goods/GoodsList'),
            meta: { title: '商品列表', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: '/goods/AddGoods',
            name: 'AddGoods',
            component: () => import('@/views/goods/AddGoods'),
            meta: { title: '添加商品', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // 订单管理
      {
        path: '/order',
        name: 'order',
        redirect: '/order/OrderList',
        component: PageView,
        meta: { title: '订单管理', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/order/OrderList',
            name: 'OrderList',
            component: () => import('@/views/order/OrderList'),
            meta: { title: '订单列表', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
