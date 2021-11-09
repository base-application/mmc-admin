import { IPageParams } from "./common"
import { IGroup } from "./group"
import { IMemberShip } from "./memberShip"

export interface INotificationType {
  id: number
  name: string
}
export interface INotificationTypeOption {
  label: INotificationType['name']
  value: INotificationType['id']
}

export interface INotification {
  createId: number
  grades: IMemberShip[]
  groups: IGroup[]
  notificationContent: string
  notificationId: number
  notificationTime: number
  notificationTitle: string
  notificationType: INotificationType['id']
  registrationLink: string
  registrationName: string
}

export interface INotificationSearch extends IPageParams {
  title?: string
  groupId?: IGroup["groupId"]
  startTime?: number
  endTime?: number
}

export type INotificationInfo = {
  [K in keyof INotification]?: INotification[K]
}