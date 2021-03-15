import orm from 'farmApp/schema'
import { userCrop_wheat as fixture } from 'farmApp/fixtures'
import { createSeason } from 'farmApp/cropProduction/season/actions'

describe('Test userCrop model', () => {
    // This will be the initial state.
    let state
    // This will be a Session instance with the initial data.
    let session

    beforeEach(done => {
        state = orm.getEmptyState()
        session = orm.mutableSession(state)

        const { UserCrop } = session
        UserCrop.parse(fixture)

        done()
    })

    it('parse simple from json', () => {
        const { UserCrop, CropType, Season } = session
        
        expect(UserCrop.count()).toEqual(1)     
        expect(CropType.count()).toEqual(1)
        expect(Season.count()).toEqual(1)
    
    })
    /*
    it('createSeason action success', () => {
        const { UserCrop, CropType, Season } = session
        Season.parse({id: 999, title: "new season"})
        //createSeason.success({season: {id: 999, title: "new season"}, userCropId: 1})
        //expect(Season.withId(999).count()).toEqual(1)
        console.debug("UserCrop.withId(1).seasons: ", UserCrop.withId(1).seasons)
        UserCrop.withId(1).seasons.add(999)
    })
    */
    /*
    it('add season', () => {
        const { UserCrop, CropType, Season } = session
        const newSeason = { id: 999, title: 'new season'}
        const { ref } = UserCrop.first().toRefArray()[0]
        const userCrop = {...ref}
        UserCrop

    })
    */
})
