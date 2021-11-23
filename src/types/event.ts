import { IPageParams } from "./common"
import { IGrade, IGrade2 } from "./grade"
import { IGroup } from "./group"
export enum EApproveStatus {
  noHandle = 1,
  agree,
  refuse
}

export interface IEventAttendanceSearch {
  id: IEvent["eventId"],
  groupId?: IGroup['groupId'],
  startTime?: number,
  endTime?: number
}


export interface IEventAttendance {
  agent: Nullable<string>
  agentRole: Nullable<string>
  checkInTime: Nullable<number>
  checkOutTime: Nullable<number>
  eventId: number
  attendance: boolean
  name: string
  picture: string
  remark: Nullable<string>
  userId: number
  absentReason: Nullable<string>
  concatNumber: string
  facebookComment: boolean
  gradeName: IGrade['positionName']
}

export interface IEvent {
  approveStatus: EApproveStatus
  attendance: IEventAttendance[]
  createId: Nullable<number>
  eventDescription: string
  eventEndTime: Nullable<number>
  eventId: Nullable<number>
  eventLocation: Nullable<string>
  eventMapLink: Nullable<string>
  eventPoster: { url: string }[]
  eventStartTime: Nullable<number>
  eventTitle: Nullable<string>
  eventType: Nullable<number | string>
  groups: IGroup[]
  grades: IGrade2[]
  attendanceProportion: number
}

export interface IEventAdd {
  eventTitle?: string
  groups?: IGroup[],
  grades?: IGrade2[]
  eventDescription?: string
  eventStartTime?: number
  eventEndTime?: number
  eventLocation?: string
  eventMapLink?: string
  eventPoster?: { url: string }[]
}

export interface IEventSearch extends IPageParams {
  eventTitle?: string
  groupId?: number
  startTime?: number
  endTime?: number
}