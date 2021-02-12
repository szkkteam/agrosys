import { put } from 'redux-saga/effects'
import { runSaga } from "redux-saga";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { userCrops as fixture } from 'farmApp/fixtures'

import { listUserCropSaga } from '../listUserCrop'
import { listUserCrop as listUserCropAction } from '../../actions'

describe('listUserCrop saga', () => {
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

        await runSaga(fakeStore, listUserCropSaga, data).done
        
        expect(dispatchedActions[0]).toEqual(listUserCropAction.request())
        expect(dispatchedActions[1]).toEqual(listUserCropAction.success({ userCrops: fixture }))
        expect(dispatchedActions[2]).toEqual(listUserCropAction.fulfill())
    })
    
})
