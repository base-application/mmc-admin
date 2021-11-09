import Layout from '@/layout/index.vue'

export default {
  path: '/story',
  component: Layout,
  name: 'Story',
  redirect: { name: "StoryList" },
  meta: { hidden: false, title: 'router.story.main' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/story/index.vue'),
      name: 'StoryList',
      meta: { hidden: false, title: 'router.story.main' }
    }
  ]
}