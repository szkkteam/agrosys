import {Model, fk, attr} from "redux-orm";
import { ReferenceParcel } from './ReferenceParcel'

export class PhysicalBlock extends ReferenceParcel {
    static parse(data) {
        // TODO: Do some parsing magic with relations
        return this.create(data)
    }
}

PhysicalBlock.modelName = "PhysicalBlock";
PhysicalBlock.fields = {
    base: fk({
        to: 'ReferenceParcel',
        as: 'base',
        //relatedName: 'parcels',
    }),
}