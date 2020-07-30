import { get, post, patch } from 'utils/request'
import { v1 } from 'api'


function production(uri) {
  return v1(`/fields/details/productions/${uri}`)
}

function productions() {
    return v1('/productions')
}

function fieldProductions(uri) {
  return v1(`/fields/details/${uri}/productions`)
}


export default class Production {

  static listProductionsByField(fieldDetail) {
    return get(fieldProductions(fieldDetail.id))
  }
  
  static listProductions() {
    return get(productions())
  }

}
