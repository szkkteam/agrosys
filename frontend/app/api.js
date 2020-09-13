import { url } from 'utils/request'


export function v1(uri, queryParams) {
  return url(`/api/v1${uri}`, queryParams)
}

export function farm(uri) {
  return v1(`/farms${uri}`)
}


export function reference(uri, queryParams = null) {
  return v1(`/refs${uri}`, queryParams)
}
