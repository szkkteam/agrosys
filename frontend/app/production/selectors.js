import { createSelector } from 'reselect'
import memoize from 'lodash.memoize'

import {
    getSelectedParcel,
    getParcelsDenormalizedUnordered,
} from 'parcel/selectors'

import {
    getSeasonsDenormalized
} from 'season/selectors'

const findLinksBetweenParcels = (selectedParcel, parcels) => {
    let links = []
    const findStartPoint = (current) => {        
        let result = parcels.find(x => x.id == current.ancestorId)
        links.push(current)
        if (result) { return findStartPoint(result) }
        else {  return current }
    }
    findStartPoint(selectedParcel)    
    return links
}

const contructSeasonList = (selectedParcel, parcels, seasons) => {
    const parcelLinks = findLinksBetweenParcels(selectedParcel, parcels)

    return parcelLinks.map(current => {
        let parent = current
        let retVal = {...current}
        // If this is a child selection, find the parent
        parcels.map(p => p.parcels && p.parcels.find(x => { if (x.id == selectedParcel.id) { parent = p } }) )
        seasons.map( x => {
            const season = x.referenceParcels.find( i => {
                return i.id == parent.id 
            })
            if (season) Object.assign(retVal, { season })
        })
        return retVal
    })
}

export const getSelectedParcelSeasons = createSelector(
    [
        getSelectedParcel,
        getParcelsDenormalizedUnordered,
        getSeasonsDenormalized,
    ],
    (selectedParcel, parcels, seasons) => {
        if (!selectedParcel) return {data: [], isLoading: false}
        if (getParcelsDenormalizedUnordered.isLoading || getSeasonsDenormalized.isLoading) return {data: [], isLoading: true}
        return {data: contructSeasonList(selectedParcel, parcels.data, seasons.data), isLoading: false}
    }
)