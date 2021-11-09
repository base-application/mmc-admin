import Layout from '@/layout/index.vue'

export default {
  path: '/notification',
  component: Layout,
  name: 'Notification',
  redirect: { name: "NotificationList" },
  meta: { hidden: false, title: 'router.notification.main' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/notification/index.vue'),
      name: 'NotificationList',
      meta: { hidden: false, title: 'router.notification.main' }
    }
  ]
}