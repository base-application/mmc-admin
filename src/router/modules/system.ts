export default {
  path: '/system',
  component: () => import('@/layout/index.vue'),
  name: 'System',
  redirect: '/system/user',
  meta: { hidden: false, title: 'router.system.main' },
  children: [
    {
      path: 'user',
      component: () => import('@/views/system/user/index.vue'),
      name: 'UserIndex',
      meta: { hidden: false, title: 'router.system.user' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role/index.vue'),
      name: 'RoleIndex',
      meta: { hidden: false, title: 'router.system.role' }
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu/index.vue'),
      name: 'MenuIndex',
      meta: { hidden: false, title: 'router.system.menu' }
    },
    {
      path: 'button',
      component: () => import('@/views/system/button/index.vue'),
      name: 'ButtonIndex',
      meta: { hidden: false, title: 'router.system.button' }
    },
    {
      path: 'white',
      component: () => import('@/views/system/white/index.vue'),
      name: 'WhiteIndex',
      meta: { hidden: false, title: 'router.system.white' }
    },
    {
      path: 'log',
      component: () => import('@/views/system/log/index.vue'),
      name: 'LogIndex',
      meta: { hidden: false, title: 'router.system.log' }
    }
  ]
}