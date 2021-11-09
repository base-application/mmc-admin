import request from '@/utils/request'

// grade列表
export function netMemberShipList() {
  return request({
    url: 'grade/list',
    method: 'GET'
  })
}