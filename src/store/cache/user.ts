import { UserState } from "@/types/store"
import { USER_SESSION_KEY } from "@/utils/const"
type UserStateKey = keyof UserState

function useUserLocal(): UserState {
  const value = sessionStorage.getItem(USER_SESSION_KEY) || "{}"
  const parseValue = JSON.parse(value) as UserState
  return parseValue
}
export function userLocalGet<K extends UserStateKey>(key: K): UserState[K] {
  const data = useUserLocal()
  if (data[key] === undefined) {
    return null
  }
  return data[key]
}
export function userLocalSet<K extends UserStateKey>(key: K, value: UserState[K]) {
  const data = useUserLocal()
  data[key] = value
  sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(data))
}

export function userLocalClear(){
  sessionStorage.removeItem(USER_SESSION_KEY)
}
