import { IAdvertisement } from '@/types/advertisement'
import { IInfo } from '@/types/common'
import request from '@/utils/request'

// 新增
export function netAdvertisementAdd(data: IInfo<IAdvertisement>) {
  return request({
    url: 'advertisement/add',
    method: 'POST',
    data
  })
}
// 删除
export function netAdvertisementDelate(data: {id: IAdvertisement['advertisementId']}) {
  return request({
    url: 'advertisement/delete',
    method: 'DELETE',
    params: data
  })
}
// 列表
export function netAdvertisementList() {
  return request({
    url: 'advertisement/list',
    method: 'GET'
  })
}