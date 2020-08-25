import { get } from 'utils/request'
import { reference } from 'api'


function parcel(uri) {
  return reference(`/parceltypes${uri}`)
}

function soil(uri) {
    return reference(`/soils${uri}`)
}

export default class Reference {

    static listParcelTypes() {
        return get(parcel(``))
    }
  
    static getParcelType(parcelType) {
        return get(parcel(`/${parcelType.id}`))
    }

    static listSoilTypes() {
        return get(soil(``))
    }
  
    static getSoilType(soilType) {
        return get(soil(`/${soilType.id}`))
    }

}
