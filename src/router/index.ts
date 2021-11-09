import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RouterGuards from './guards'
import Layout from '@/layout/index.vue'
import SysRouter from './modules/system'
import AddressRouter from './modules/address'
import NotificationRouter from './modules/notification'
import UserRouter from './modules/user'
import ReferralRouter from './modules/referral'
import EventRouter from './modules/event'
import StoryRouter from './modules/story'
import SliderRouter from './modules/slider'
import GuidelineRouter from './modules/guideline'
import AdvertisementRouter from './modules/advertisement'
export const constRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    name: 'Home',
    redirect: { name: "Enter" },
    meta: { hidden: false, title: 'router.home.main', icon: "Home" },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'Enter',
        meta: { hidden: false, title: 'router.home.main', icon: "Home" }
      }
    ]
  }
  // SysRouter,
  // AddressRouter,
  // NotificationRouter,
  // UserRouter,
  // ReferralRouter,
  // EventRouter,
  // StoryRouter,
  // SliderRouter,
  // GuidelineRouter,
  // AdvertisementRouter
]
export const asyncRoutes = [
  SysRouter,
  AddressRouter,
  NotificationRouter,
  UserRouter,
  ReferralRouter,
  EventRouter,
  StoryRouter,
  SliderRouter,
  GuidelineRouter,
  AdvertisementRouter
]
const { VITE_BASE_ROUTE } = import.meta.env
const router = createRouter({
  history: createWebHistory(VITE_BASE_ROUTE),
  routes: constRoutes
})
RouterGuards(router)

export default router
