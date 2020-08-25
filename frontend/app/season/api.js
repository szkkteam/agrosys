import { get, post, patch, put } from 'utils/request'
import { farm } from 'api'


function season(uri) {
  return farm(`/seasons${uri}`)
}


export default class Season {

    static listSeasons(farmData) {
        return get(farm(`/${farmData.id}/seasons`))
    }
  
    static createSeasons(farmData) {
        return post(farm(`/${farmData.id}/seasons`))
    }

    static getSeason(seasonData) {
        return get(season(`/${seasonData}`))
    }

    static updateSeason(seasonData) {
        return put(season(`/${seasonData}`))
    }

    static archiveSeason(seasonData) {
        return put(season(`/archive/${seasonData}`))
    }

}
