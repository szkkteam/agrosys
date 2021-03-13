import { createSelector } from 'reselect'

import { selectMapEvents } from '../reducers/mapEvents'


export default createSelector(
    selectMapEvents,
    (mapEvents) => {
        if (!mapEvents) return null
        const { viewPort } = mapEvents
        // TODO: Default?
        
        return viewPort
    }
)
