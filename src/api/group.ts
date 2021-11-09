import request from '@/utils/request'
import type { IGroup, IGroupInfo } from "@/types/group"

// 分组列表
export function netGroupList() {
  return request({
    url: 'group/list',
    method: 'GET'
  })
}
// 分组新增、修改
export function netGroupAdd(data: IGroupInfo) {
  return request({
    url: 'group/add',
    method: 'PUT',
    data
  })
}
// 分组删除
export function netGroupDelete(data: { groupId: IGroup['groupId'] }) {
  return request({
    url: 'group/delete',
    method: 'DELETE',
    params: data
  })
}
// 分组用户
export function netGroupListUser() {
  return request({
    url: 'group/list/user',
    method: 'GET'
  })
}
