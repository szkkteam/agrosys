import schema from 'farmApp/schema'
import {
    getFieldIds,
    getField,
    getSelectedFieldsArea
} from '../selectors.js'

describe('field selectors', () => {
    const requestFixtures = {
        isLoading: false,
        error: null,
    }

    let ormState
    let session
    let state

    beforeEach(done => {
        ormState = schema.getEmptyState()
        session = schema.mutableSession(ormState)

        state = {
            entities: ormState,            
        }

        done()
    })
    /*
    describe('getCropTypes', () => {

        it('should return with empty objects', () => {

            const expectedResult = {
                payload: [],
                isLoading: false,
                error: null
            }
            const selected = getCropTypes.resultFunc(session, requestFixtures)
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with model data', () => {
            const cropTypesFixture = [
                {id: 1, title: 'Crop 1', category: 'cat1'},
                {id: 2, title: 'Crop 2', category: 'cat1'}]

            const expectedResult = {
                payload: cropTypesFixture,
                isLoading: false,
                error: null,
            }
            const { CropType } = session
            cropTypesFixture.forEach(cropType => CropType.parse(cropType))

            const selected = getCropTypes.resultFunc(session, requestFixtures)
            expect(selected).toEqual(expectedResult)
        })
        
    })
    */

    describe('getFieldIds', () => {

        it('should return with empty objects', () => {

            const expectedResult = {
                payload: [],
                isLoading: false,
                error: null
            }
            const selected = getFieldIds.resultFunc(session, requestFixtures)
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with model ids', () => {
            const fixture = [
                {id: 1, title: "Tábla 1", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
                {id: 2, title: "Tábla 2", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
            ]

            const expectedResult = {
                payload: [1, 2],
                isLoading: false,
                error: null,
            }
            const { Field } = session
            fixture.forEach(x => Field.parse(x))

            const selected = getFieldIds.resultFunc(session, requestFixtures)
            expect(selected).toEqual(expectedResult)
        })
        
    })
    /*
    describe('getUserCrops', () => {

        it('should return with empty objects', () => {

            const expectedResult = {
                payload: [],
                isLoading: false,
                error: null
            }
            const selected = getUserCrops.resultFunc(session, requestFixtures)
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with model ids', () => {
            const fixture = [
                {id: 1, title: "Búza", cropType: {id: 1, title: "Téli búza", category: "Takarmány növény"}},
                {id: 2, title: "Búza", cropType: {id: 1, title: "Téli búza", category: "Takarmány növény"}},
            ]

            const expectedFixture = [
                {id: 1, title: "Búza", cropType: 1},
                {id: 2, title: "Búza", cropType: 1},
            ]

            const expectedResult = {
                payload: expectedFixture,
                isLoading: false,
                error: null,
            }
            const { UserCrop } = session
            fixture.forEach(x => UserCrop.parse(x))

            const selected = getUserCrops.resultFunc(session, requestFixtures)
            expect(selected).toEqual(expectedResult)
        })
        
    })
    */

    describe('getField', () => {

        it('should return with null object', () => {

            const expectedResult = {
                payload: null,
                isLoading: false,
                error: null
            }
            const fnc = getField()
            const selected = fnc.resultFunc(session, requestFixtures, 1)
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with model instance', () => {
            const fixture = [
                {id: 1, title: "Tábla 1", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
                {id: 2, title: "Tábla 2", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
            ]

            const expectedFixture = fixture[0]

            const expectedResult = {
                payload: expectedFixture,
                isLoading: false,
                error: null,
            }
            const { Field } = session
            fixture.forEach(x => Field.parse(x))

            const fnc = getField()
            const selected = fnc.resultFunc(session, requestFixtures, 1)
            expect(selected).toEqual(expectedResult)
        })
        
    })

    describe('getSelectedFieldsArea', () => {

        it('should return with 0 ', () => {

            const expectedResult = {
                payload: {area: 0},
                isLoading: false,
                error: null
            }
            const fnc = getSelectedFieldsArea()
            const selected = fnc.resultFunc(session, requestFixtures, [1, 2])
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with sum of area', () => {
            const fixture = [
                {id: 1, title: "Tábla 1", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
                {id: 2, title: "Tábla 2", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
            ]

            const expectedFixture = { area: 21000 + 21000 }

            const expectedResult = {
                payload: expectedFixture,
                isLoading: false,
                error: null,
            }
            const { Field } = session
            fixture.forEach(x => Field.parse(x))

            const fnc = getSelectedFieldsArea()
            const selected = fnc.resultFunc(session, requestFixtures, [1, 2])
            expect(selected).toEqual(expectedResult)
        })

        it('should return with sum of area, one index', () => {
            const fixture = [
                {id: 1, title: "Tábla 1", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
                {id: 2, title: "Tábla 2", area: 21000, geometry: {}, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
            ]

            const expectedFixture = { area: 21000 }

            const expectedResult = {
                payload: expectedFixture,
                isLoading: false,
                error: null,
            }
            const { Field } = session
            fixture.forEach(x => Field.parse(x))

            const fnc = getSelectedFieldsArea()
            const selected = fnc.resultFunc(session, requestFixtures, 1)
            expect(selected).toEqual(expectedResult)
        })
        
    })

})