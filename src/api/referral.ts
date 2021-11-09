import request from '@/utils/request'
import { IReferralSearch, IReferralUpdate } from '@/types/referral'


// 推荐列表
export function netReferralList(data: IReferralSearch) {
  return request({
    url: 'referral/list',
    params: data,
    method: 'GET'
  })
}
// 修改备注
export function netReferralRemark(data: IReferralUpdate) {
  return request({
    url: 'referral/remark',
    params: data,
    method: 'PUT'
  })
}