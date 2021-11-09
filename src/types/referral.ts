import { IPageParams } from "./common"

export interface IReferral {
  failMessage: Nullable<string>
  fromGroupId: number
  fromName: string
  fromPicture: string
  picture: { id: number, url: string }[]
  reason: Nullable<string>
  receivedTime: number
  receivedUser: number
  referralId: number
  remark: Nullable<string>
  sendTime: number
  sendUser: number
  status: number
  toGroupId: number
  toName: string
  toPicture: string
}
export interface IReferralSearch extends IPageParams {
  name?: string
  startTime?: number
  endTime?: number
  groupId?: number
}
export type IReferralUpdate = {
  [K in keyof IReferral]?: Nullable<IReferral[K]>
}