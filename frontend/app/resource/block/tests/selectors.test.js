import { 
    BLOCK_CREATE_OPTION_DRAW,
    BLOCK_CREATE_OPTION_UPLOAD_FILE,
    BLOCK_CREATE_OPTION_LPIS_MEPAR
} from '../constants'
import {
    getAvailableCreateOptions,
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

    describe('getAvailableCreateOptions', () => {

        it('should return with list of available options', () => {
            const result = {
                BLOCK_CREATE_OPTION_DRAW,
                BLOCK_CREATE_OPTION_UPLOAD_FILE,
                BLOCK_CREATE_OPTION_LPIS_MEPAR,
            }  
            const options = getAvailableCreateOptions.resultFunc(null)
            expect(options).toEqual(result)

        })

    })

})