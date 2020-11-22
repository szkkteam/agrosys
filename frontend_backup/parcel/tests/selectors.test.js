import orm from 'entities/orm'
import {
    getCurrentParcel,
    getAddParcelButtons,
} from '../selectors.js'

import {
    physicalBlockType,
    agriculturalParcelType,
} from '../constants.js'

describe('parcel selectors', () => {

    let ormState
    let session
    let state

    beforeEach(done => {
        ormState = orm.getEmptyState()
        session = orm.mutableSession(ormState)

        state = {
            entities: ormState,            
        }

        done()
    })

    describe('getCurrentParcel', () => {

        it('should return with null', () => {
            const selectedParcel = null
            const expectedResult = null
            const selected = getCurrentParcel.resultFunc(session, selectedParcel)
            expect(selected).toEqual(expectedResult)
        })

        it('should return with null', () => {
            const selectedParcel = 1
            const expectedResult = null
            const selected = getCurrentParcel.resultFunc(session, selectedParcel)
            expect(selected).toEqual(expectedResult)
        })

        it('should return with model object', () => {
            const parcelsFixture = [
                {id: 1, title: 'Parcel 1', },
                {id: 2, title: 'Parcel 2', }
            ]
            
            const selectedParcel = 1
            const expectedResult = parcelsFixture[selectedParcel - 1]
            const { ReferenceParcel } = session
            parcelsFixture.forEach(parcel => ReferenceParcel.parse(parcel))

            const selected = getCurrentParcel.resultFunc(session, selectedParcel)
            expect(selected).toEqual(expectedResult)
        })

        it('should return with model object, mixed type', () => {
            const parcelsFixture = [
                {id: 1, title: 'Parcel 1', referenceParcelType: "AgriculturalParcel"},
                {id: 2, title: 'Parcel 2', referenceParcelType: "AgriculturalParcel" },
                {id: 3, title: 'Parcel 3', referenceParcelType: "PhysicalBlock"},
                {id: 4, title: 'Parcel 4', referenceParcelType: "PhysicalBlock"}
            ]
            
            const selectedParcel = 3
            const expectedResult = parcelsFixture[ selectedParcel - 1 ]
            const { ReferenceParcel } = session
            parcelsFixture.forEach(parcel => ReferenceParcel.parse(parcel))

            const selected = getCurrentParcel.resultFunc(session, selectedParcel)
            expect(selected).toEqual(expectedResult)
        })
    })
    
    describe('getAddParcelButtons', () => {
        it('should return with PhysicalBlock', () => {
            const selectedParcel = null
            const expectedResult = [physicalBlockType]
            const selected = getAddParcelButtons.resultFunc(selectedParcel)
            expect(selected).toEqual(expectedResult)
        })

        it('should return with AgriculturalParcel', () => {
            const selectedParcel = {id: 3, title: 'Parcel 3', referenceParcelType: "PhysicalBlock"}
            const expectedResult = [agriculturalParcelType]
            const selected = getAddParcelButtons.resultFunc(selectedParcel)
            expect(selected).toEqual(expectedResult)
        })

        it('should return with empty', () => {
            const selectedParcel = {id: 3, title: 'Parcel 3', referenceParcelType: "AgriculturalParcel"}
            const expectedResult = []
            const selected = getAddParcelButtons.resultFunc(selectedParcel)
            expect(selected).toEqual(expectedResult)
        })
    })

})