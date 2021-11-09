import Layout from '@/layout/index.vue'
export default {
  path: '/address',
  component: Layout,
  name: 'Address',
  meta: { hidden: false, title: 'router.address.main' },
  children: [
    {
      path: 'country',
      component: () => import('@/views/address/country.vue'),
      name: 'Country',
      meta: { hidden: false, title: 'router.address.country' }
    },
    {
      path: 'state',
      component: () => import('@/views/address/state.vue'),
      name: 'State',
      meta: { hidden: false, title: 'router.address.state' }
    },
    {
      path: 'city',
      component: () => import('@/views/address/city.vue'),
      name: 'City',
      meta: { hidden: false, title: 'router.address.city' }
    },
    {
      path: 'district',
      component: () => import('@/views/address/district.vue'),
      name: 'District',
      meta: { hidden: false, title: 'router.address.district' }
    }
  ]
}