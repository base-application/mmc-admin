import { IButton, IButtonSearch } from '@/types/button'
import request from '@/utils/request'

// 用户按钮列表
export function netButtonList(data: IButtonSearch) {
  return request({
    url: 'button/list',
    method: 'GET',
    params: data
  })
}
// 新增
export function netButtonAdd(data: Partial<IButton>) {
  return request({
    url: 'button/save',
    method: 'PUT',
    data
  })
}
// 删除
export function netButtonDelete(data: { id: IButton['buttonId'] }) {
  return request({
    url: 'button/delete',
    method: 'DELETE',
    params: data
  })
}
