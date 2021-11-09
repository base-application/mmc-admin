import { defineStore } from 'pinia'
import store from '@/store'
import { netLogin } from '@/api/user'
import { userLocalGet, userLocalSet, userLocalClear } from '../cache/user'
import { UserState } from '@/types/store'
import { ILoginParams } from '@/types/user'
import { netUserMenuList } from '@/api/menu'
import { IMenu } from '@/types/menu'
import router, { asyncRoutes } from "@/router"
import { RouteRecordRaw } from 'vue-router'


export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: userLocalGet('token'),
    role: userLocalGet('role'),
    id: userLocalGet('id'),
    routes: null
  }),
  getters: {
    getToken(): Nullable<string> {
      return this.token
    },
    getRole(): Nullable<string[]> {
      return this.role
    },
    getId(): Nullable<number> {
      return this.id
    },
    getRoutes(): Nullable<RouteRecordRaw[]> {
      return this.routes as Nullable<RouteRecordRaw[]>
    }
  },
  actions: {
    clear() {
      userLocalClear()
      this.token = null
      this.role = null
      this.id = null
    },
    async setToken(token: string) {
      this.token = token
      userLocalSet('token', token)
    },
    setRole(role: string[]) {
      this.role = role
      userLocalSet('role', role)
    },
    setId(id: number) {
      this.id = id
      userLocalSet('id', id)
    },
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = routes
    },
    getUserMenu() {
      return new Promise((resolve): void => {
        netUserMenuList()
          .then(res => {
            const userMenuList = res.data.menu
            const routes: RouteRecordRaw[] = []
            function handleMenu(userMenuList) {
              userMenuList.forEach(userMenu => {
                const route: RouteRecordRaw = asyncRoutes.find(v => v.path === userMenu.path) as RouteRecordRaw
                if (route && route.children && route.children.length > 0 && userMenu.children && userMenu.children.length > 0) {
                  route.children = (route.children as []).filter((rc: IMenu) => {
                    return userMenu.children.map(v => v.path).includes(rc.path)
                  }).map((m: RouteRecordRaw) => {
                    const userMenuOp = userMenu.children.find(uc => uc.path === m.path)
                    return {
                      ...m,
                      meta: JSON.parse(userMenuOp.meta)
                    }
                  })
                }
                route.meta = JSON.parse(userMenu.meta)
                route.redirect = userMenu.redirect
                router.addRoute(route)
                routes.push(route)
              })
            }
            handleMenu(userMenuList)
            this.setRoutes(routes)
            resolve()
          })
      })
    },
    async login(params: ILoginParams) {
      return new Promise((resolve): void => {
        netLogin(params).then(async res => {
          const { token } = res.data
          if (token) {
            this.setToken(token)
          }
          resolve()
        })
      })
    },
    async signOut() {
      return new Promise((resolve): void => {
        this.clear()
        resolve()
      })
    }
  }
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}

