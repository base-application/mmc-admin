import { IInfo, IPageParams } from "@/types/common"
import { ISlider } from "@/types/slider"
import request from "@/utils/request"

// 新增
export function netSliderAdd(data: IInfo<ISlider>){
  return request({
    url: 'slider/add',
    data,
    method: 'POST'
  })
}
// 删除
export function netSliderDelete(data: {id: ISlider['sliderId']}){
  return request({
    url: 'slider/delete',
    params: data,
    method: 'DELETE'
  })
}
// 列表
export function netSliderList(data: IPageParams){
  return request({
    url: 'slider/list',
    params: data,
    method: 'GET'
  })
}
