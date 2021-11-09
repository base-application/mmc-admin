import request from '@/utils/request'

// grade列表
export function netGradeList() {
  return request({
    url: 'user/info/position/list',
    method: 'GET'
  })
}