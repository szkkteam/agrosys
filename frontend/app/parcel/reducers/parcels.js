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
    createSeason, 
    listSeasons,
    actionSeason,
} from 'season/actions'

import {
    parcelTypesEnum
} from 'reference/constants'

export const KEY = 'parcels'


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
    const { parcels: parcelsById, ids } = payload || {}
    const { byId } = state
    

    switch(type) {
        case listSeasons.REQUEST:
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
                        parcels: _.uniq(_.concat(parcelById.parcels, parcelId))
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

        case createSeason.SUCCESS:
            // Handle the case, when a season is created with new parcels
            if (parcelsById) {
                return { ...state,
                    byId: {...byId, ...parcelsById},
                    //ids: _.uniq(_.concat(state.ids, Object.keys(parcelsById).map((parcel, i) => ( parcel.id )))),
                    isLoaded: true,  
                }
            // Handle the case, when a season is without any new parcel
            } else {
                return { ...state,
                    isLoaded: true,  
                }
            }

        case listSeasons.SUCCESS:
        case createParcel.SUCCESS:
        case listSeasonParcel.SUCCESS:
            return { ...state,
                byId: {...byId, ...parcelsById},
                ids: _.uniq(_.concat(state.ids, ids)),
                isLoaded: true,  
            }

        case listSeasons.FAILURE:
        case listSeasonParcel.FAILURE:
            return { ...state, 
                error: payload.error,
            }

        case listSeasons.FULFILL:
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
export const selectSeasonParcelsIsLoading = (state) => selectParcels(state).isLoading
export const selectSelectedParcelId = (state) => selectParcels(state).selectedParcelId
export const selectSelectedSeasonParcels = (state) => {
    const season = selectSeasons(state)
    return _.get(season.byId, [season.selectedSeasonId, 'referenceParcels'], [])
}
export const selectLastSeasonParcels = (state) => {
    const season = selectSeasons(state)
    return _.get(season.byId, [_.last(season.ids), 'referenceParcels'], [])
}
