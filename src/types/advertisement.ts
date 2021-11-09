
export enum EAdvertisementType {
  click = 1,
  slider
}
export interface IAdvertisement {
  advertisementId: number
  advertisementLink: string
  advertisementPoster: string
  advertisementType: EAdvertisementType
  status: boolean
}