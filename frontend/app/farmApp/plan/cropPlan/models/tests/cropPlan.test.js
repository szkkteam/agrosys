import orm from 'farmApp/schema'
import { 
    cropPlan_winterWheat2020 as fixture1,
    cropType_winterWheat as fixture2,
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

        const { CropPlan, CropType } = session
        CropPlan.parse(fixture1)
        
        expect(CropType.count()).toEqual(1)     
        expect(CropPlan.count()).toEqual(1)     
    
    })
   
})
