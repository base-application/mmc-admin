import { IStory, IStoryInfo, IStorySearch } from "@/types/story"
import request from "@/utils/request"

// 新增
export function netStoryAdd(data: IStoryInfo){
  return request({
    url: 'newest/story/add',
    data,
    method: 'POST'
  })
}
// 删除
export function netStoryDelete(data: {id: IStory['storyId']}){
  return request({
    url: 'newest/story/delete',
    params: data,
    method: 'DELETE'
  })
}
// 列表
export function netStoryList(data: IStorySearch){
  return request({
    url: 'newest/story/list',
    params: data,
    method: 'GET'
  })
}