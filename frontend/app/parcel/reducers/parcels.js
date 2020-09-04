import { createSelector } from 'reselect'

import { 
    listSeasonParcel,   
    createParcel,
    updateParcel,
    actionParcel,
} from 'parcel/actions'

import {
    normalizeParcels,
    deNormalizeParcels
} from 'parcel/schemas'

import {
    selectParcelTypesEntities,
} from 'reference/reducers/parcelTypes'

import {
    selectSoilTypesEntities,
} from 'reference/reducers/soilTypes'

import {
    selectSelectedSeasons,
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
    const { parcels } = payload || {}
    const { byId } = state
    

    switch(type) {
        case listSeasonParcel.REQUEST:
            return { ...state,
                isLoading: true 
            }
        
        case updateParcel.SUCCESS:
            return {
                ...state,
                byId: {...byId, ...normalizeParcels(parcels).byId},
            }

        case actionParcel.ADD_PARCEL: 
            const { groupId, parcelId } = payload
            const parcelById = state.byId[groupId]
            return { 
                ...state,
                byId: { ...byId, [groupId]: {
                        ...parcelById,
                        parcels: parcelById.parcels.concat(parcelId)
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
            const flatData = normalizeParcels(parcels)
            console.log("createParcel flatData: ", flatData)
            return { ...state,
                byId: {...byId, ...flatData.byId},
                ids: state.ids.concat(flatData.ids),
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

const groupByParcelType = (data) => {
    const grouped = data.reduce((grouped, parcel) => {        
        if (!parcel.referenceParcelType) { return grouped}                     
        let item = grouped[parcel.referenceParcelType.code] || []
        item.push(parcel)
        grouped[parcel.referenceParcelType.code] = item
        return grouped
    }, {})
    let keys = []
    // Make an inner join between keys where the order is fixed. Eg: Phyiscal block -> Farmers block -> Cadastrial parcel -> Agricultural parcel
    groupOrder.map((item) => item in grouped? keys.push(item): null )
    return { keys, data: grouped }
}
    
const sortBySize = (data) =>
    data.sort((a, b) => parseFloat(a.totalArea) > parseFloat(b.totalArea)? -1 : 1)

const excludeId = (ids, id) => ids.filter(x => x != id)

export const selectParcels = (state) => state[KEY]
export const selectSelectedParcelId = (state) => selectParcels(state).selectedParcelId
export const selectSelectedParcelParcelIds = (state) => {
    const parcels = selectParcels(state)
    return parcels.byId[parcels.selectedParcelId].parcels
}
export const selectSelectedSeasonParcels = (state) => {
    const season = selectSeasons(state)
    return season.byId[season.selected].referenceParcels
}

export const selectParcelsEntities = (state) => {
    return { entities: {
        ...selectSoilTypesEntities(state),
        ...selectParcelTypesEntities(state),
        ...{ parcels: selectParcels(state).byId,  }
    }}
}


export const getSelectedParcel = createSelector(
    [selectSelectedParcelId, selectParcelsEntities],
    (selectedId, entities) => {
        const res = selectedId? deNormalizeParcels({ ids: [selectedId], ...entities}) : []
        return res.length? res[0]: null
    }
)

export const getSelectedSeasonParcelsGrouped = createSelector(
    [selectSelectedSeasonParcels, selectSelectedParcelId, selectParcelsEntities],
    (parcelIds, selectedParcelId, entities) => {
        // Filter out the selected season id
        const denormalized = deNormalizeParcels({ ids: excludeId(parcelIds, selectedParcelId), ...entities})    
        // Sort the parcels based on the size    
        const sorted = sortBySize(denormalized)
        return groupByParcelType(sorted)        
    }
)

export const getSelectedSeasonParcels = createSelector(
    [selectSelectedSeasonParcels, selectSelectedParcelId, selectParcelsEntities],
    (parcelIds, selectedParcelId, entities) => {
        // Filter out the selected season id
        return deNormalizeParcels({ ids: excludeId(parcelIds, selectedParcelId), ...entities})    
    }
)

export const getSelectedSeasonParcelsTree = createSelector(
    [selectSelectedSeasonParcels, selectParcelsEntities],
    (parcelIds, entities) => {
        const denormalized = deNormalizeParcels({ ids: parcelIds, ...entities})    
        return denormalized.reduce((flatAccu, parcel) => {            
            flatAccu.push(parcel)
            // If parcel has nested parcels
            if (parcel.parcels && parcel.parcels.length) {
                // Extend the nested parcels with the parent ID
                const subParcels = parcel.parcels.map((subParcel, i) => {
                    return Object.assign(subParcel, {parentParcelId: parcel.id})
                })
                // Concat the sub parcels to the accumulator
                flatAccu = flatAccu.concat(subParcels)
            }
            return flatAccu
        }, [])
    }
)

export const getSelectedSiblingParcels = createSelector(
    [selectSelectedParcelId, selectParcels, selectParcelsEntities],
    (selectedParcelId, parcelState, entities) => {
        // If no selected, return with empty list
        if (!selectedParcelId) return []
        let parent = selectedParcelId
        parcelState.ids.map((id) => 
            parcelState.byId[id].parcels.find(x => { if (x == selectedParcelId) { parent = id } }))
            
        // TODO: Maybe return with the siblings on the top level also and could be used for more purpose
        if (!parent) return []        
        const denormalized = deNormalizeParcels({ ids: excludeId(parcelState.byId[parent].parcels, selectedParcelId), ...entities})    
        // Sort the parcels based on the size    
        return sortBySize(denormalized)
    }
)

export const selectParcelsList = (state) => {
    const parcels = selectParcels(state)
    return deNormalizeParcels({ ids: parcels.ids, ...selectParcelsEntities(state) })

}

export const selectSeasonParcelsList = (state) => {
    const selected = selectSelectedSeasons(state) || null
    if (selected) {
        return selectParcelsListById(state, selected.referenceParcels)
    }
    return []
}


export const selectParcelsListById = (state, ids = []) => {
    return deNormalizeParcels({ ids, ...selectParcelsEntities(state) })

}
