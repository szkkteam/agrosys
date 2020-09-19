import { createSelector } from 'reselect'


import {
    deNormalizeSeasons,
} from 'season/schemas'


import {
    selectParcelsById,
} from 'parcel/reducers/parcels'

import {
    selectAgriculturalTypesbyId,
} from 'reference/reducers/agriculturalTypes'

import {
    selectSoilsTypesbyId,
} from 'reference/reducers/soilTypes'


import {
    selectSeasonsIds,
    selectSeasonsById,
    selectSeasonsIsLoading,
    selectSelectedSeasonId
} from 'season/reducers/seasons'


export const getSelectedSeason = createSelector(
    [
        selectSelectedSeasonId,
        selectSeasonsById,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById
    ],
    (selectedSeasonId, seasons, soilTypes, agriculturalTypes, parcels) => {
        return selectedSeasonId? deNormalizeSeasons({ ids: [selectedSeasonId], ...{entities: {parcels, seasons, soilTypes, agriculturalTypes}}})[0] : null
    }
)


export const getSeasonsDenormalized = createSelector(
    [
        selectSeasonsIds,
        selectSeasonsById,
        selectSoilsTypesbyId,
        selectAgriculturalTypesbyId,
        selectParcelsById,
        selectSeasonsIsLoading
    ],
    (seasonIds, seasons, soilTypes, agriculturalTypes, parcels, isLoading) => {
        //console.log("getSelectedSeasonParcelsTreeDenormalized-parcelIds: ", parcelIds)
        //console.log("getSelectedSeasonParcelsTreeDenormalized-entities: ", {entities: {parcels, soilTypes, agriculturalTypes}})
        // Filter out the selected season id
        const denormalized = deNormalizeSeasons({ ids: seasonIds, ...{entities: {seasons, parcels, soilTypes, agriculturalTypes}}})
        return {
            data: denormalized,
            isLoading: denormalized.length? false : isLoading
        }
    }
)