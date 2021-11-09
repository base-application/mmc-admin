export interface IMenu {
  component: string
  hidden: boolean
  id: number
  menuIcon: string
  meta: string
  name: string
  path: string
  pid: number
  priority: number
  redirect: string
  children: IMenu[]
}