import orm from 'farmApp/schema'
import { production_wheat2020_mainCrop as fixture } from 'farmApp/fixtures'


describe('Test fieldProduction model', () => {
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
        const { Production, FieldProduction } = session
        Production.parse(fixture)

        //expect(UserCrop.count()).toEqual(1)     
        expect(Production.count()).toEqual(1)
        expect(FieldProduction.count()).toEqual(1)
    
    })
    
})
