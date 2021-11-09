import request from '@/utils/request'
import type { IUserInfoSearch ,IUserInfoUpdate } from "@/types/userInfo"
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