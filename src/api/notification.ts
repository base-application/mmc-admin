import { INotification, INotificationInfo, INotificationSearch } from '@/types/notification'
import request from '@/utils/request'


// 列表
export function netNotificationList(data: INotificationSearch) {
  return request({
    url: 'notification/list',
    params: data,
    method: 'GET'
  })
}
// 类型列表
export function netNotificationTypeList() {
  return request({
    url: 'notification/type/list',
    method: 'GET'
  })
}

// 新增
export function netNotificationAdd(data: INotificationInfo) {
  return request({
    url: 'notification/add',
    method: 'POST',
    data
  })
}
// 删除
export function netNotificationDelete(data: { id: INotification['notificationId'] }) {
  return request({
    url: 'notification/delete',
    method: 'DELETE',
    params: data
  })
}