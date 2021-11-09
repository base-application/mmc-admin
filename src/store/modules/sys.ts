import { defineStore } from 'pinia'
import store from '@/store'
import router from '@/router'
import { SysState } from '@/types/store'
import { ELang } from '@/types/common'
import { sysLocalGet, sysLocalSet } from '../cache/sys'
export const useSysStore = defineStore({
  id: 'app-sys',
  state: (): SysState => ({
    loadingBar: '',
    sliderBarCollapsed: false,
    lang: sysLocalGet('lang') || ELang.zhCN
  }),
  getters: {
    getLoadingBar(): string {
      return this.loadingBar
    },
    getSliderBarCollapsed(): boolean {
      return this.sliderBarCollapsed
    },
    getLang(): ELang {
      return this.lang
    }
  },
  actions: {
    setLoadingBar(loading: string) {
      this.loadingBar = loading
    },
    setSliderBarCollapsed(collapsed: boolean) {
      this.sliderBarCollapsed = collapsed
    },
    setLang(lang: ELang) {
      sysLocalSet('lang', lang)
      this.lang = lang
      router.go(0)
    }
  }
})

// Need to be used outside the setup
export function useSysStoreWithOut() {
  return useSysStore(store)
}

