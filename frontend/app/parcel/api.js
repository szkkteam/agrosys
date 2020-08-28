import { get, post, patch, put, delete_ } from 'utils/request'
import { farm } from 'api'


function seasonParcel(uri) {
  return farm(`/seasons${uri}`)
}

function parcel(uri) {
    return farm(`/parcels${uri}`)
}

function group(uri) {
    return farm(`/groups${uri}`)
}

export default class Parcel {

    /**
     * Season - Parcel
     */
    static listSeasonParcels(seasonData) {
        return get(seasonParcel(`/${seasonData.id}/parcels`))
    }

    static createSeasonParcels(seasonData, payload) {
        return post(seasonParcel(`/${seasonData.id}/parcels`), payload)
    }
        
    static assignSeasonParcel(seasonData, parcelData) {
        return put(seasonParcel(`/${seasonData.id}/parcels/${parcelData.id}`))
    }

    static removeSeasonParcel(seasonData, parcelData) {
        return delete_(seasonParcel(`/${seasonData.id}/parcels/${parcelData.id}`))
    }

    /**
     * Parcel
     */
    static updateParcel(parcelData, payload) {
        return put(parcel(`/${parcelData.id}`), payload)
    }

    static getParcel(parcelData) {
        return get(parcel(`/${parcelData.id}`))
    }

    static deleteParcel(parcelData) {
        return get(parcel(`/${parcelData.id}`))
    }

    /**
     * Group - Parcel
     */
    static listGroupParcel(groupDate) {
        return get(group(`/${groupDate.id}/parcels`))
    }

    static createGroupParcels(groupDate) {
        return post(group(`/${groupDate.id}/parcels`))
    }
        
    static assignGroupParcel(groupDate, parcelData) {
        return put(group(`/${groupDate.id}/parcels/${parcelData.id}`))
    }

    static removeGroupParcel(groupDate, parcelData) {
        return delete_(group(`/${groupDate.id}/parcels/${parcelData.id}`))
    }

}
