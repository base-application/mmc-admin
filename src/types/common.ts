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