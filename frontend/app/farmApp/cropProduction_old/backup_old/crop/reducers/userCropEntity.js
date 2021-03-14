import schema from 'farmApp/schema'
import { listUserCrop, createUserCrop } from '../actions'

export default function(action, UserCrop, session) {
    const { type, payload } = action

    switch(type) {
    
        case listUserCrop.SUCCESS:
            const { userCrops } = payload || []
            userCrops.forEach(userCrop => UserCrop.parse(userCrop))
            break
        case createUserCrop.SUCCESS:
            const { userCrop } = payload || []
            UserCrop.parse(userCrop)
            break       
        default:
            break    
    }
    return session.state
}