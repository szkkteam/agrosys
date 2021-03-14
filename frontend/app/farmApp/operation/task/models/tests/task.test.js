import orm from 'farmApp/schema'
import { 
    cropPlan_winterWheat2020 as fixture1,
} from 'farmApp/fixtures'

describe('Test CropPlan model', () => {
    // This will be the initial state.
    let state
    // This will be a Session instance with the initial data.
    let session

    beforeEach(done => {
        state = orm.getEmptyState()
        session = orm.mutableSession(state)

        done()
    })

    it('parse simple from json', () => {

        const { CropPlan, Task } = session
        CropPlan.parse(fixture1)
        
        expect(Task.count()).toEqual(3)     
        expect(CropPlan.count()).toEqual(1)     
    
    })
   
})
