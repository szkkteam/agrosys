import orm from 'entities/orm'
import { parcelTypesEnum } from 'parcel/constants'
//import { PhysicalBlock, AgriculturalParcel } from '../models'

describe('Test ReferenceParcel model', () => {
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

        const { ReferenceParcel } = session
        ReferenceParcel.parse(fixture)
        expect(ReferenceParcel.count()).toEqual(1)     
    
    })

    it('parce mixed types from json', () => {
        const farm = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.FARMERS_BLOCK }
        const parcel = { id: 2, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
        const physical = { id: 3, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK }
        const fixture = [farm, parcel, physical]

        const { ReferenceParcel } = session
        fixture.forEach(data => ReferenceParcel.parse(data))
        expect(ReferenceParcel.count()).toEqual(3)        
    })

    it('parce mixed types with sub parcels', () => {
        const parcel1 = { id: 4, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
        const parcel2 = { id: 5, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
        const parcel3 = { id: 6, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
        const farm = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.FARMERS_BLOCK }
        const physical1 = { id: 2, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK, parcels: [parcel1, parcel2]}
        const physical2 = { id: 3, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK, parcels: [parcel3] }
        const fixture = [physical1, physical2, farm]

        const { ReferenceParcel } = session
        fixture.forEach(data => ReferenceParcel.parse(data))
        expect(ReferenceParcel.count()).toEqual(6)        
        fixture.forEach(data => {
            expect(ReferenceParcel.filter({block: data.id}).count()).toEqual(data.parcels? data.parcels.length : 0)
        })
    })
})
