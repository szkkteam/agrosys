import parcelDetailReducer from '../parcelDetail'
import {
    selectParcel,
} from '../../actions'

describe('parcel reducer test', () => {

    describe('parcelDetail reducer', () => {

        it ('reducer initial state', () => {
            expect(parcelDetailReducer(undefined, {})
            ).toEqual({
                selectedParcel: null, 
            })
        })

        it ('simple select parcel', () => {
            const fixture = 1
            expect(parcelDetailReducer(undefined, selectParcel(fixture))
            ).toEqual({
                selectedParcel: fixture,
            })
        })

        it ('select, deselect parcel', () => {
            const fixture = 1
            expect(parcelDetailReducer({selectedParcel: fixture}, selectParcel(fixture))
            ).toEqual({
                selectedParcel: null,
            })
        })
    })
    
})