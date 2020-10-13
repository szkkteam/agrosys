import { Model } from "redux-orm";

/**
 * Model: Physical Block
 */
export class PhysicalBlock extends Model {
    static parse(data) {
        // TODO: Do some parsing magic with relations
        return this.create(data)
    }
}

PhysicalBlock.modelName = "PhysicalBlock";

/**
 * Model: Agricultural Parcel
 */
export class AgriculturalParcel extends Model {
    static parse(data) {
        // TODO: Do some parsing magic with relations
        return this.create(data)
    }
}

AgriculturalParcel.modelName = "AgriculturalParcel";