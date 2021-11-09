import { IGroup } from "./group"
import { IMemberShip } from "./memberShip"

export interface ISlider {
  grades: IMemberShip[]
  group: IGroup[]
  sliderId: number
  sliderPoster: string
  createTime: number
}