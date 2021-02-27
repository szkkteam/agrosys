import orm from 'farmApp/schema'

describe('Test CropType model', () => {
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
        const fixture = { id: 1, title: 'random title', category: 'category' }

        const { CropType } = session
        CropType.parse(fixture)
        expect(CropType.count()).toEqual(1)     
    
    })
   
})
