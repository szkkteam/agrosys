import schema from 'farmApp/schema'
import { listCropType } from '../actions'

export default function(action, CropType, session) {
    const { type, payload } = action
    const { cropTypes } = payload || []
    switch(type) {
    
        case listCropType.SUCCESS:
            cropTypes.forEach(cropType => CropType.parse(cropType))
            break
        default:
            break    
    }
    return session.state
}