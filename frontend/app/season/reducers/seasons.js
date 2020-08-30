import { 
    listSeasons,
    actionSeason,
    loadSeasonDetail,
    createSeason,
    updateSeason,
    setSeason,
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
    selected: storage.getSelectedSeason(),
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { seasons } = payload || {}
    const { byId } = state

    switch(type) {
        case listSeasons.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case actionSeason.SET:
            const { selected } = payload
            const data = normalizeSeason(selected)
            storage.selectSeason(data.ids)
            return { ...state,
                selected: data.ids,
            }

        case listSeasons.SUCCESS:
            const flatData = normalizeSeasons(seasons)
            const currentSeason = selected? selected: seasons[seasons.length - 1]
            return { ...state,
                byId: {...byId, ...flatData.byId},
                ids: flatData.ids,
                isLoaded: true,  
                selected: normalizeSeason(currentSeason).ids,
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
    return seasons.byId[seasons.selected]
}
