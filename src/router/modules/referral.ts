import Layout from '@/layout/index.vue'

export default {
  path: '/referral',
  component: Layout,
  name: 'Referral',
  redirect: { name: "Referralist" },
  meta: { hidden: false, title: 'router.referral.main' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/referral/index.vue'),
      name: 'Referralist',
      meta: { hidden: false, title: 'router.referral.main' }
    }
  ]
}