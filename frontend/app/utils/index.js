export { default as storage } from './storage'


export function convertDates(keys) {
  return function (obj) {
    keys.forEach((key) => {
      obj[key] = obj[key] && new Date(obj[key]) || null
    })
    return obj
  }
}


export const updateObjectInArray = (array, index, newData) => {
  return array.map((item, i) => {
    if (i !== index) {
      return item
    } 
    return {
      ...item,
      ...newData
    }
  })
}