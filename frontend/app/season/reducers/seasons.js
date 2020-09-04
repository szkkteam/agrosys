import { 
    listSeasons,
    actionSeason,
    loadSeasonDetail,
    createSeason,
    updateSeason,
    setSeason,
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
    const { byId: seasonsById, ids } = payload || {}
    const { byId } = state

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
                        referenceParcels: _.uniq(...seasonById.referenceParcels, ...[parcelId])
                    }
                }
            }

        case actionSeason.SET:
            const { selected } = payload
            const newSelectedId = normalizeSeason(selected).ids
            storage.selectSeason(newSelectedId)
            return { ...state,
                selectedSeasonId: newSelectedId,
            }

        case listSeasons.SUCCESS:
            return { ...state,
                byId: {...byId, ...seasonsById},
                ids: _.uniq([...state.ids, ...ids]),
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
}

export const selectSeasons = (state) => state[KEY]
export const selectSelectedSeasonParcels = (state) => {
    const season = selectSeasons(state)
    return season.byId[season.selectedSeasonId]? season.byId[season.selectedSeasonId].referenceParcels : []
}

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

