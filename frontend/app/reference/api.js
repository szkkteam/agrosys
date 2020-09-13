import { get } from 'utils/request'
import { reference, v1 } from 'api'


function agricultural(uri) {
  return reference(`/agricultural-types${uri}`)
}

function soil(uri) {
    return reference(`/soils${uri}`)
}

function products(uri, queryParams) {
    return reference(`/products${uri}`, queryParams)
}

export default class Reference {

    static listAgriculturalTypes() {
        return get(agricultural(``))
    }
  
    static getAgriculturalType(agriculturalType) {
        return get(agricultural(`/${agriculturalType.id}`))
    }

    static listSoilTypes() {
        return get(soil(``))
    }
  
    static getSoilType(soilType) {
        return get(soil(`/${soilType.id}`))
    }

    static listSpecificProducts(queryParams) {
        return get(products(``), queryParams)
    }

    static getSpecificProducts(specificProduct, queryParams) {
        return get(products(`/${specificProduct.id}`), queryParams)
    }
}
