export interface ILoginParams{
  username: string;
  password: string;
}

export interface IUser{
  id?: number
  loginName?: string
  password?: string
  enable?: boolean
  locked?: boolean
}