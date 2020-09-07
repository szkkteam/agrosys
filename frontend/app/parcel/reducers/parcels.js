import { 
    listSeasonParcel,   
    createParcel,
    updateParcel,
    actionParcel,
} from 'parcel/actions'

import {
    selectSeasons,
} from 'season/reducers/seasons'

import {
    parcelTypesEnum
} from 'reference/constants'

export const KEY = 'parcels'


const groupOrder = [
    parcelTypesEnum.PHYSICAL_BLOCK,
    parcelTypesEnum.FARMERS_BLOCK,
    parcelTypesEnum.CADASTRAL_PARCEL,
    parcelTypesEnum.AGRICULTURAL_PARCEL,
]


const initialState = {    
    isLoading: false,
    isLoaded: false,
    ids: [],
    byId: {},
    selectedParcelId: null,
    error: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action
    const { byId: parcelsById, ids } = payload || {}
    const { byId } = state
    

    switch(type) {
        case listSeasonParcel.REQUEST:
            return { ...state,
                isLoading: true 
            }
        
        case updateParcel.SUCCESS:
            return {
                ...state,
                byId: {...byId, ...parcelsById},
            }

        case actionParcel.ADD_PARCEL: 
            const { groupId, parcelId } = payload
            const parcelById = state.byId[groupId]
            return { 
                ...state,
                byId: { ...byId, [groupId]: {
                        ...parcelById,
                        parcels: _.uniq([...parcelById.parcels, ...[parcelId]])
                    }
                }
            }

        case actionParcel.SELECT_PARCEL:
            const { selectedParcelId } = payload
            // If selection is the same, perform deselect logic
            let selection = selectedParcelId
            if(state.selectedParcelId == selectedParcelId) {
                // Check if the old selection is a child
                let parent = null
                state.ids.map((id) => {
                    state.byId[id].parcels.find(x => { if (x == selectedParcelId) { parent = id } })
                })
                selection = parent
            }
            return { ...state,
                selectedParcelId: selection,
            }

        case actionParcel.SELECT_CLEAR:
            return { ...state,
                selectedParcelId: null,
            }

        case createParcel.SUCCESS:
        case listSeasonParcel.SUCCESS:
            return { ...state,
                byId: {...byId, ...parcelsById},
                ids: _.uniq([...state.ids, ...ids]),
                isLoaded: true,  
            }

        case listSeasonParcel.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSeasonParcel.FULFILL:
            return { ...state,
                isLoading: false,
            }

        default:
            return state
    }
}

export const selectParcels = (state) => state[KEY]
export const selectParcelsById = (state) => state[KEY].byId
export const selectSelectedParcelId = (state) => selectParcels(state).selectedParcelId
export const selectSelectedSeasonParcels = (state) => {
    const season = selectSeasons(state)
    return _.get(season.byId, [season.selectedSeasonId, 'referenceParcels'], [])
}

