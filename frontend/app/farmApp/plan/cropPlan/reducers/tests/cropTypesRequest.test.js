import reducer from '../cropPlanRequest'
import {
    listCropPlan,
} from '../../actions'

describe('cropPlanRequestReducer reducer test', () => {

    it ('initial state', () => {
        expect(reducer(undefined, {})
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })
    
    it ('action request', () => {
        expect(reducer(undefined, listCropPlan.request())
        ).toEqual({
            isLoading: true, 
            isLoaded: false,
            error: null
        })
    })

    it ('action success', () => {
        expect(reducer(undefined, listCropPlan.success())
        ).toEqual({
            isLoading: false, 
            isLoaded: true,
            error: null
        })
    })

    it ('action fulfill', () => {
        expect(reducer({isLoading: true, isLoaded: false, error: null}, listCropPlan.fulfill())
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })

})