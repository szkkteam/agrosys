import {
    MAP_VIEWPORT_CHANGED,
    MAP_EVENT_ADD,
    MAP_EVENT_CLEAR,
    MAP_OVERLAY_TOOLTIP_SHOW,
    MAP_OVERLAY_TOOLTIP_HIDE,

    mapViewportChanged,
    mapEventAdd,
    mapEventClear,
    mapOverlayTooltipShow,
    mapOverlayTooltipHide
} from '../actions'


describe('Map actions', () => {

    describe('mapViewport', () => {
        it('mapViewport - CHANGED', () => {
            const fixture = [0, 1]
            const expected = {payload: {bounds: fixture}, type: MAP_VIEWPORT_CHANGED}

            expect(mapViewportChanged(fixture)).toEqual(expected)
        })
    })

    describe('mapEvents', () => {
        it('mapEvents - ADD_EVENT', () => {
            const fixture = { type: "fly-to-bounds", config: { bounds: [0, 1] } }
            const expected = {payload: { event: fixture }, type: MAP_EVENT_ADD}

            expect(mapEventAdd(fixture)).toEqual(expected)
        })

        it('mapEvents - CLEAR_EVENT', () => {
            const expected = {payload: null, type: MAP_EVENT_CLEAR}

            expect(mapEventClear()).toEqual(expected)
        })
    })

    describe('mapOverlay', () => {
        it('mapOverlay - TOOLTIP SHOW', () => {
            const fixture = null
            const expected = {payload: {bounds: fixture}, type: MAP_OVERLAY_TOOLTIP_SHOW}

            expect(mapOverlayTooltipShow(fixture)).toEqual(expected)
        })

        it('mapOverlay - TOOLTIP HIDE', () => {
            const fixture = null
            const expected = {payload: {bounds: fixture}, type: MAP_OVERLAY_TOOLTIP_HIDE}

            expect(mapOverlayTooltipHide(fixture)).toEqual(expected)
        })
    })

})