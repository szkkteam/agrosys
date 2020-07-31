import { get, post, patch } from 'utils/request'
import { v1 } from 'api'


function production(uri) {
  return v1(`/field-details/productions/${uri}`)
}

function productions() {
    return v1('/field-details/productions')
}

function fieldProductions(field, production) {
  return v1(`field-details/${field}/productions/${production}`)
}


export default class Production {

  static listProductionsByField(fieldDetail) {
    return get(fieldProductions(fieldDetail.id))
  }
  
  static listProductions() {
    return get(productions())
  }

}
