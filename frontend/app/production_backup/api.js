import { get, post, patch, put } from 'utils/request'
import { v1 } from 'api'


function production(uri) {
  return v1(`/field-details/productions/${uri}`)
}


function fieldProductions(field, production) {
  return v1(`field-details/${field.id}/productions/${production.id}`)
}


export default class Production {

  static listProductionsByField(fieldDetail) {
    return get(fieldProductions(fieldDetail.id))
  }
  
  static listProductions() {
    return get(production(''))
  }

  static loadProductionDetail(productionIn) {
    console.log("productionIn: ", productionIn)
    return get(production(`${productionIn.id}`))
  }

  static createProductions(payload) {
    return post(production(''), payload)
  }

  static assigFieldToProduction(field, production) {
    console.log("assigFieldToProduction-f: ", field)
    console.log("assigFieldToProduction-p: ", production)
    return put(fieldProductions(field, production))
  }
}
