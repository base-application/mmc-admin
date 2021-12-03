export interface IPageParams {
  page?: number
  size?: number
}
export type IInfo<T> = {
  [K in keyof T]?: T[K]
}

export enum ELang {
  enUS = "enUS",
  zhCN = "zhCN",
}

export interface IObject{
  [propName: string]: unknown
  [propName: number]: unknown
}


export interface IGroup {
  groupId: number
  groupName: string
}

export interface IGrade {
  gradeId: number
  gradeName: string
}

export interface IPosition{
  positionId: number
  positionName: string
}