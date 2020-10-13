import {
    mapViewport,
    mapEvents,
    mapEdit,
} from '../actions'


describe('Map actions', () => {

    describe('mapViewport', () => {
        it('mapViewport - CHANGED', () => {
            const fixture = {viewPortChange: [0, 1]}
            const expected = {payload: fixture, type: "map/VIEWPORT_CHANGED"}

            expect(mapViewport.changed(fixture)).toEqual(expected)
        })
    })

    describe('mapEvents', () => {
        it('mapEvents - ADD_EVENT', () => {
            const fixture = { eventRequest: { type: "fly-to-bounds", config: { bounds: [0, 1] } } }
            const expected = {payload: fixture, type: "map/EVENTS_ADD"}

            expect(mapEvents.add(fixture)).toEqual(expected)
        })

        it('mapEvents - CLEAR_EVENT', () => {
            const expected = {payload: undefined, type: "map/EVENTS_CLEAR"}

            expect(mapEvents.clear()).toEqual(expected)
        })
    })

    describe('mapEdit', () => {
        it('mapEdit - START', () => {
            const fixture = { initalValues: {area: 1, geometry: 2} }
            const expected = {payload: fixture, type: "map/EDIT_START"}

            expect(mapEdit.start(fixture)).toEqual(expected)
        })

        it('mapEdit - CANCEL', () => {
            const expected = {payload: undefined, type: "map/EDIT_CANCEL"}

            expect(mapEdit.cancel()).toEqual(expected)
        })

        it('mapEdit - SUBMIT', () => {
            const expected = {payload: undefined, type: "map/EDIT_SUBMIT"}

            expect(mapEdit.submit()).toEqual(expected)
        })
    })

})