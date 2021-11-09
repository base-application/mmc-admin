import { IMenu } from '@/types/menu'
import request from '@/utils/request'

// 用户路由列表
export function netUserMenuList() {
  return request({
    url: 'user/generate/routes',
    method: 'GET'
  })
}
// 用户路由列表
export function netMenuList() {
  return request({
    url: 'menu/list',
    method: 'GET'
  })
}
// 新增
export function netMenuAdd(data: Partial<IMenu>) {
  return request({
    url: 'menu/add',
    method: 'POST',
    data
  })
}
// 删除
export function netMenuDelete(data: { id: IMenu['id'] }) {
  return request({
    url: 'menu/delete',
    method: 'DELETE',
    params: data
  })
}
