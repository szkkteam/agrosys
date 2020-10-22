import orm from 'entities/orm'
import { parcelTypesEnum } from 'parcel/constants'
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

        it('parse mixed type from json - FarmersBlock', () => {
            const fixture = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.FARMERS_BLOCK }

            const { ReferenceParcel, FarmersBlock } = session
            ReferenceParcel.parse(fixture)
            expect(FarmersBlock.count()).toEqual(1)     
        })

        it('parse mixed type from json - AgriculturalParcel', () => {
            const fixture = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }

            const { ReferenceParcel, AgriculturalParcel } = session
            ReferenceParcel.parse(fixture)
            expect(AgriculturalParcel.count()).toEqual(1)     
        })

        it('parse mixed type from json - PhysicalBlock', () => {
            const fixture = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK }

            const { ReferenceParcel, PhysicalBlock } = session
            ReferenceParcel.parse(fixture)
            expect(PhysicalBlock.count()).toEqual(1)     
        })
 
        it('parce mixed types from json', () => {
            const farm = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.FARMERS_BLOCK }
            const parcel = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.AGRICULTURAL_PARCEL }
            const physical = { id: 1, title: 'random title', referenceParcelType: parcelTypesEnum.PHYSICAL_BLOCK }
            const fixture = [farm, parcel, physical]
 
            const { ReferenceParcel, FarmersBlock, PhysicalBlock, AgriculturalParcel } = session
            fixture.forEach(data => ReferenceParcel.parse(data))
            expect(PhysicalBlock.count()).toEqual(1)   
            expect(AgriculturalParcel.count()).toEqual(1)    
            expect(FarmersBlock.count()).toEqual(1)        
        })
        
    })
})