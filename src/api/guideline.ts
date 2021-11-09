import { IInfo } from '@/types/common'
import { IGuideLine } from '@/types/guideline'
import request from '@/utils/request'


// 新增
export function netGuideLineAdd(data: IInfo<IGuideLine>) {
  return request({
    url: 'guide/line/add',
    method: 'POST',
    data
  })
}
// 列表
export function netGuideLineList() {
  return request({
    url: 'guide/line/list',
    method: 'GET'
  })
}
// 删除
export function netGuideLineDelete(data: { guideLineId: IGuideLine['guideLineId'] }) {
  return request({
    url: 'guide/line/delete',
    method: 'DELETE',
    params: data
  })
}