import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

import {
    getSelectedParcel,
    getParcelsDenormalizedUnordered,
} from 'parcel/selectors'

import { selectParcelsById } from 'parcel/reducers/parcels'

import {
    selectSeasonsById
} from 'season/reducers/seasons'

const findLinksBetweenParcels = (selectedParcel, parcels) => {
    let links = []    
    const findStartPoint = (current) => {        
        let result = parcels.find(x => x.id == current.ancestorId)
        links.push({...current})
        if (result) { return findStartPoint(result) }
        else {  return current }
    }
    findStartPoint(selectedParcel)    
    return links
}

const contructSeasonList = (parcelLinks, parcelsById, seasonsById) => {
    return parcelLinks.map(current => {
        const seasonId = 'parentParcel' in current? 
            parcelsById[current.parentParcel].season :
            current.season

        Object.assign(current, { season: {...seasonsById[seasonId]} })
        return current    
    })
}

export const getSelectedParcelSeasons = createSelector(
    [
        getSelectedParcel,
        getParcelsDenormalizedUnordered,
        selectSeasonsById,
        selectParcelsById,
    ],
    (selectedParcel, parcels, seasonsById, parcelsById) => {
        if (!selectedParcel) return {data: [], isLoading: false}
        if (getParcelsDenormalizedUnordered.isLoading) return {data: [], isLoading: true}
        return {data: contructSeasonList(findLinksBetweenParcels(selectedParcel, [...parcels.data]), parcelsById, seasonsById), isLoading: false}
    }
)