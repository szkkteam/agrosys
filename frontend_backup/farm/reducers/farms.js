import orm from 'entities/orm'
import { listFarms } from 'farm/actions'

export const KEY = 'farms'

const initialState = {
}

export default function(state = initialState, action) {
    //const session = orm.session(state)
    const { type, payload } = action
    const { farms } = payload || []
    /*
    switch(type) {

        case listFarms.SUCCESS:
            const { Farm } = session
            farms.forEach(farm => Farm.parse(farm))
            break
        default:
            break    
    }
    return session.state
    */
   return state
}

export const selectFarms = (state) => state[KEY]
export const selectSelectedFarm = (state) => null