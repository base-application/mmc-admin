export interface IButton {
  buttonCode: string
  buttonId: number
  modeName: string
  name: string
}
export type IButtonSearch = Partial<Pick<IButton, "modeName" | "name">>