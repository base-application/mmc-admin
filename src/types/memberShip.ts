export interface IMemberShip{
  gradeId: number
  gradeName: string
}

export interface IMemberShipOption{
  label: IMemberShip['gradeName']
  value: IMemberShip['gradeId']
}