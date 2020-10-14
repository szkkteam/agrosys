import { Model } from "redux-orm";

export class Season extends Model {

    static parse(data) {
        // TODO: Do some parsing magic with relations
        return this.create(data)
    }
}

Season.modelName = "Season";