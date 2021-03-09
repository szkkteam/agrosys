import {
    MAP_VIEWPORT_CHANGED,
    MAP_EVENT_ADD,
    MAP_EVENT_CLEAR,

    mapViewportChanged,
    mapEventAdd,
    mapEventClear
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

})