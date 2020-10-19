import { SEASON_SELECT } from 'season/constants'

import { storage } from 'utils'

export const KEY = 'seasonDetail'

const initialState = {    
    selectedSeason: storage.getSelectedSeason(),
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { currentSeason } = payload || {}

    switch(type) {

        case SEASON_SELECT:
            storage.selectSeason(currentSeason)
            return { ...state,
                selectedSeason : currentSeason,
            }

        default:
            return state
    }
}

export const selectSeasonDetail = (state) => state[KEY]
