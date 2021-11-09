import { IThankSearch } from '@/types/thank'
import request from '@/utils/request'


// 感谢列表
export function netThankList(data: IThankSearch) {
  return request({
    url: 'thank/you/note/list',
    params: data,
    method: 'GET'
  })
}