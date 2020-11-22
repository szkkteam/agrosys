import {Model, fk, attr} from "redux-orm";
import { listFarms } from 'farm/actions'

export class Farm extends Model {

    static get fields() {
        return {
            id: attr(),
            //seasons: fk("Season")
        }
    }

    static reducer(action, Farm, session) {
        const { type, payload } = action
        const { farms } = payload || []
        switch(type) {
    
            case listFarms.SUCCESS:
                farms.forEach(farm => Farm.parse(farm))
                break
            default:
                break    
        }
        return session.state
    }

    static parse(data) {
        const { Season } = this.session
        let clonedData = {
            ...data,
            seasons: data.seasons && data.seasons.map(season => Season.parse({...season, farm: data.id}))
        }
        //console.log("Cloned data: ", clonedData)
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

Farm.modelName = "Farm";