import { 
    listSeasons,
    actionSeason,
    loadSeasonDetail,
    createSeason,
    updateSeason,
    setSeason,
} from 'season/actions'

export const KEY = 'seasons'

const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: [],
    error: null,
    selected: null,
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
            console.log("season/SET_SEASON: ", payload)
            return { ...state,
                selected,
            }

        case listSeasons.SUCCESS:
            return { ...state,
                ids: seasons.map((season) => season.id),
                byId: seasons.reduce((byId, season) => {
                    byId[season.id] = season
                    return byId
                }, byId),
                isLoaded: true,                
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
export const selectSeasonsList = (state) => {
    const seasons = selectSeasons(state)
    return seasons.ids.map((id) => seasons.byId[id])
}
