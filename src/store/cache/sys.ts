
import { SysState } from "@/types/store"
import { SYS_SESSION_KEY } from "@/utils/const"

type SysStateKey = keyof SysState

function useSysLocal(): SysState {
  const value = sessionStorage.getItem(SYS_SESSION_KEY) || "{}"
  const parseValue = JSON.parse(value) as SysState
  return parseValue
}
export function sysLocalGet<K extends SysStateKey>(key: K): SysState[K] {
  const data = useSysLocal()
  return data[key]
}
export function sysLocalSet<K extends SysStateKey>(key: K, value: SysState[K]) {
  const data = useSysLocal()
  data[key] = value
  sessionStorage.setItem(SYS_SESSION_KEY, JSON.stringify(data))
}

export function sysLocalClear(){
  sessionStorage.removeItem(SYS_SESSION_KEY)
}
