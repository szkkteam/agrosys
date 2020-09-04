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
    selectParcelTypesbyId,
} from 'reference/reducers/parcelTypes'

import {
    selectSoilTypesEntities,
    selectSoilsTypesbyId,
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


export const selectParcels = (state) => state[KEY]
export const selectParcelsById = (state) => state[KEY].byId
export const selectSelectedParcelId = (state) => selectParcels(state).selectedParcelId
export const selectSelectedSeasonParcels = (state) => {
    const season = selectSeasons(state)
    return _.get(season.byId, [season.selectedSeasonId, 'referenceParcels'], [])
}


export const getSelectedParcel = createSelector(
    [
        selectSelectedParcelId,
        selectSoilsTypesbyId,
        selectParcelTypesbyId,
        selectParcelsById
    ],
    (selectedParcelId, soilTypes, referenceParcelTypes, parcels) => {
        // TODO: This is running every time.
        console.log("getSelectedParcel running")
        return selectedParcelId? deNormalizeParcels({ ids: [selectedParcelId], ...{entities: {parcels, soilTypes, referenceParcelTypes}}})[0] : null
    }
)

export const getSelectedSeasonParcelsDenormalized = createSelector(
    [
        selectSelectedSeasonParcels,
        selectSelectedParcelId,
        selectSoilsTypesbyId,
        selectParcelTypesbyId,
        selectParcelsById
    ],
    (parcelIds, selectedParcelId, soilTypes, referenceParcelTypes, parcels) => {
        console.log("parcelIds: ", parcelIds)
        // Filter out the selected season id
        return deNormalizeParcels({ ids: _.without(parcelIds, selectedParcelId), ...{entities: {parcels, soilTypes, referenceParcelTypes}}})
    }
)

export const getSelectedSeasonParcelsGrouped = createSelector(
    [getSelectedSeasonParcelsDenormalized],
    (normalizedParcels) => {
        // Sort the parcels based on the size    
        const sorted = sortBySize(normalizedParcels)
        return groupByParcelType(sorted)        
    }
)


export const getSelectedSeasonParcelsTreeDenormalized = createSelector(
    [
        selectSelectedSeasonParcels,
        selectSoilsTypesbyId,
        selectParcelTypesbyId,
        selectParcelsById
    ],
    (parcelIds, soilTypes, referenceParcelTypes, parcels) => {
        // Filter out the selected season id
        return deNormalizeParcels({ ids: parcelIds, ...{entities: {parcels, soilTypes, referenceParcelTypes}}})
    }
)


export const getSelectedSeasonParcelsTree = createSelector(
    [getSelectedSeasonParcelsTreeDenormalized],
    (normalizedParcels) => {
        return normalizedParcels.reduce((flatAccu, parcel) => {            
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
    [
        selectSelectedParcelId, 
        selectParcels,
        selectSoilsTypesbyId,
        selectParcelTypesbyId,
    ],
    (selectedParcelId, parcelState, soilTypes, referenceParcelTypes) => {
        // If no selected, return with empty list
        if (!selectedParcelId) return []
        let parent = selectedParcelId
        parcelState.ids.map((id) => 
            parcelState.byId[id].parcels.find(x => { if (x == selectedParcelId) { parent = id } }))

        // TODO: Maybe return with the siblings on the top level also and could be used for more purpose
        if (!parent) return []        
        const denormalized = deNormalizeParcels({ ids: _.without(parcelState.byId[parent].parcels, selectedParcelId), ...{entities: {parcels: parcelState.byId, soilTypes, referenceParcelTypes}}})    
        // Sort the parcels based on the size    
        return sortBySize(denormalized)
    }
)

