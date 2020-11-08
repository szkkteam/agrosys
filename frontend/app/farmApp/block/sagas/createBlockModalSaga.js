import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { pushModalWindow } from 'redux-promising-modals';

import { BLOCK_CREATE_DIALOG } from 'site/modalTypes'
import { SHOW_CREATE_MODAL } from '../actions'

export const KEY = 'createBlockModalSaga'


export function *createBlockModalSaga(payload) {
    console.log("Saga")
    try {
        pushModalWindow(BLOCK_CREATE_DIALOG).then(result => {
            console.log("Modal result: ", result)
        })
    } catch(e) {
        console.log("Error: ", e)
    }

    
}

export default () => [
    //takeEvery(setSeason.MAYBE_TRIGGER, maybeSetSeasonsSaga),
    takeLatest(SHOW_CREATE_MODAL, createBlockModalSaga),
]