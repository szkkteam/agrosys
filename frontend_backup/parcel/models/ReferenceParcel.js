import {Model, fk, attr, many} from "redux-orm";
import { parcelTypesEnum } from 'parcel/constants'

export class ReferenceParcelRelation extends Model {}
ReferenceParcelRelation.modelName = "ReferenceParcelRelation"
ReferenceParcelRelation.fields = {
    block: fk({
        to: 'ReferenceParcel',
        as: 'blocks',
    }),
    parcel: fk({
        to: 'ReferenceParcel',
        as: 'parcels'
    })
}

export class ReferenceParcel extends Model {
    
    static reducer(action, ReferenceParcel, session) {
        const { type, payload } = action
        const { parcels } = payload || []
        switch(type) {
    
            /*
            case listSeasons.SUCCESS:
                seasons.forEach(season => Season.parse(season))
                break
            */
            default:
                break    
        }
        return session.state
    }

    static parse(data) {
        const { ReferenceParcel } = this.session
        let clonedData = {
            ...data,            
        }
        // Define the relations for sub parcels
        if (data.referenceParcelType != parcelTypesEnum.AGRICULTURAL_PARCEL) {
            const parcels = data.parcels && data.parcels.map(parcel => ReferenceParcel.parse({...parcel, block: clonedData.id}))
            Object.assign(clonedData, {parcels})
        }

        return this.upsert(clonedData)
    }
}

ReferenceParcel.modelName = "ReferenceParcel";
ReferenceParcel.fields = {
    id: attr(),
    season: fk({
        to: 'Season',
        as: 'season',
        relatedName: 'parcels',
    }),
    /* TODO: The real relation is many-to-many and in case of cadastrial parcel its possible to have multiple Ag.Parcel to be connected to multiple Cadastrial parcel
    parcels: many({
        to: 'ReferenceParcel',
        as: 'parcels',
        relatedName: 'blocks',
        trough: 'ReferenceParcelRelation'
    })*/
    parcels: fk({
        to: 'ReferenceParcel',
        as: 'parcels',
        relatedName: 'block',
    })

}