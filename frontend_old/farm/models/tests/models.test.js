import orm from 'entities/orm'
//import { PhysicalBlock, AgriculturalParcel } from '../models'

describe('Test Farm model', () => {
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
        const fixture = { id: 1, title: 'random title' }

        const { Farm } = session
        Farm.parse(fixture)
        expect(Farm.count()).toEqual(1)     
    
    })
})

