import { 
    listSeasons,
    actionSeason,
    setSeason,
    loadSeasonDetail,
    createSeason,
    updateSeason,
    addParcelToSeason,
} from 'season/actions'

import { storage } from 'utils'

export const KEY = 'seasonsDetail'

const initialState = {    
    selectedSeason: storage.getSelectedSeason(),
}

export default function(state = initialState, action) {
    const { type, payload } = action
    //const { seasons: seasonsById, ids } = payload || {}

    switch(type) {
        case listSeasons.SUCCESS:
            // TODO: Maybe here set the latest season as active if its not set yet
            return { ...state,
                isLoading: true 
            }

        case setSeason.SUCCESS:
            const selectedSeason = payload
            storage.selectSeason(selectedSeason)
            return { ...state,
                selectedSeason,
            }

        default:
            return state
    }
}

export const selectSeasonDetail = (state) => state[KEY]
export const selectSelectedSeason = (state) => selectSeasonDetail(state).selectedSeason