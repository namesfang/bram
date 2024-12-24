import dayjs from "dayjs"
import { isEmpty } from "radash"

export default class Datetime {
  static formatOrNil(date?: dayjs.ConfigType) {
    if (isEmpty(date)) {
      return ''
    }
    return Datetime.format(date)
  }

  static format(date?: dayjs.ConfigType, template: string = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(template)
  }

  static formatdOrNil(date?: dayjs.ConfigType) {
    if (isEmpty(date)) {
      return ''
    }
    return Datetime.formatd(date)
  }

  static formatd = (date?: dayjs.ConfigType) => {
    return dayjs(date).format('YYYY-MM-DD')
  }
}
