export interface IGrade{
  positionId: number
  positionName: string
}
export interface IGradeOption{
  label: IGrade['positionName']
  value: IGrade['positionId']
}