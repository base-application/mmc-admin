import Layout from '@/layout/index.vue'
export default {
  path: '/advertisement',
  component: Layout,
  name: 'Advertisement',
  meta: { hidden: false, title: 'router.advertisement.main' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/advertisement/index.vue'),
      name: 'AdvertisementList',
      meta: { hidden: false, title: 'router.advertisement.main' }
    }
  ]
}