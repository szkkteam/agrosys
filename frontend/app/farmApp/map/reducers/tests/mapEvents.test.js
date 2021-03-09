import reducer from '../mapEvents'
import {
    mapViewportChanged,
    mapEventClear,
    mapEventAdd,
} from '../../actions'

describe('mapView reducer', () => {

    it ('reducer initial state', () => {
        expect(reducer(undefined, {})).toEqual({
                events: [],
                viewPort: null,                
        })
    })

    it ('viewport has been changed', () => {
        const fixture = [0, 1]
        expect(
            reducer(undefined, mapViewportChanged(fixture))
        ).toEqual({
            events: [],
            viewPort: [0, 1],
        })
    })

    it ('new event has been added', () => {
        const fixture = { type: "fly-to-bounds", config: { bounds: [0, 1] } }
        expect(
            reducer(undefined, mapEventAdd(fixture))
        ).toEqual({
            events: [
                { type: "fly-to-bounds", config: { bounds: [0, 1] } }
            ],
            viewPort: null,
        })
    })

    it ('events has been cleared', () => {
        expect(
            reducer(undefined, mapEventClear())
        ).toEqual({
            events: [],
            viewPort: null,
        })
    })

})