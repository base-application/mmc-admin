import Layout from '@/layout/index.vue'

export default {
  path: '/user',
  component: Layout,
  name: 'User',
  redirect: { name: "UserList" },
  meta: { hidden: false, title: 'router.user.main' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user/index.vue'),
      name: 'UserList',
      meta: { hidden: false, title: 'router.user.list' }
    },
    {
      path: 'group',
      component: () => import('@/views/user/group.vue'),
      name: 'UserGroup',
      meta: { hidden: false, title: 'router.user.group' }
    }
  ]
}