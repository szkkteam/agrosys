import {Model, fk, attr} from "redux-orm";
import { 
    listSeasons,
} from 'season/actions'

export class Season extends Model {

    static get fields() {
        return {
            id: attr(),
            farm: fk({
                to: 'Farm',
                as: 'farm',
                relatedName: 'seasons',
            }),
            //seasons: fk("Season")
        }
    }
    
    static reducer(action, Season, session) {
        const { type, payload } = action
        const { seasons } = payload || []
        switch(type) {
    
            case listSeasons.SUCCESS:
                seasons.forEach(season => Season.parse(season))
                break
            default:
                break    
        }
        return session.state
    }

    static parse(data) {
        const { ReferenceParcel } = this.session
        let clonedData = {
            ...data,
            parcels: data.parcels && data.parcels.map(parcel => ReferenceParcel.parse({...parcel, season: data.id}))
        }
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

Season.modelName = "Season";