import reducer from '../taskRequest'
import {
    listTask,
} from '../../actions'

describe('taskRequestReducer reducer test', () => {

    it ('initial state', () => {
        expect(reducer(undefined, {})
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })
    
    it ('action request', () => {
        expect(reducer(undefined, listTask.request())
        ).toEqual({
            isLoading: true, 
            isLoaded: false,
            error: null
        })
    })

    it ('action success', () => {
        expect(reducer(undefined, listTask.success())
        ).toEqual({
            isLoading: false, 
            isLoaded: true,
            error: null
        })
    })

    it ('action fulfill', () => {
        expect(reducer({isLoading: true, isLoaded: false, error: null}, listTask.fulfill())
        ).toEqual({
            isLoading: false, 
            isLoaded: false,
            error: null
        })
    })

})