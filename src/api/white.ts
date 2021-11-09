import request from '@/utils/request'

// 白名单列表
export function netWhiteList() {
  return request({
    url: 'white/list',
    method: 'GET'
  })
}
// 白名单添加、修改
export function netWhiteAdd(data) {
  return request({
    url: 'white/list/add',
    method: 'PUT',
    data
  })
}
