import { IPageParams } from "./common"

export interface IThank {
  fromGroup: string
  fromGroupId: number
  fromName: string
  fromPicture: string
  fromUserId: Nullable<number>
  note: string
  picture: { id: number, url: string }[]
  receivedTime: number
  receivedUser: number
  sendTime: number
  sendUser: number
  thankYouNoteId: number
  toGroup: string
  toGroupId: number
  toName: string
  toPicture: string
  toUserId: Nullable<number>
  value: number
}
export interface IThankSearch extends IPageParams{
  name?: string
  startTime?: number
  endTime?: number
  groupId?: number
}