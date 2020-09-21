import { get, post, patch, put } from 'utils/request'
import { farm } from 'api'


function production(uri) {
  return farm(`/productions${uri}`)
}

function parcel(uri) {
    return farm(`/parcels${uri}`)
}

export default class Template {

    static listProductions(farmData) {
        return get(farm(`/${farmData.id}/productions`))
    }

    static listParcelProductions(parcelData) {
        return get(parcel(`/${parcelData.id}/productions`))        
    }
  
}
