import schema from 'farmApp/schema'
import { listSeason, createSeason } from '../actions'

export default function(action, Season, session) {
    const { type, payload } = action

    switch(type) {
    
        case listSeason.SUCCESS:
            const { seasons } = payload || []
            seasons.forEach(season => Season.parse(season))
            break
        case createSeason.SUCCESS:
            const { season } = payload || []
            Season.parse(season)
        default:
            break    
    }
    return session.state
}