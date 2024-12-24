export const isPositive = (value: unknown, strict = false) => {
  if (strict) {
    if (typeof value !== 'number') {
      return false
    }
  }

  if (typeof value === 'number') {
    return value > 0
  }

  if (typeof value === 'string') {
    if (/^(\d+)$/.test(value)) {
      return Number(value) > 0
    }
  }
  
  return false
}

export const isNumber = (value: unknown, strict = false) => {
  if (strict) {
    if (typeof value !== 'number') {
      return false
    }
  }

  if (typeof value === 'number') {
    return true
  }

  if (typeof value === 'string') {
    if (/^(\d+)$/.test(value)) {
      return true
    }
  }
  
  return false
}

export const isEmpty = (value: unknown) => {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim().length === 0
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

const branchNameRegExp = new RegExp(/^([a-z]{2,16})\/(\d{8})-(.{1,})$/)
export const isBranchName = (value: string)=> {
  return branchNameRegExp.test(value)
}

export const matchBranchName = (value: string)=> {
  return branchNameRegExp.exec(value)
}
