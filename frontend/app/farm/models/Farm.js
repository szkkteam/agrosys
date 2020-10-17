import { Model } from "redux-orm";
import { listFarms } from 'farm/actions'

export class Farm extends Model {

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
        // TODO: Do some parsing magic with relations
        const { region, role, seasons, ...rest } = data
        let c 
        console.log("data: ", rest)
        try {
            c = this.upsert(rest)
        } catch(e) {
            console.log(e)            
        }
        return c
    }
}

Farm.modelName = "Farm";