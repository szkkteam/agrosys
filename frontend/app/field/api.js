import { get, post } from 'utils/request'
import { v1 } from 'api'


function soil(uri) {
  return v1(`/soils${uri}`)
}


function field(uri) {
  return v1(`/fields${uri}`)
}


function farmField(uri) {
  return v1(`/farms/${uri}/fields`)
}


export default class Field {
  static listSoilTypes() {
    return get(soil(''))
  }

  static listFields() {
    return get(field(''))
  }


  /**
   * @param {Object} payload The field details
   * @param {string} payload.title
   * @param {list} payload.fields
   * @param {GeoJSON} payload.fields[].shape
   * @param {float} payload.fields[].area
   * @param {float} payload.fields[].value
   * * @param {integer} payload.fields[].soilTypeId
   */
  static createFields(farm, payload) {
    return post(farmField(farm.id), payload)
  }

}
