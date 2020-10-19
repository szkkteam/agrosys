/*
import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

import {
    deNormalizeParcels
} from 'parcel/schemas'

import {
    selectParcels,
    selectSelectedParcelId,
    selectParcelsById,
    selectSelectedSeasonParcels,
    selectLastSeasonParcels,
    selectSeasonParcelsIsLoading,
} from 'parcel/reducers/parcels'

import {
    selectAgriculturalTypesbyId,
} from 'reference/reducers/agriculturalTypes'

import {
    selectSoilsTypesbyId,
} from 'reference/reducers/soilTypes'

import {
    parcelTypesEnum,
    getButtonsByMap,
    agriculturalTypePropsLookup
} from 'parcel/constants'



const groupByAgriculturalType = (data, agriculturalTypes) => {    
    const grouped = data.reduce((grouped, parcel) => {        
        if (!parcel || !parcel.agriculturalType) { return grouped}                     
        let item = grouped[parcel.agriculturalType.id] || []
        item.push(parcel)
        grouped[parcel.agriculturalType.id] = item
        return grouped
    }, {})

    return Object.keys(grouped).map((key, i) => ({
            title: agriculturalTypes[key].title,
            enable: true,
            props: agriculturalTypes[key].color? {color: agriculturalTypes[key].color} : agriculturalTypePropsLookup(key),
            items: grouped[key]
    }))
}
    
const sortBySize = (data) =>
    data.sort((a, b) => parseFloat(a.totalArea) > parseFloat(b.totalArea)? -1 : 1)


const constructParcelTree = (normalizedParcels) => (
    normalizedParcels.reduce((flatAccu, parcel) => {
        if (!parcel) return flatAccu              
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
)

export const getSelectedParcel = createSelector(
    [
        selectSelectedParcelId,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById
    ],
    (selectedParcelId, soilTypes, agriculturalTypes, parcels) => {
        return selectedParcelId? deNormalizeParcels({ ids: [selectedParcelId], ...{entities: {parcels, soilTypes, agriculturalTypes}}})[0] : null
    }
)

export const getParcelsDenormalizedUnordered = createSelector(
    [
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById,
        selectSeasonParcelsIsLoading
    ],
    (soilTypes, agriculturalTypes, parcels, isLoading) => {
        // Filter out the selected season id
        const parcelIds = Object.keys(parcels)
        const denormalized = deNormalizeParcels({ ids: parcelIds, ...{entities: {parcels, soilTypes, agriculturalTypes}}})
        return {
            data: denormalized,
            isLoading: denormalized.length? false : isLoading
        }
    }
)

export const getSelectedSeasonParcelsDenormalizedExclude = createSelector(
    [
        selectSelectedSeasonParcels,
        selectSelectedParcelId,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById,
        selectSeasonParcelsIsLoading
    ],
    (parcelIds, selectedParcelId, soilTypes, agriculturalTypes, parcels, isLoading) => {
        // Filter out the selected season id
        const denormalized = deNormalizeParcels({ ids: _.without(parcelIds, selectedParcelId), ...{entities: {parcels, soilTypes, agriculturalTypes}}})
        return {
            data: denormalized,
            isLoading: denormalized.length? false : isLoading
        }
    }
)

export const getSelectedSeasonParcelsDenormalized = createSelector(
    [
        selectSelectedSeasonParcels,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById,
        selectSeasonParcelsIsLoading
    ],
    (parcelIds, soilTypes, agriculturalTypes, parcels, isLoading) => {
        //console.log("getSelectedSeasonParcelsTreeDenormalized-parcelIds: ", parcelIds)
        //console.log("getSelectedSeasonParcelsTreeDenormalized-entities: ", {entities: {parcels, soilTypes, agriculturalTypes}})
        // Filter out the selected season id
        const denormalized = deNormalizeParcels({ ids: parcelIds, ...{entities: {parcels, soilTypes, agriculturalTypes}}})
        return {
            data: denormalized,
            isLoading: denormalized.length? false : isLoading
        }
    }
)


export const getSeasonParcelsById = createSelector(
    [
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById,
        selectSeasonParcelsIsLoading
    ],
    (soilTypes, agriculturalTypes, parcels, isLoading) => memoize(
        parcelIds => {
            const denormalized = constructParcelTree(deNormalizeParcels({ ids: _.concat([], parcelIds), ...{entities: {parcels, soilTypes, agriculturalTypes}}}))
            return {
                data: denormalized,
                isLoading: denormalized.length? false : isLoading
            }
        }
    )
)

export const getSelectedSeasonParcelsGrouped = createSelector(
    [
        getSelectedSeasonParcelsDenormalizedExclude,
        selectAgriculturalTypesbyId
    ],
    (normalizedParcels, agriculturalTypes) => {
        // If the selected parcels are still loading, just return with the empty array and the loading flag
        if (normalizedParcels.isLoading) return normalizedParcels
        // Sort the parcels based on the size    
        const sorted = sortBySize(normalizedParcels.data)
        return {
            data: groupByAgriculturalType(sorted, agriculturalTypes),
            isLoading: normalizedParcels.isLoading
        }
    }
)

export const getSelectedSeasonParcels = createSelector(
    [getSelectedSeasonParcelsDenormalized],
    (normalizedParcels) => {
        // If the selected parcels are still loading, just return with the empty array and the loading flag
        if (normalizedParcels.isLoading) return normalizedParcels
        // Keep this log, because parcelTree is not updated at the first time
        return {
            data: constructParcelTree(normalizedParcels.data),
            isLoading: normalizedParcels.isLoading
        }
    }
)

export const getSelectedSiblingParcels = createSelector(    
    [
        selectSelectedParcelId, 
        selectParcels,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectSeasonParcelsIsLoading,
    ],
    (selectedParcelId, parcelState, soilTypes, agriculturalTypes, isLoading) => {
        // If no selected, return with empty list
        if (!selectedParcelId) return { data: [], isLoading: false}
        let parent = selectedParcelId
        parcelState.ids.map(id =>
            parcelState.byId[id] && parcelState.byId[id].parcels && parcelState.byId[id].parcels.find(x => { if (x == selectedParcelId) { parent = id } }))
            
        //console.log("getSelectedSiblingParcels-parent: ", parent)
        // TODO: Maybe return with the siblings on the top level also and could be used for more purpose
        if (!parent) return { data: [], isLoading: false}
        const denormalized = deNormalizeParcels({ ids: _.without(parcelState.byId[parent].parcels, selectedParcelId), ...{entities: {parcels: parcelState.byId, soilTypes, agriculturalTypes}}})    
        // Sort the parcels based on the size    
        return {
            data: sortBySize(denormalized),
            isLoading: denormalized.isLoading
        }
    }
)


const renderButton = (parcelType) => {
    let retval = {
        type: "item",
        disabled: false,
        key: parcelType     
    }
    switch(parcelType) {
        case parcelTypesEnum.AGRICULTURAL_PARCEL: // Agricultural Parcel
            return Object.assign(retval, {
                title: "Add Agricultural Parcel",
            }) 
        case parcelTypesEnum.CADASTRAL_PARCEL: // Cadastral Parcel
            return Object.assign(retval, {
                title: "Add Cadastral Parcel",
            }) 
        case parcelTypesEnum.FARMERS_BLOCK: // Farmer's Block
            return Object.assign(retval, {
                title: "Add Farmer's Block",
            }) 
        case parcelTypesEnum.PHYSICAL_BLOCK: // Physical Block
            return Object.assign(retval, {
                title: "Add Physical Block",
            }) 
        default:
            return {}
    }
}

// TODO: Based on Country, change the listable parcel types
export const getAddButtonlist = createSelector(
    [getSelectedParcel],
    (selectedParcel) => {
        if (selectedParcel) {
            switch(selectedParcel.referenceParcelType) {
                case parcelTypesEnum.AGRICULTURAL_PARCEL:
                    return null // User cannot add parcel under agricultural parcel
                case parcelTypesEnum.CADASTRAL_PARCEL:
                    return [ renderButton(parcelTypesEnum.AGRICULTURAL_PARCEL) ]
                case parcelTypesEnum.FARMERS_BLOCK:
                    return [ renderButton(parcelTypesEnum.AGRICULTURAL_PARCEL) ]
                case parcelTypesEnum.PHYSICAL_BLOCK:
                    return [ renderButton(parcelTypesEnum.AGRICULTURAL_PARCEL) ]
                default:
                    return null
            }
        } else {
            // No selected parcel, so list all available parcel types
            return [
                renderButton(parcelTypesEnum.AGRICULTURAL_PARCEL),
                renderButton(parcelTypesEnum.CADASTRAL_PARCEL),
                renderButton(parcelTypesEnum.FARMERS_BLOCK),
                renderButton(parcelTypesEnum.PHYSICAL_BLOCK),
                { type: "divider" } // TODO: Search button
            ]
        }
    }
)
*/
import moment from 'moment'
import { createSelector as createSelectorReselect } from 'reselect'
import { createSelector as createSelectorOrm } from 'redux-orm';
import { selectSeasonDetail } from 'season/reducers/seasonDetail'
import { selectParcelDetail } from 'parcel/reducers/parcelDetail'

import orm from 'entities/orm'

import {
    parcelTypesEnum,
    getButtonsByMap,
    agriculturalTypePropsLookup
} from 'parcel/constants'

export const selectSelectedParcel = (state) => selectParcelDetail(state).selectedParcel

export const getCurrentParcel = createSelectorOrm(
    [orm, selectSelectedParcel],
    (session, currentParcel) => {
        const { AgriculturalParcel, PhysicalBlock } = session
        let parcel = null
        if (AgriculturalParcel.idExists(currentParcel)) {
            parcel = AgriculturalParcel.withId(currentParcel).ref
        } else if (PhysicalBlock.idExists(currentParcel)) {
            parcel = PhysicalBlock.withId(currentParcel).ref
        }
        // TODO: Implement other models
        return parcel
    }
)

export const getAddParcelButtons = createSelectorReselect(
    [getCurrentParcel],
    (currentParcel) => {
        return getButtonsByMap(currentParcel)
    }
)