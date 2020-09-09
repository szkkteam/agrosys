import { createSelector } from 'reselect'

import {
    deNormalizeParcels
} from 'parcel/schemas'

import {
    selectParcels,
    selectSelectedParcelId,
    selectParcelsById,
    selectSelectedSeasonParcels,
    selectLastSeasonParcels,
} from 'parcel/reducers/parcels'

import {
    selectAgriculturalTypesbyId,
} from 'reference/reducers/agriculturalTypes'

import {
    selectSoilsTypesbyId,
} from 'reference/reducers/soilTypes'

import {
    parcelTypesEnum,
    agriculturalTypePropsLookup
} from 'parcel/constants'

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


export const getSelectedSeasonParcelsDenormalized = createSelector(
    [
        selectSelectedSeasonParcels,
        selectSelectedParcelId,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById
    ],
    (parcelIds, selectedParcelId, soilTypes, agriculturalTypes, parcels) => {
        // Filter out the selected season id
        return deNormalizeParcels({ ids: _.without(parcelIds, selectedParcelId), ...{entities: {parcels, soilTypes, agriculturalTypes}}})
    }
)

export const getSelectedSeasonParcelsGrouped = createSelector(
    [
        getSelectedSeasonParcelsDenormalized,
        selectAgriculturalTypesbyId
    ],
    (normalizedParcels, agriculturalTypes) => {
        // Sort the parcels based on the size    
        const sorted = sortBySize(normalizedParcels)
        return groupByAgriculturalType(sorted, agriculturalTypes)        
    }
)


export const getSelectedSeasonParcelsTreeDenormalized = createSelector(
    [
        selectSelectedSeasonParcels,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById
    ],
    (parcelIds, soilTypes, agriculturalTypes, parcels) => {
        console.log("getSelectedSeasonParcelsTreeDenormalized-parcelIds: ", parcelIds)
        console.log("getSelectedSeasonParcelsTreeDenormalized-entities: ", {entities: {parcels, soilTypes, agriculturalTypes}})
        // Filter out the selected season id
        return deNormalizeParcels({ ids: parcelIds, ...{entities: {parcels, soilTypes, agriculturalTypes}}})
    }
)


export const getLastSeasonParcelsTreeDenormalized = createSelector(
    [
        selectLastSeasonParcels,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById
    ],
    (parcelIds, soilTypes, agriculturalTypes, parcels) => {
        console.log("getSelectedSeasonParcelsTreeDenormalized-parcelIds: ", parcelIds)
        console.log("getSelectedSeasonParcelsTreeDenormalized-entities: ", {entities: {parcels, soilTypes, agriculturalTypes}})
        // Filter out the selected season id
        return deNormalizeParcels({ ids: parcelIds, ...{entities: {parcels, soilTypes, agriculturalTypes}}})
    }
)


export const getSelectedSeasonParcelsTree = createSelector(
    [getSelectedSeasonParcelsTreeDenormalized],
    (normalizedParcels) => {
        // Keep this log, because parcelTree is not updated at the first time
        console.log("getSelectedSeasonParcelsTree-normalizedParcels: ", normalizedParcels)
        return constructParcelTree(normalizedParcels)
    }
)


export const getLastSeasonParcelsTree = createSelector(
    [getLastSeasonParcelsTreeDenormalized],
    (normalizedParcels) => {
        // Keep this log, because parcelTree is not updated at the first time
        console.log("getSelectedSeasonParcelsTree-normalizedParcels: ", normalizedParcels)
        return constructParcelTree(normalizedParcels)
    }
)

export const getSelectedSiblingParcels = createSelector(    
    [
        selectSelectedParcelId, 
        selectParcels,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
    ],
    (selectedParcelId, parcelState, soilTypes, agriculturalTypes) => {
        // If no selected, return with empty list
        if (!selectedParcelId) return []
        let parent = selectedParcelId
        parcelState.ids.map((id) => 
            parcelState.byId[id].parcels.find(x => { if (x == selectedParcelId) { parent = id } }))

        // TODO: Maybe return with the siblings on the top level also and could be used for more purpose
        if (!parent) return []        
        const denormalized = deNormalizeParcels({ ids: _.without(parcelState.byId[parent].parcels, selectedParcelId), ...{entities: {parcels: parcelState.byId, soilTypes, agriculturalTypes}}})    
        // Sort the parcels based on the size    
        return sortBySize(denormalized)
    }
)



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
