import { FARM_SELECT } from 'farm/constants'
import { listFarms } from 'farm/actions'
import { storage } from 'utils'

export const KEY = 'farmDetail'

const initialState = {
    selectedFarm: storage.getActiveFarm(),
}

export default function(state = initialState, action) {
    const { type, payload } = action
    //const { selectedFarm = null } = state
    const { currentFarm } = payload || {}
    switch(type) {
        /*
        case listFarms.SUCCESS:
            // Activate the farm
                let activateFarm = false
            if (farms.length == 1 && !selectedFarm) {
                storage.activateFarm(farms[0])
                activateFarm = true
            }
            return { ...state,
                farmsMenuList: farms,
                isLoaded: true,
                selectedFarm: activateFarm? farms[0]: selectedFarm,
            }
           return { ...state,
           }
           */
        case FARM_SELECT:
            return { ...state,
                selectedFarm: currentFarm // If same farm is selected, just select again. Deselecting farms are not allowed
            }

        default:
            return state
    }
}

export const selectFarmDetail = (state) => state[KEY]
export const selectCurrentFarm = (state) => selectFarmDetail(state).selectedFarm
