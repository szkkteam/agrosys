import schema from 'farmApp/schema'
import { listTask } from '../actions'

export default function(action, Task, session) {
    const { type, payload } = action
    const { tasks } = payload || []
    switch(type) {
    
        case listTask.SUCCESS:
            tasks.forEach(task => Task.parse(task))
            break
        default:
            break    
    }
    return session.state
}