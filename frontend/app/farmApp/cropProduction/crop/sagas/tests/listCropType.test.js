import { put } from 'redux-saga/effects'
import { runSaga } from "redux-saga";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { listCropTypeSaga, fixture } from '../listCropType'
import { listCropType as listCropTypeAction } from '../../actions'
import reducer from '../../reducers/cropTypeRequest'

describe('listCropType saga', () => {
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

        await runSaga(fakeStore, listCropTypeSaga, data).done
        
        expect(dispatchedActions[0]).toEqual(listCropTypeAction.request())
        expect(dispatchedActions[1]).toEqual(listCropTypeAction.success({ cropTypes: fixture }))
        expect(dispatchedActions[2]).toEqual(listCropTypeAction.fulfill())
    })
    
})
