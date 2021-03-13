import { bindActionCreators } from 'redux'

export const MAP_VIEWPORT_CHANGED = 'map/VIEWPORT_CHANGED'
export const MAP_EVENT_ADD = 'map/EVENT_ADD'
export const MAP_EVENT_CLEAR = 'map/EVENT_CLEAR'
export const MAP_OVERLAY_TOOLTIP_SHOW = 'map/OVERLAY_TOOLTIP_SHOW'
export const MAP_OVERLAY_TOOLTIP_HIDE = 'map/OVERLAY_TOOLTIP_HIDE'

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

export const mapOverlayTooltipShow = () => {
    return ({
        type: MAP_OVERLAY_TOOLTIP_SHOW,
        payload: null,
    })
}

export const mapOverlayTooltipHide = () => {
    return ({
        type: MAP_OVERLAY_TOOLTIP_HIDE,
        payload: null,
    })
}