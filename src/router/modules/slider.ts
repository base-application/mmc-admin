import Layout from '@/layout/index.vue'

export default {
  path: '/slider',
  component: Layout,
  name: 'Slider',
  redirect: { name: "SliderList" },
  meta: { hidden: false, title: 'router.slider.main' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/slider/index.vue'),
      name: 'SliderList',
      meta: { hidden: false, title: 'router.slider.main' }
    }
  ]
}