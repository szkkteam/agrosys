import reducer from '../mapOverlays'
import {
    mapOverlayTooltipShow,
    mapOverlayTooltipHide,
} from '../../actions'

describe('mapOverlay reducer', () => {

    it ('reducer initial state', () => {
        expect(reducer(undefined, {})).toEqual({
                tooltipShow: true,
        })
    })

    it ('Tooltip overlay show', () => {
        expect(
            reducer(undefined, mapOverlayTooltipShow())
        ).toEqual({
            tooltipShow: true
        })
    })

    it ('Tooltip overlay hide', () => {
        expect(
            reducer(undefined, mapOverlayTooltipHide())
        ).toEqual({
            tooltipShow: true,
        })
    })


})