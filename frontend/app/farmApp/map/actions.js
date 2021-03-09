import { bindActionCreators } from 'redux'

export const MAP_VIEWPORT_CHANGED = 'map/VIEWPORT_CHANGED'
export const MAP_EVENT_ADD = 'map/EVENT_ADD'
export const MAP_EVENT_CLEAR = 'map/EVENT_CLEAR'

export const mapViewportChanged = (bounds) => {
    return ({
        type: MAP_VIEWPORT_CHANGED,
        payload: {
            bounds
        }
    })
}

export const mapEventAdd = (event) => {
    return ({
        type: MAP_EVENT_ADD,
        payload: {
            event
        }
    })
}

export const mapEventClear = () => {
    return ({
        type: MAP_EVENT_CLEAR,
        payload: null,
    })
}
