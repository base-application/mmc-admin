import { IEvent, IEventAdd, IEventAttendanceSearch, IEventSearch } from '@/types/event'
import request from '@/utils/request'

// event列表
export function netEventList(data: IEventSearch) {
  return request({
    url: 'event/list',
    method: 'GET',
    params: data
  })
}
// event删除
export function netEventDelete(data: {id: IEvent['eventId']} ) {
  return request({
    url: 'event/delete',
    method: 'DELETE',
    params: data
  })
}
// event新增、修改
export function netEventAdd(data: IEvent | IEventAdd) {
  return request({
    url: 'event/add',
    method: 'POST',
    data
  })
}
// event审核
export function netEventApprove(data: { eventId: IEvent['eventId'], approveStatus: IEvent['approveStatus'] }) {
  return request({
    url: 'event/approve',
    method: 'PUT',
    params: data
  })
}
// event查询活动签到人员
export function netEventAttendance(data: IEventAttendanceSearch) {
  return request({
    url: 'event/attendance',
    method: 'GET',
    params: data
  })
}
// 管理员修改签到状态
export function netEventAttendanceCheckinConfirm(data: { userId: number,eventId: number,isAttendance: boolean }) {
  return request({
    url: 'event/attendance/checkin/confirm',
    method: 'PUT',
    params: data
  })
}
// 标记用户是否留言
export function netEventFacebookComment(data: { userId: number,eventId: number,facebookComment : boolean }) {
  return request({
    url: 'event/facebook/comment',
    method: 'PUT',
    params: data
  })
}
