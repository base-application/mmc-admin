import { IPageParams } from '@/types/common'
import request from '@/utils/request'


// 角色列表
export function netLogList(data: IPageParams) {
  return request({
    url: 'log/list',
    params: data,
    method: 'GET'
  })
}