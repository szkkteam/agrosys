import { createSelector } from 'reselect'

import { selectMapOverlays } from '../reducers/mapOverlays'


export default createSelector(
    selectMapOverlays,
    (mapOverlays) => {
        if (!mapOverlays) return false
        const { tooltipShow } = mapOverlays
        // TODO: Default?
        
        return tooltipShow
    }
)
