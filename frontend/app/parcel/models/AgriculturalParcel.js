import {Model, fk, attr} from "redux-orm";
import { ReferenceParcel } from './ReferenceParcel'
import { listSeasonParcel, createParcel, updateParcel } from 'parcel/actions'

export class AgriculturalParcel extends ReferenceParcel {

    static parse(data) {
        // TODO: Do some parsing magic with relations
        return this.create(data)
    }
}

AgriculturalParcel.modelName = "AgriculturalParcel";
AgriculturalParcel.fields = {
    base: fk({
        to: 'ReferenceParcel',
        as: 'base',
        //relatedName: 'parcels',
    }),
}