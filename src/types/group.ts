export interface IGroup {
  groupId: number
  groupName: string
}
export type IGroupInfo = {
  [K in keyof IGroup]?: IGroup[K]
}
export interface IGroupOption {
  value: IGroup["groupId"]
  label: IGroup["groupName"]
}