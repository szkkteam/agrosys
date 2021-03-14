import { put } from 'redux-saga/effects'
import { runSaga } from "redux-saga";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { cropPlans as fixture } from 'farmApp/fixtures'

import { listCropPlanSaga as saga } from '../listCropPlan'
import { listCropPlan as action } from '../../actions'

describe('listCropPlan saga', () => {
    let dispatchedActions = [];
    let fakeStore;

    beforeEach(() => {
        fakeStore = {
          dispatch: (action) => dispatchedActions.push(action),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
        dispatchedActions = [];
    })
 
    it('test saga', async () => {
        const data = { payload: null };

        await runSaga(fakeStore, saga, data).done
        
        expect(dispatchedActions[0]).toEqual(action.request())
        expect(dispatchedActions[1]).toEqual(action.success({ cropPlans: fixture }))
        expect(dispatchedActions[2]).toEqual(action.fulfill())
    })
    
})
