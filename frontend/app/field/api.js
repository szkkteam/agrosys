import { get } from 'utils/request'
import { v1 } from 'api'


function soil(uri) {
  return v1(`/soils${uri}`)
}

export default class SoilType {
  static listSoilTypes() {
    return get(soil(''))
  }
}