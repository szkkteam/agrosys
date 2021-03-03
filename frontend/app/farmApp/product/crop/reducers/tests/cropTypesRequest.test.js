import cropTypeRequestReducer from '../cropTypeRequest'
import {
    listCropType,
} from '../../actions'

describe('cropTypeRequestReducer reducer test', () => {

    it ('initial state', () => {
        expect(cropTypeRequestReducer(undefined, {})
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })
    
    it ('action request', () => {
        expect(cropTypeRequestReducer(undefined, listCropType.request())
        ).toEqual({
            isLoading: true, 
            isLoaded: false,
            error: null
        })
    })

    it ('action success', () => {
        expect(cropTypeRequestReducer(undefined, listCropType.success())
        ).toEqual({
            isLoading: false, 
            isLoaded: true,
            error: null
        })
    })

    it ('action fulfill', () => {
        expect(cropTypeRequestReducer({isLoading: true, isLoaded: false, error: null}, listCropType.fulfill())
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })

})