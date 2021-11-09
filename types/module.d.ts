import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    hidden?: boolean
    // 每个路由都必须声明
    title?: string
    icon?: string
  }
}