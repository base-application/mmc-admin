import request, { exportInstance } from '@/utils/request'
import type { IUserInfoSearch, IUserInfoUpdate } from "@/types/userInfo"
// 用户列表
export function netUserInfoList(data: IUserInfoSearch) {
  return request({
    url: 'user/info/list',
    method: 'GET',
    params: data
  })
}
// 用户修改
export function netUserInfoUpdate(data: IUserInfoUpdate) {
  return request({
    url: 'user/info/update',
    method: 'PUT',
    data
  })
}
// 首页统计
export function netUserInfoStatistics() {
  return request({
    url: 'user/info/statistics',
    method: "GET"
  })
}
// 用户导出
export function netUserInfoExport(params: IUserInfoSearch) {
  return exportInstance({
    url: 'user/info/export',
    method: "GET",
    params
  })
}