export function dateFilter(time) {
  if (!time) {
    return ''
  } else {
    const date = new Date(time)
    const dateNumFun = (num) => num < 10 ? `0${num}` : num
    const [Y, M, D, h, m, s] = [
      date.getFullYear(),
      dateNumFun(date.getMonth() + 1),
      dateNumFun(date.getDate()),
      dateNumFun(date.getHours()),
      dateNumFun(date.getMinutes()),
      dateNumFun(date.getSeconds())
    ]
    const diff = (time - Date.now()) / 1000
    if (diff < 60) {
      return '马上'
    }

    if (diff < 3600) {
      return '一小时内'
    }
    if (diff < 86400) {
      return `${h}:${m}:${s}`
    } else {
      return `${Y}-${M}-${D}`
    }
  }
}
export function TimestampToDate(time: number, format = "yyyy-MM-dd") {
  const date = new Date(time)
  const Y = date.getFullYear() + ''
  const M = `0${date.getMonth() + 1}`.slice(-2)
  const D = `0${date.getDate()}`.slice(-2)
  const H = `0${date.getHours()}`.slice(-2)
  const m = `0${date.getMinutes()}`.slice(-2)
  const S = `0${date.getSeconds()}`.slice(-2)
  const result = format.replace('yyyy', Y).replace('MM', M).replace('dd', D).replace('hh', H).replace('mm', m).replace('ss', S)
  return result
}


export default { dateFilter }
