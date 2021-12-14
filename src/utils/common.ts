import { h } from 'vue'
import { NIcon } from 'naive-ui'
import { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import { useSysStoreWithOut } from "@/store/modules/sys"
import { ELang } from '@/types/common'
const baseUrl = import.meta.env.VITE_BASE_API
export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const langData = {
  [ELang.zhCN]: {
    message: {
      cancle: "取消操作"
    },
    dialogDelete: {
      title: "警告",
      content: "你确定要删除当前数据吗？此操作不可逆！",
      positiveText: "确定",
      negativeText: "取消"
    }

  },
  [ELang.enUS]: {
    message: {
      cancle: "Cancle"
    },
    dialogDelete: {
      title: "Warn",
      content: "Are you sure you want to delete the current data? This operation is irreversible!",
      positiveText: "confirm",
      negativeText: "cancle"
    }
  }
}
export function dialogDelete(dialog: DialogApiInjection, confirm: () => void, cancel?: () => void) {
  // const I18n = useI18nWithOut()
  const lang = langData[useSysStoreWithOut().getLang]
  dialog.warning({
    title: lang.dialogDelete.title,
    content: lang.dialogDelete.content,
    positiveText: lang.dialogDelete.positiveText,
    negativeText: lang.dialogDelete.negativeText,
    onPositiveClick: () => {
      confirm && confirm()
    },
    onNegativeClick: () => {
      if (cancel) {
        cancel()
      } else {
        window.$message.info(lang.message.cancle)
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

export interface ISelectOption {
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

export function downloadBlob(name, blobData) {
  const now = new Date()
  const yyyy = now.getFullYear()
  const MM = `0${now.getMonth() + 1}`.slice(-2)
  const DD = `0${now.getDate()}`.slice(-2)
  const HH = `0${now.getHours()}`.slice(-2)
  const mm = `0${now.getMinutes()}`.slice(-2)
  const SS = `0${now.getSeconds()}`.slice(-2)
  const blob = new Blob([blobData])
  const linkNode = document.createElement('a')
  linkNode.download = `${name}-${yyyy}${MM}${DD}${HH}${mm}${SS}.xls`
  linkNode.style.display = 'none'
  linkNode.href = URL.createObjectURL(blob)
  document.body.appendChild(linkNode)
  linkNode.click()

  URL.revokeObjectURL(linkNode.href)
  document.body.removeChild(linkNode)
}