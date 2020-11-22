import { 
    listSeasons,
    actionSeason,
    setSeason,
    loadSeasonDetail,
    createSeason,
    updateSeason,
    addParcelToSeason,
} from 'season/actions'

import {
    normalizeSeasons,
    normalizeSeason,
    deNormalizeSeasons,
    deNormalizeSeason
} from 'season/schemas'

import { selectParcels } from 'parcel/reducers/parcels'

import { storage } from 'utils'

export const KEY = 'seasons'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    error: null,
    selectedSeasonId: storage.getSelectedSeason(),
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { seasons: seasonsById, ids } = payload || {}
    const { byId } = state
    /*
    switch(type) {
        case listSeasons.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case actionSeason.ADD_PARCEL:
            const { seasonId, parcelId } = payload
            const seasonById = state.byId[seasonId]
            return {
                ...state,
                byId: { ...byId, [seasonId]: {
                        ...seasonById,
                        referenceParcels: _.uniq(_.concat(seasonById.referenceParcels, parcelId))
                    }
                }
            }

        case setSeason.SUCCESS:
            console.log("setSeason.SUCCESS-payload: ", payload)
            console.log("setSeason.SUCCESS-type: ", type)
            const { selectedSeasonId } = payload
            storage.selectSeason(selectedSeasonId)
            return { ...state,
                selectedSeasonId,
            }

        case createSeason.SUCCESS:
        case listSeasons.SUCCESS:
            console.log("createSeason.SUCCESS-seasonsById: ", seasonsById)
            console.log("createSeason.SUCCESS-ids: ", ids)
            return { ...state,
                byId: {...byId, ...seasonsById},
                ids: _.uniq(_.concat(state.ids, ids)),
                isLoaded: true,  
                //selectedSeasonId: state.selectedSeasonId? state.selectedSeasonId: _.last(ids),
            }

        case listSeasons.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSeasons.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
    */
   return state
}

export const selectSeasons = (state) => state[KEY]
export const selectSelectedSeasonParcels = (state) => {
    const season = selectSeasons(state)
    return season.byId[season.selectedSeasonId]? season.byId[season.selectedSeasonId].referenceParcels : []
}
export const selectLastSeason = (state) => {
    const season = selectSeasons(state)
    return _.get(season.byId, [_.last(season.ids)], null)
}
export const selectSeasonsIds = (state) => state[KEY].ids
export const selectSeasonsById = (state) => state[KEY].byId
export const selectSeasonsIsLoading = (state) => selectSeasons(state).isLoading
export const selectSelectedSeasonId = (state) => state[KEY].selectedSeasonId

export const selectSeasonsEntities = (state) => {
    const seasons = selectSeasons(state)
    return { seasons: seasons.byId,  }
}

export const selectSeasonsList = (state) => {
    const seasons = selectSeasons(state)
    return deNormalizeSeasons({ ids: seasons.ids, entities: selectSeasonsEntities(state) })
    //return seasons.ids.map((id) => seasons.byId[id])
}
export const selectSelectedSeasons = (state) => {
    const seasons = selectSeasons(state)
    return seasons.byId[seasons.selectedSeasonId]
}

