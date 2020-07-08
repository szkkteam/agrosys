import { listFarms } from 'farm/actions'
import { storage } from 'utils'

export const KEY = 'farms'

const initialState = {
    isLoading: false,
    isLoaded: false,
    // Store the previously activated farm
    selectedFarm: storage.getActiveFarm(),
    farmsMenuList: [],
    error: null,
}

/*

    case login.SUCCESS:
    case resetPassword.SUCCESS:
      const { token, user } = payload
      storage.doLogin(token, user)
      return { ...state,
        isAuthenticated: true,
        token,
        user,
        profile: { ...state.profile,
          isLoaded: true,
        },
      }

 */

export default function(state = initialState, action) {
    const { type, payload } = action
    const { farms } = payload || []
    const { selectedFarm } = state

    switch(type) {
        case listFarms.REQUEST:
            return { ...state,
                isLoading: true 
            }

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
        
        case listFarms.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listFarms.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectFarms = (state) => state[KEY]
export const selectFarmsMenu = (state) => {
    const farms = selectFarms(state)
    return farms.farmsMenuList.map((farm, id) => {
        return {
            title: farm.title,
            id: farm.id,
        }
    })
}
export const selectSelectedFarm = (state) => {
    const farms = selectFarms(state)
    return farms.selectedFarm
}