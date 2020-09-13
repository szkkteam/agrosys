import { createSelector } from 'reselect'

import {
    deNormalizeAgriculturalTypes,
    deNormalizeSoilTypes
} from 'reference/schemas'

import {
    selectAgriculturalTypesIds,
    selectAgriculturalTypesbyId
} from 'reference/reducers/agriculturalTypes'

import {
    selectSoilsTypeIds,
    selectSoilsTypesbyId,
} from 'reference/reducers/soilTypes'

import {
    selectSpecificProductIds,
    selectSpecificProductsbyId
} from 'reference/reducers/specificProducts'

export const getAgriculturalTypes = createSelector(
    [
        selectAgriculturalTypesIds,
        selectAgriculturalTypesbyId,
    ],
    (ids, agriculturalTypes) => {
        console.log("ids: ", ids)
        console.log("agriculturalTypes: ", agriculturalTypes)
        return deNormalizeAgriculturalTypes({ ids , ...{entities: {agriculturalTypes}}})
    }
)

export const getSoilTypes = createSelector(
    [
        selectSoilsTypeIds,
        selectSoilsTypesbyId,
    ],
    (soilTypeIds, soilTypes) => {
        return deNormalizeSoilTypes({ ids: soilTypeIds, ...{entities: {soilTypes}}})
    }
)

export const getSpecificProducts = createSelector(
    [
        selectSpecificProductIds,
        selectSpecificProductsbyId
    ],
    (specificProductIds, specificProducts) => {
        //return deNormalizeSoilTypes({ ids: soilTypeIds, ...{entities: {soilTypes}}})
        return []
    }
)