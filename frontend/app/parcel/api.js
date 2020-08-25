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
        return get(seasonParcel(`/${seasonData}/parcels`))
    }

    static createSeasonParcels(seasonData) {
        return post(seasonParcel(`/${seasonData}/parcels`))
    }
        
    static assignSeasonParcel(seasonData, parcelData) {
        return put(seasonParcel(`/${seasonData}/parcels/${parcelData}`))
    }

    static removeSeasonParcel(seasonData, parcelData) {
        return delete_(seasonParcel(`/${seasonData}/parcels/${parcelData}`))
    }

    /**
     * Parcel
     */
    static updateParcel(parcelData) {
        return put(parcel(`/${parcelData}`))
    }

    static getParcel(parcelData) {
        return get(parcel(`/${parcelData}`))
    }

    static deleteParcel(parcelData) {
        return get(parcel(`/${parcelData}`))
    }

    /**
     * Group - Parcel
     */
    static listGroupParcel(groupDate) {
        return get(group(`/${groupDate}/parcels`))
    }

    static createGroupParcels(groupDate) {
        return post(group(`/${groupDate}/parcels`))
    }
        
    static assignGroupParcel(groupDate, parcelData) {
        return put(group(`/${groupDate}/parcels/${parcelData}`))
    }

    static removeGroupParcel(groupDate, parcelData) {
        return delete_(group(`/${groupDate}/parcels/${parcelData}`))
    }

}
