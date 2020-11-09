import { BLOCK_CREATE_OPTION_ORDER } from '../constants'
import {
    getAvailableOptions,
} from '../selectors'

describe('block selectors', () => {
    /*
    let ormState
    let session
    let state

    beforeEach(done => {
        ormState = orm.getEmptyState()
        session = orm.mutableSession(ormState)

        state = {
            entities: ormState,            
        }

        done()
    })
    */

    describe('getAvailableOptions', () => {

        it('should return with list of available options', () => {
            const available = getAvailableOptions()
            expect(available).toEqual(BLOCK_CREATE_OPTION_ORDER)
        })

    })

})