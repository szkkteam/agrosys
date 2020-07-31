import { get } from 'utils/request'
import { v1 } from 'api'


function crop(uri, queryParams) {
  return v1(`/crops${uri}`, queryParams)
}


export default class Crop {

    static listCropBases(queryParams) {
        return get(crop('', queryParams))
    }

    static listCropVariants(queryParams) {
        return get(crop('/variants', queryParams))
    }

    static listCropCultivationTypes(queryParams) {
        return get(crop('/cultivation-types', queryParams))
    }

    static listCropTemplates(queryParams) {
        return get(crop('/templates', queryParams))
    }


}
