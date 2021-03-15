import userCropRequestReducer from '../userCropRequest'
import {
    listUserCrop,
} from '../../actions'

describe('userCropRequest reducer test', () => {

    it ('initial state', () => {
        expect(userCropRequestReducer(undefined, {})
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })
    
    it ('action request', () => {
        expect(userCropRequestReducer(undefined, listUserCrop.request())
        ).toEqual({
            isLoading: true, 
            isLoaded: false,
            error: null
        })
    })

    it ('action success', () => {
        expect(userCropRequestReducer(undefined, listUserCrop.success())
        ).toEqual({
            isLoading: false, 
            isLoaded: true,
            error: null
        })
    })

    it ('action fulfill', () => {
        expect(userCropRequestReducer({isLoading: true, isLoaded: false, error: null}, listUserCrop.fulfill())
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })

})