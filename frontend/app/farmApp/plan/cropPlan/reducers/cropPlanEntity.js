import schema from 'farmApp/schema'
import { listCropPlan } from '../actions'

export default function(action, CropPlan, session) {
    const { type, payload } = action
    const { cropPlans } = payload || []
    switch(type) {
    
        case listCropPlan.SUCCESS:
            cropPlans.forEach(cropPlan => CropPlan.parse(cropPlan))
            break
        default:
            break    
    }
    return session.state
}