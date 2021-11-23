export interface IGrade{
  positionId: number
  positionName: string
}
export interface IGradeOption{
  label: IGrade['positionName']
  value: IGrade['positionId']
}

export interface IGrade2 {
  gradeId: number
  gradeName: string
}
export interface IGrade2Option{
  value: IGrade2['gradeId'],
  label: IGrade2['gradeName']
}