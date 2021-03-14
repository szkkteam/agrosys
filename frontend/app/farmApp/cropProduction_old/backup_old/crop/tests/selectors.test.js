import schema from 'farmApp/schema'
import {
    getCropTypes,
    getUserCropIds,
    getUserCrops,
    getUserCrop,
    getCurrentSeasonByUserCropId
} from '../selectors.js'

export const season_1 = 
    {id: 1, title: 'Búza 2020', }

export const season_2 = 
    {id: 2, title: 'Búza 2021', }

export const season_3 = 
    {id: 3, title: 'Búza 2022', }

export const fixture = [
    {id: 1, title: "Búza", seasons: [season_1, season_2]},
    {id: 2, title: "Búza 2", seasons: [season_3]},
]
    

describe('crop selectors', () => {
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


    describe('getUserCropIds', () => {

        it('should return with empty objects', () => {

            const expectedResult = {
                payload: [],
                isLoading: false,
                error: null
            }
            const selected = getUserCropIds.resultFunc(session, requestFixtures)
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with model ids', () => {
            const fixture = [
                {id: 1, title: "Búza", cropType: {id: 1, title: "Téli búza", category: "Takarmány növény"}},
                {id: 2, title: "Búza", cropType: {id: 1, title: "Téli búza", category: "Takarmány növény"}},
            ]

            const expectedResult = {
                payload: [1, 2],
                isLoading: false,
                error: null,
            }
            const { UserCrop } = session
            fixture.forEach(x => UserCrop.parse(x))

            const selected = getUserCropIds.resultFunc(session, requestFixtures)
            expect(selected).toEqual(expectedResult)
        })
        
    })

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

    describe('getUserCrop', () => {

        it('should return with null object', () => {

            const expectedResult = {
                payload: null,
                isLoading: false,
                error: null
            }
            const fnc = getUserCrop()
            const selected = fnc.resultFunc(session, requestFixtures, 1)
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with model instance', () => {
            const fixture = [
                {id: 1, title: "Búza", cropType: {id: 1, title: "Téli búza", category: "Takarmány növény"}},
                {id: 2, title: "Búza", cropType: {id: 1, title: "Téli búza", category: "Takarmány növény"}},
            ]

            const expectedFixture = {
                id: 1,
                title: "Búza",
                cropType: 1
            }

            const expectedResult = {
                payload: expectedFixture,
                isLoading: false,
                error: null,
            }
            const { UserCrop } = session
            fixture.forEach(x => UserCrop.parse(x))

            const fnc = getUserCrop()
            const selected = fnc.resultFunc(session, requestFixtures, 1)
            expect(selected).toEqual(expectedResult)
        })
        
    })


    describe('getCurrentSeasonByUserCropId', () => {

        it('should return with null object', () => {

            const expectedResult = {
                payload: null,
                isLoading: false,
                error: null
            }
            const fnc = getCurrentSeasonByUserCropId()
            const selected = fnc.resultFunc(session, requestFixtures, 1)
            expect(selected).toEqual(expectedResult)
        })
        
        it('should return with model instance', () => {
            const expectedFixture = season_3

            const expectedResult = {
                payload: expectedFixture,
                isLoading: false,
                error: null,
            }
            const { UserCrop } = session
            fixture.forEach(x => UserCrop.parse(x))

            const fnc = getCurrentSeasonByUserCropId()
            const result = fnc.resultFunc(session, requestFixtures, fixture[1].id)
            const {id, title} = result.payload
            expect(Object.assign(result, {payload: {id, title}})).toEqual(expectedResult)
        })
        
    })

})