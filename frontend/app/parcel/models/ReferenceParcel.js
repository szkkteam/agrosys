import {Model, fk, attr} from "redux-orm";
import { parcelTypesEnum } from 'parcel/constants'

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
        let clonedData = {
            ...data,
        }
        const { id, title, referenceParcelType } = clonedData
        switch(data.referenceParcelType) {
            case parcelTypesEnum.AGRICULTURAL_PARCEL: 
                const { AgriculturalParcel } = this.session
                this.upsert({id, title, referenceParcelType})
                return AgriculturalParcel.parse({...clonedData, base: clonedData.id})

            case parcelTypesEnum.CADASTRAL_PARCEL:
                break
            case parcelTypesEnum.FARMERS_BLOCK:
                const { FarmersBlock } = this.session
                return FarmersBlock.parse({...clonedData, base: clonedData.id})

            case parcelTypesEnum.PHYSICAL_BLOCK:
                const { PhysicalBlock } = this.session
                return PhysicalBlock.parse({...clonedData, base: clonedData.id})

            default:
                break                
        }
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

ReferenceParcel.modelName = "ReferenceParcel";
ReferenceParcel.fields = {
    id: attr(),
    season: fk({
        to: 'Season',
        as: 'season',
        //relatedName: 'parcels',
    }),
}