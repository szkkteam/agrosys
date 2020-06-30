import { listFarms } from 'farm/actions'

export const KEY = 'farms'

const initialState = {
    isLoading: false,
    isLoaded: false,
    titles: [],
    byTitle: {},
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
    const { farms } = payload || {}
    const { byTitle } = state

    switch(type) {
        case listFarms.REQUEST:
            return { ...state,
                isLoading: true 
            }

        case listFarms.SUCCESS:
            return { ...state,
                titles: farms.map((farm) => farm.title),
                byTitle: farms.reduce((byTitle, farm) => {
                    byTitle[farm.title] = farm
                    return byTitle
                }, byTitle),
                isLoaded: true,
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
export const selectFarmsList = (state) => {
    const farms = selectFarms(state)
    return farms.titles.map((title) => farms.byTitle[title])
}