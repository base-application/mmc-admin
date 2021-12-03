import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
const baseUrl = import.meta.env.VITE_BASE_API
export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
export function dialogDelete(dialog: DialogApiInjection, confirm: () => void, cancel?: () => void) {
  dialog.warning({
    title: '警告',
    content: '你确定要删除当前数据吗？此操作不可逆！',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      confirm && confirm()
    },
    onNegativeClick: () => {
      if (cancel) {
        cancel()
      } else {
        window.$message.info('取消操作')
      }
    }
  })
}

export function DateRange(start: { Y: number, M: number, D: number }, end: { Y: number, M: number, D: number }): [number, number] {
  const s = new Date(start.Y, start.M, start.D).getTime()
  const e = new Date(end.Y, end.M, end.D, 23, 59, 59).getTime()
  return [s, e]
}

export function DateRangeShortcuts() {
  const nowDate = new Date()
  const nY = nowDate.getFullYear()
  const nM = nowDate.getMonth()
  const nD = nowDate.getDate()
  const nW = nowDate.getDay() === 0 ? 7 : nowDate.getDay()
  return {
    today: DateRange({ Y: nY, M: nM, D: nD }, { Y: nY, M: nM, D: nD }),
    yesterday: DateRange({ Y: nY, M: nM, D: nD - 1 }, { Y: nY, M: nM, D: nD - 1 }),
    Last7days: DateRange({ Y: nY, M: nM, D: nD - 7 }, { Y: nY, M: nM, D: nD }),
    Last14days: DateRange({ Y: nY, M: nM, D: nD - 14 }, { Y: nY, M: nM, D: nD }),
    Last30days: DateRange({ Y: nY, M: nM, D: nD - 30 }, { Y: nY, M: nM, D: nD }),
    Thisweek: DateRange({ Y: nY, M: nM, D: nD - nW + 1 }, { Y: nY, M: nM, D: nD }),
    Lastweek: DateRange({ Y: nY, M: nM, D: nD - nW - 6 }, { Y: nY, M: nM, D: nD - nW }),
    Thismonth: DateRange({ Y: nY, M: nM, D: 1 }, { Y: nY, M: nM, D: nD }),
    Lastmonth: DateRange({ Y: nY, M: nM - 1, D: 1 }, { Y: nY, M: nM, D: 0 })
  }
}

export function ImageAddBaseUrl(url: string): string {
  return `${baseUrl}/${url}`
}
export function ImageRemoveBaseUrl(url: string): string {
  const baseReg = new RegExp(`^${baseUrl}`)
  return url.replace(baseReg, '')
}

// export function listToSelect<T, K1 extends keyof T, K2 extends keyof T>(list: Array<T>, option: { labelKey: K1, valueKey: K2 }): { value: T[K2], label: T[K1] }[] {
//   return list.map(v => {
//     return {
//       value: v[option.valueKey],
//       label: v[option.labelKey]
//     }
//   })
// }
export interface ISelectOption{
  label: string
  value: string | number
}
export function listToSelect<T>(list: Array<T>, option: { labelKey: keyof T, valueKey: keyof T }): ISelectOption[] {
  return list.map(v => {
    return {
      value: v[option.valueKey] as unknown as ISelectOption['value'],
      label: v[option.labelKey] as unknown as ISelectOption['label']
    }
  })
}