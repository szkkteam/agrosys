import { createSelector } from 'reselect'

import { selectMapEvents } from '../reducers/mapEvents'


export default createSelector(
    selectMapEvents,
    (mapEvents) => {
        if (!mapEvents) return null
        const { events } = mapEvents
        if (events.length) {
            return events[events.length - 1]
        } else {
            return null
        }
    }
)
