import { IRole } from '@/types/role'
import request from '@/utils/request'


// 角色列表
export function netRoleList() {
  return request({
    url: 'role/list',
    method: 'GET'
  })
}
// 新增角色
export function netRoleAdd(data: IRole) {
  return request({
    url: 'role/add',
    method: 'PUT',
    data
  })
}
// 删除角色
export function netRoleDelete(data: {id: number}) {
  return request({
    url: 'role/delete',
    method: 'DELETE',
    params: data
  })
}
// 获取所有接口
export function netApiList() {
  return request({
    url: 'api/list',
    method: 'GET'
  })
}
// 获取角色的接口权限
export function netRoleApi(data: { roleId: number }) {
  return request({
    url: 'role/api',
    method: 'GET',
    params: data
  })
}
// 配置角色接口权限
export function netRoleApiConfig(data: { roleId: number, api: number[] }) {
  return request({
    url: 'role/api',
    method: 'PUT',
    data
  })
}
// 获取角色的菜单权限
export function netRoleMenu(data: { roleId: number }) {
  return request({
    url: 'role/menu',
    method: 'GET',
    params: data
  })
}
// 配置角色菜单权限
export function netRoleMenuConfig(data: { roleId: number, api: number[] }) {
  return request({
    url: 'role/menu',
    method: 'PUT',
    data
  })
}
// 获取角色的按钮权限
export function netRoleButton(data: { roleId: number }) {
  return request({
    url: 'role/button',
    method: 'GET',
    params: data
  })
}
// 配置角色菜单权限
export function netRoleButtonConfig(data: { roleId: number, api: number[] }) {
  return request({
    url: 'role/button',
    method: 'PUT',
    data
  })
}