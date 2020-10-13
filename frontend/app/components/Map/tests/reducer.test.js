import reducer from '../reducer'
import {
    mapViewport,
    mapEvents,
    mapEdit,
} from '../actions'

describe('map reducer', () => {

    it ('reducer initial state', () => {
        expect(reducer(undefined, {})).toEqual({
                events: [],
                viewPort: null,
                isEditing: false,
                editData: {}
        })
    })

    it ('viewport has been changed', () => {
        const fixture = {viewPortChange: [0, 1]}
        expect(
            reducer(undefined, mapViewport.changed(fixture))
        ).toEqual({
            events: [],
            viewPort: [0, 1],
            isEditing: false,
            editData: {}
        })
    })

    it ('new event has been added', () => {
        const fixture = { eventRequest: { type: "fly-to-bounds", config: { bounds: [0, 1] } } }
        expect(
            reducer(undefined, mapEvents.add(fixture))
        ).toEqual({
            events: [
                { type: "fly-to-bounds", config: { bounds: [0, 1] } }
            ],
            viewPort: null,
            isEditing: false,
            editData: {}
        })
    })

    it ('events has been cleared', () => {
        expect(
            reducer(undefined, mapEvents.clear())
        ).toEqual({
            events: [],
            viewPort: null,
            isEditing: false,
            editData: {}
        })
    })

    it ('draw has been started', () => {
        const fixture = { initalValues: {area: 1, geometry: 2} }
        expect(
            reducer(undefined, mapEdit.start(fixture))
        ).toEqual({
            events: [],
            viewPort: null,
            isEditing: true,
            editData: { area: 1, geometry: 2 }
        })
    })

    it ('draw has been cancelled', () => {
        expect(
            reducer(undefined, mapEdit.cancel())
        ).toEqual({
            events: [],
            viewPort: null,
            isEditing: false,
            editData: {}
        })
    })

    it ('draw has been submitted', () => {
        expect(
            reducer(undefined, mapEdit.submit())
        ).toEqual({
            events: [],
            viewPort: null,
            isEditing: false,
            editData: {}
        })
    })
})