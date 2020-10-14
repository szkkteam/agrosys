import { Model } from "redux-orm";
import { listSeasonParcel, createParcel, updateParcel } from 'parcel/actions'

export class AgriculturalParcel extends Model {

    static parse(data) {
        // TODO: Do some parsing magic with relations
        return this.create(data)
    }
}

AgriculturalParcel.modelName = "AgriculturalParcel";