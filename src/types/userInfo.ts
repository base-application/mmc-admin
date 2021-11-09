import type { IPageParams } from "./common"
interface IUserInfoCompanyVosProducePictures {
  companyId: number
  produceId: number
  producePicture: string
}
export enum EUserInfoMember {
  member = "member",
  guest = "guest"
}

interface IUserInfoCompanyVos {
  companyAccomplishments: Nullable<string>
  companyAddress: Nullable<string>
  companyEmail: Nullable<string>
  companyFacebook: Nullable<string>
  companyGoals: Nullable<string>
  companyId: number
  companyInstagram: Nullable<string>
  companyInterests: Nullable<string>
  companyIntroduction: Nullable<string>
  companyLinkedin: Nullable<string>
  companyLogo: Nullable<string>
  companyName: Nullable<string>
  companyPhone: Nullable<string>
  companyWebsite: Nullable<string>
  companyYoutube: Nullable<string>
  producePictures: IUserInfoCompanyVosProducePictures[]
  serviceIntroduction: Nullable<string>
  userId: number
}
export interface IUserInfo {
  attendance: number
  birthday: Nullable<string>
  companyVos: IUserInfoCompanyVos[]
  concatNumber: Nullable<string>
  country: number
  enable: boolean
  facebook: Nullable<string>
  gradeId: number
  gradeName: null
  groupId: number
  groupName: Nullable<string>
  industry: Nullable<string>
  instagram: Nullable<string>
  introduction: Nullable<string>
  linkedin: Nullable<string>
  name: Nullable<string>
  occupation: Nullable<string>
  picture: Nullable<string>
  referralReceived: number
  referralSend: number
  state: number
  thankYouNote: number
  userId: number
  whatsapp: Nullable<string>
  youtube: Nullable<string>
  positionName: Nullable<string>
  positionId: number
  member: EUserInfoMember
}

export interface IUserInfoSearch extends IPageParams {
  name?: Nullable<string>
  concatNumber?: Nullable<string>
  groupId?: number
  positionId?: number
}

export type IUserInfoUpdate = {
  [K in keyof IUserInfo]?: Nullable<IUserInfo[K]>
}