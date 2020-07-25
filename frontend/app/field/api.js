import { get, post, patch } from 'utils/request'
import { v1 } from 'api'


function field(uri) {
  return v1(`/fields${uri}`)
}


function farmField(uri) {
  return v1(`/farms/${uri}/fields`)
}


export default class Field {

  static listFields(farm) {
    return get(farmField(farm.id))
  }
  /**
   * @param {Object} payload The field details
   * @param {string} payload.title
   * @param {list} payload.fields
   * @param {GeoJSON} payload.fields[].shape
   * @param {float} payload.fields[].area
   * @param {float} payload.fields[].value
   * @param {integer} payload.fields[].soilTypeId
   */
  static createFields(farm, payload) {
    return post(farmField(farm.id), payload)
  }

  static loadFieldDetail(fieldIn) {    
    return get(field(`/${fieldIn.id}`))
  }

  static createFieldDetails(fieldIn, payload) {
    return post(field(`/${fieldIn.id}/detail`), payload)
  }

  static updateFieldDetails(fieldDetailIn, payload) {
    return patch(field(`/detail/${fieldDetailIn.id}`), payload)
  }

}
