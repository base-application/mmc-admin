import request from '@/utils/request'
import { IPageParams } from '@/types/common'
import { ILoginParams, IUser } from '@/types/user'
// 登录
export function netLogin(data: ILoginParams) {
  return request({
    url: '/login',
    params: data
  })
}
// 用户列表
export function netUserList(data: IPageParams) {
  return request({
    url: 'user/list',
    params: data,
    method: 'GET'
  })
}
// 新增用户
export function netUserAdd(data: IUser) {
  return request({
    url: 'user/add',
    data
  })
}
// 获取用户角色
export function netUserRole(data: { userId: number }) {
  return request({
    url: 'user/role',
    params: data,
    method: "GET"
  })
}
// 更新用户角色
interface IUpdateUserRole {
  userId: number
  roles: number[]
}
export function netUserRoleUpdate(data: IUpdateUserRole) {
  return request({
    url: 'user/role',
    data,
    method: "PUT"
  })
}

// 账户禁用/启用
export function netUserEnable(data: {id:number, enable: boolean}) {
  return request({
    url: 'user/enable',
    method: "POST",
    data    
  })
}