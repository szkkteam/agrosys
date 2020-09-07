import { get } from 'utils/request'
import { reference } from 'api'


function agricultural(uri) {
  return reference(`/agricultural-types${uri}`)
}

function soil(uri) {
    return reference(`/soils${uri}`)
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

}
