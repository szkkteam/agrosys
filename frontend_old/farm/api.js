import { get } from 'utils/request'
import { v1 } from 'api'


function farm(uri) {
  return v1(`/farms${uri}`)
}

export default class Farm {
  static listFarms() {
    return get(farm(''))
  }
}