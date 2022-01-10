import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const envConfig = loadEnv(mode, process.cwd())
  const { VITE_BASE_ROUTE, VITE_BASE_API } = envConfig

  let base = VITE_BASE_ROUTE
  if (!base.startsWith('/')) {
    base = `/${base}`
  }
  if (!base.endsWith('/')) {
    base += '/'
  }
  return {
    base: '/',
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: {
        [VITE_BASE_API]: {
          target: VITE_BASE_API,
          changeOrigin: true
        }
      }
    },
    build: {
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: true
        }
      }
    },
    resolve: {
      alias: {
        // 如果报错__dirname找不到，需要安装node,执行yarn add @types/node --save-dev
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'types')
      }
    }
  }
}
