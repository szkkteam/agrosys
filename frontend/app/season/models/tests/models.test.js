import orm from 'entities/orm'
import { parcelTypesEnum } from 'parcel/constants'
//import { PhysicalBlock, AgriculturalParcel } from '../models'

describe('Test Season model', () => {
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

        const { Season } = session
        Season.parse(fixture)
        expect(Season.count()).toEqual(1)     
    
    })

    it('parse season with mixed types', () => {
        const farm = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.FARMERS_BLOCK }
        const parcel = { id: 2, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
        const physical = { id: 3, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK }
        const parcels = [farm, parcel, physical]
        const fixture = { id: 1, title: 'random title', parcels }

        const { Season, FarmersBlock, PhysicalBlock, AgriculturalParcel } = session
        Season.parse(fixture)
        expect(PhysicalBlock.count()).toEqual(1)   
        expect(AgriculturalParcel.count()).toEqual(1)    
        expect(FarmersBlock.count()).toEqual(1)        
    })

    it('parse multiple season with mixed types', () => {
        const farm = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.FARMERS_BLOCK }
        const parcel = { id: 2, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
        const physical = { id: 3, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK }
        const parcels1 = [parcel]
        const parcels2 = [farm, physical]
        const fixtures = [
            { id: 1, title: 'Season 1', parcels: parcels1 },
            { id: 2, title: 'Season 2', parcels: parcels2 },
        ]

        const currentSeason = 1
        const { Season, ReferenceParcel } = session
        fixtures.forEach(fixture => Season.parse(fixture))        
        const parcels = ReferenceParcel.filter({season: currentSeason}).count()
        expect(parcels).toEqual(1)
    })
    
})
