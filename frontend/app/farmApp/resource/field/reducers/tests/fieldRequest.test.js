import reducer from '../fieldRequest'
import {
    listField as action,
} from '../../actions'

describe('fieldRequest reducer test', () => {

    it ('initial state', () => {
        expect(reducer(undefined, {})
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })
    
    it ('action request', () => {
        expect(reducer(undefined, action.request())
        ).toEqual({
            isLoading: true, 
            isLoaded: false,
            error: null
        })
    })

    it ('action success', () => {
        expect(reducer(undefined, action.success())
        ).toEqual({
            isLoading: false, 
            isLoaded: true,
            error: null
        })
    })

    it ('action fulfill', () => {
        expect(reducer({isLoading: true, isLoaded: false, error: null}, action.fulfill())
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })

})