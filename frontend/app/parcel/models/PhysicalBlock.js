import { Model } from "redux-orm";

export class PhysicalBlock extends Model {
    static parse(data) {
        // TODO: Do some parsing magic with relations
        return this.create(data)
    }
}

PhysicalBlock.modelName = "PhysicalBlock";