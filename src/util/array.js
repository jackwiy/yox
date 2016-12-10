
import * as env from '../config/env'

import * as is from './is'

let {
  slice,
} = Array.prototype

/**
 * 遍历数组，支持返回 fasle 退出遍历
 */
export function each(array, callback, reversed) {
  let { length } = array
  if (reversed) {
    for (let i = length - 1; i >= 0; i--) {
      if (callback(array[i], i) === env.FALSE) {
        break
      }
    }
  }
  else {
    for (let i = 0; i < length; i++) {
      if (callback(array[i], i) === env.FALSE) {
        break
      }
    }
  }
}

/**
 * 原生的 array.reduce 如果传了空数组，不传 initialValue 居然会报错
 */
export function reduce(array, callback, initialValue) {
  return array.reduce(callback, initialValue)
}

/**
 * 返回 array2 中包含，array1 中不包含的数组项
 *
 * @param {Array} array1
 * @param {Array} array2
 * @return {Array}
 */
export function diff(array1, array2, strict) {
  let result = [ ]
  each(
    array2,
    function (item) {
      if (!has(array1, item, strict)) {
        result.push(item)
      }
    }
  )
  return result
}

/**
 * 合并多个数组，不去重
 */
export function merge() {
  let result = [ ]
  let push = function (item) {
    result.push(item)
  }
  each(
    arguments,
    function (array) {
      each(array, push)
    }
  )
  return result
}

export function toArray(array) {
  return is.array(array) ? array : slice.call(array)
}

export function toObject(array, key) {
  let result = { }
  each(
    array,
    function (item) {
      result[key ? item[key] : item] = item
    }
  )
  return result
}

export function indexOf(array, item, strict) {
  if (strict !== env.FALSE) {
    return array.indexOf(item)
  }
  else {
    let index = -1
    each(
      array,
      function (value, i) {
        if (item == value) {
          index = i
          return env.FALSE
        }
      }
    )
    return index
  }
}

export function has(array, item, strict) {
  return indexOf(array, item, strict) >= 0
}

export function last(array) {
  return array[array.length - 1]
}

export function remove(array, item, strict) {
  let index = indexOf(array, item, strict)
  if (index >= 0) {
    array.splice(index, 1)
  }
}
