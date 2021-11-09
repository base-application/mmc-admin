import Layout from '@/layout/index.vue'
export default {
  path: '/event',
  component: Layout,
  name: 'Event',
  redirect: { name: "EventList" },
  meta: { hidden: false, title: 'router.event.main' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/event/index.vue'),
      name: 'EventList',
      meta: { hidden: false, title: 'router.event.main' }
    }
  ]
}