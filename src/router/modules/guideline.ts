import Layout from '@/layout/index.vue'
export default {
  path: '/guideline',
  component: Layout,
  name: 'Guideline',
  redirect: { name: "GuidelineList" },
  meta: { hidden: false, title: 'router.guideline.main' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/guideline/index.vue'),
      name: 'GuidelineList',
      meta: { hidden: false, title: 'router.guideline.main' }
    }
  ]
}