import orm from 'entities/orm'
//import { PhysicalBlock, AgriculturalParcel } from '../models'

describe('Test PhysicalBlock model', () => {
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

        const { PhysicalBlock } = session
        PhysicalBlock.parse(fixture)
        expect(PhysicalBlock.count()).toEqual(1)     
    
    })
})


describe('Test AgriculturalParcel model', () => {
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

        const { AgriculturalParcel } = session
        AgriculturalParcel.parse(fixture)
        expect(AgriculturalParcel.count()).toEqual(1)     
    
    })
})