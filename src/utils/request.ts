import axios from "axios"
// import qs from 'qs'
import { useSysStore } from "@/store/modules/sys"
import { useUserStore } from "@/store/modules/user"
import { LoadingBarEnum } from '@/utils/enum'
import router from "@/router"

function setLoadingBar(loading: string) {
  const sysStore = useSysStore()
  sysStore.setLoadingBar(loading)
}
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 100000,
  method: 'POST',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
  // transformRequest: (data) => {
  //   return qs.stringify(data,{ arrayFormat: 'repeat' })
  // }
})
// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const token = userStore.getToken
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    setLoadingBar(LoadingBarEnum.start)
    return config
  },
  error => {
    setLoadingBar(LoadingBarEnum.error)
    return Promise.reject(error)
  }
)
// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    console.log("interceptors.response----", response)
    setLoadingBar(LoadingBarEnum.finish)
    const { data } = response
    if (data) {
      const { code, message } = data
      if (code !== 200) {
        window.$message.error(message)
        return Promise.reject(message)
      }
    }
    return data
  },
  error => {
    console.log("interceptors.error----", error)
    setLoadingBar(LoadingBarEnum.error)
    const { message: errorMessage, response: errorResponse, code, config } = error
    console.log("config---", config)
    console.log("code---", code)
    console.log("errorResponse---", errorResponse)
    if (errorResponse) {
      const { status, data: { message: resMessage } } = errorResponse
      if (status === 401) {
        // token出问题了
        const userStore = useUserStore()
        userStore.clear()
        router.replace("/login")
      }
      window.$message.error(resMessage)
    }
    if (errorMessage === 'Network Error') {
      window.$message.error("请检查网络！")
    }
    if (errorMessage.match('timeout')) {
      window.$message.error("请求超时！")
    }
    return Promise.reject(error)
  }
)

export default instance