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
        meta: { title: '用户管理', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/user/list',
            name: 'userList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/user/UserList'),
            meta: { title: '用户列表', keepAlive: true, permission: [ 'table' ] }
          }

        ]
      },
      // 商品管理
      {
        path: '/goods',
        name: 'goods',
        redirect: '/goods/GoodsList',
        component: PageView,
        meta: { title: '商品管理', keepAlive: true, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: '/goods/GoodsList',
            name: 'GoodsList',
            component: () => import('@/views/goods/GoodsList'),
            meta: { title: '商品列表', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/goods/AddGoods',
            name: 'AddGoods',
            component: () => import('@/views/goods/AddGoods'),
            meta: { title: '添加商品', keepAlive: true, permission: [ 'dashboard' ] }
          }
        ]
      },

      // 类目管理
      {
        path: '/category',
        redirect: '/category/CategoryList',
        component: PageView,
        meta: { title: '类目管理', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/category/CategoryList',
            name: 'CategoryList',
            component: () => import('@/views/category/CategoryList'),
            meta: { title: '商品类目', keepAlive: true }
          }
        ]
      },

      // 品牌管理
      {
        path: '/brand',
        name: 'brand',
        component: PageView,
        redirect: '/brand/BrandList',
        meta: { title: '品牌管理', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/brand/BrandList',
            name: 'BrandList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/brand/BrandList'),
            meta: { title: '品牌列表', keepAlive: true, permission: [ 'table' ] }
          }
        ]
      },

      // 属性管理
      {
        path: '/props',
        name: 'props',
        component: PageView,
        redirect: '/props/PropertyList',
        meta: { title: '属性管理', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/props/PropertyList',
            name: 'PropertyList',
            component: () => import('@/views/property/PropertyList'),
            meta: { title: '属性列表', permission: [ 'profile' ] }
          }
        ]
      },

      // 费率管理
      {
        path: '/tariff',
        name: 'tariff',
        component: PageView,
        redirect: '/tariff/TariffList',
        meta: { title: '费率管理', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/tariff/TariffList',
            name: 'TariffList',
            component: () => import(/* webpackChunkName: "result" */ '@/views/tariff/TariffList'),
            meta: { title: '费率列表', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },

      // 供应商管理
      {
        path: '/supplier',
        name: 'supplier',
        component: PageView,
        redirect: '/supplier/SupplierList',
        meta: { title: '供应商管理', icon: 'warning', permission: [ 'table' ] },
        children: [
          {
            path: '/supplier/SupplierList',
            name: 'SupplierList',
            component: () => import('@/views/supplier/SupplierList'),
            meta: { title: '供应商列表', permission: [ 'table' ] }
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
