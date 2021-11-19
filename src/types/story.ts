import { IPageParams } from "./common"


export interface IStory {
  description: string
  link: string
  poster: { url: string, id: number }[]
  pushTime: number
  storyId: number
  title: string
  cover: string
}

export type IStoryInfo = {
  [K in keyof Omit<IStory, 'poster'>]?: Omit<IStory, 'poster'>[K]
} & {
  poster?: { url: string, id?: number }[]
}

export interface IStorySearch extends IPageParams {
  title?: string
  startDate?: number
  endDate?: number
}