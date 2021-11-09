
import { createI18n } from 'vue-i18n'		//引入vue-i18n组件
import messages from './getMessage'
import { useSysStoreWithOut } from "@/store/modules/sys"
//注册i8n实例并引入语言文件
const localeData = {
  globalInjection: true,
  legacy: true, // composition API
  locale: useSysStoreWithOut().getLang,
  messages
}
const i18n = createI18n(localeData)
// setup i18n instance with glob
export function setupI18n(app) {
  app.use(i18n)
}
export function useI18nWithOut() {
  return i18n
}