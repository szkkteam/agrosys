import { Model } from "redux-orm";
import { ReferenceParcel } from './ReferenceParcel'

export class FarmersBlock extends ReferenceParcel {
    static parse(data) {
        // TODO: Do some parsing magic with relations
        return this.create(data)
    }
}

FarmersBlock.modelName = "FarmersBlock";