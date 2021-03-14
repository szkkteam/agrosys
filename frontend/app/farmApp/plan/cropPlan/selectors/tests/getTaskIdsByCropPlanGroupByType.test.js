import schema from 'farmApp/schema'
import selector from '../getTaskIdsByCropPlanGroupByType'
    

describe('getTaskIdsByCropPlanGroupByType selector', () => {
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

    it('should return with empty objects', () => {
      
        const expectedResult = {
            payload: new Map(),
            isLoading: false,
            error: null
        }
        const fnc = selector()
        const selected = fnc.resultFunc(session, requestFixtures, 1)
        expect(selected).toEqual(expectedResult)
    })

    it('should return with list of objects', () => {
        const fixture = [
            {id: 1, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 1, title: 'task1', type: 'harvest'},
                {id: 2, title: 'task1', type: 'planting'},
            ]},
            {id: 2, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 3, title: 'task1', type: 'harvest'},
                {id: 4, title: 'task1', type: 'tilage'},
            ]},
            {id: 3, title: "asd", season: 2021, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 5, title: 'task1', type: 'planting'},
                {id: 6, title: 'task1', type: 'planting'},
            ]},
        ]

        const expectedResult = {
            payload: new Map([
                ['planting', [{id: 2, title: 'task1', type: 'planting', cropPlanId: 1}]],
                ['harvest', [
                    {id: 1, title: 'task1', type: 'harvest', cropPlanId: 1},
                    {id: 3, title: 'task1', type: 'harvest', cropPlanId: 2},
                ]],
                ['tilage', [{id: 4, title: 'task1', type: 'tilage', cropPlanId: 2}]],
            ]),
            isLoading: false,
            error: null
        }
        const { CropPlan } = session
        fixture.forEach(x => CropPlan.parse(x))

        const fnc = selector()
        const selected = fnc.resultFunc(session, requestFixtures, [1, 2])
        expect(selected).toEqual(expectedResult)
    })

    it('should return with list of objects - single param', () => {
        const fixture = [
            {id: 1, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 1, title: 'task1', type: 'harvest'},
                {id: 2, title: 'task1', type: 'planting'},
            ]},
            {id: 2, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 3, title: 'task1', type: 'planting'},
                {id: 4, title: 'task1', type: 'planting'},
            ]},
            {id: 3, title: "asd", season: 2021, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 5, title: 'task1', type: 'planting'},
                {id: 6, title: 'task1', type: 'planting'},
            ]},
        ]

        const expectedResult = {
            payload: new Map([
                ['planting', [{id: 2, title: 'task1', type: 'planting', cropPlanId: 1}]],
                ['harvest', [{id: 1, title: 'task1', type: 'harvest', cropPlanId: 1}]],
            ]),
            isLoading: false,
            error: null
        }
        const { CropPlan } = session
        fixture.forEach(x => CropPlan.parse(x))

        const fnc = selector()
        const selected = fnc.resultFunc(session, requestFixtures, 1)
        expect(selected).toEqual(expectedResult)
    })

    it('should return with empty list', () => {
        const fixture = [
            {id: 1, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 1, title: 'task1', type: 'planting'},
                {id: 2, title: 'task1', type: 'planting'},
            ]},
            {id: 2, title: "asd", season: 2020, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 3, title: 'task1', type: 'planting'},
                {id: 4, title: 'task1', type: 'planting'},
            ]},
            {id: 3, title: "asd", season: 2021, cropType: {id: 1, title: "a", category: "a"}, tasks: [
                {id: 5, title: 'task1', type: 'planting'},
                {id: 6, title: 'task1', type: 'planting'},
            ]},
        ]

        const expectedResult = {
            payload: new Map(),
            isLoading: false,
            error: null
        }
        const { CropPlan } = session
        fixture.forEach(x => CropPlan.parse(x))

        const fnc = selector()
        const selected = fnc.resultFunc(session, requestFixtures, 999)
        expect(selected).toEqual(expectedResult)
    })
})