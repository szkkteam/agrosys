import cropTypesRequestReducer from '../cropTypesRequest'
import {
    listCropType,
} from '../../actions'

describe('cropTypesRequest reducer test', () => {

    it ('initial state', () => {
        expect(cropTypesRequestReducer(undefined, {})
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })
    
    it ('action request', () => {
        expect(cropTypesRequestReducer(undefined, listCropType.request())
        ).toEqual({
            isLoading: true, 
            isLoaded: false,
            error: null
        })
    })

    it ('action success', () => {
        expect(cropTypesRequestReducer(undefined, listCropType.success())
        ).toEqual({
            isLoading: false, 
            isLoaded: true,
            error: null
        })
    })

    it ('action fulfill', () => {
        expect(cropTypesRequestReducer({isLoading: true, isLoaded: false, error: null}, listCropType.fulfill())
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })

})