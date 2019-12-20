// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: PageView,
        meta: { title: '仪表盘', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      // user
      {
        path: '/user',
        name: 'user',
        component: PageView,
        redirect: '/user/list',
        meta: { title: '系统管理', keepAlive: true, icon: 'setting', permission: ['user'] },
        children: [
          {
            path: '/user/list',
            name: 'userList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/user/UserList'),
            meta: { title: '用户列表', keepAlive: true, permission: ['user'] }
          },
          {
            path: '/role/list',
            name: 'roleList',
            hideChildrenInMenu: true,
            component: () => import('@/views/system/role/SysRoleList'),
            meta: { title: '角色列表', keepAlive: true, permission: ['role'] }
          }
        ]
      },
      //基础信息管理
      {
        path: '/base',
        name: 'base',
        redirect: '/base/baseList',
        component: PageView,
        meta: { title: '基础管理', icon: 'bars', keepAlive: true, permission: ['base'] },
        children: [
          {
            path: '/brand/BrandList',
            name: 'BrandList',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/brand/BrandList'),
            meta: { title: '品牌管理', keepAlive: true, permission: ['base'] }
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
            meta: { title: '属性列表', permission: ['base'] }
          },
          {
            path: '/country/BaseCountryList',
            name: 'BaseCountryList',
            component: () => import('@/views/country/BaseCountryList'),
            meta: { title: '国家管理', permission: ['base'] }
          },
          {
            path: '/tariff/TariffList',
            name: 'TariffList',
            component: () => import(/* webpackChunkName: "result" */ '@/views/tariff/TariffList'),
            meta: { title: '费率列表', keepAlive: false, hiddenHeaderContent: true, permission: ['base'] }
          }
        ]
      },

      // 商品管理
      {
        path: '/prod',
        name: 'prod',
        redirect: '/prod/ProdList',
        component: PageView,
        meta: { title: '商品管理', icon: 'hdd', keepAlive: true, permission: ['prod'] },
        children: [
          {
            path: '/prod/ProdList',
            name: 'ProdList',
            component: () => import('@/views/prod/ProdList'),
            meta: { title: '商品列表', keepAlive: true, permission: ['prod'] }
          }
        ]
      },
      // 订单管理
      {
        path: '/order',
        name: 'order',
        redirect: '/order/OrderList',
        component: PageView,
        meta: { title: '订单管理', icon: 'dollar', keepAlive: true, permission: ['order'] },
        children: [
          {
            path: '/order/OrderList',
            name: 'OrderList',
            component: () => import('@/views/order/OrderList'),
            meta: { title: '订单列表', keepAlive: true, permission: ['order'] }
          },
          {
            path: '/order/OrderInfo',
            name: 'OrderInfo',
            hidden: true,
            component: () => import('@/views/order/OrderInfo'),
            meta: { title: '订单详情', hidden: true, keepAlive: true, }
          }
        ]
      },
      // 会员管理
      {
        path: '/member',
        name: 'member',
        redirect: '/member/MemberList',
        component: PageView,
        meta: { title: '会员管理', icon: 'user', keepAlive: true, permission: ['member'] },
        children: [
          {
            path: '/member/MemberList',
            name: 'MemberList',
            component: () => import('@/views/member/MemberList'),
            meta: { title: '会员列表', keepAlive: true, permission: ['member'] }
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
