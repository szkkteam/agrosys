import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { pushModalWindow } from 'redux-promising-modals';

import { BLOCK_CREATE_DIALOG } from 'site/modalTypes'
import { SHOW_CREATE_MODAL } from '../actions'

import {
    BLOCK_CREATE_OPTION_DRAW,
    BLOCK_CREATE_OPTION_UPLOAD_FILE,
    BLOCK_CREATE_OPTION_LPIS_MEPAR
} from '../constants'


export const KEY = 'createBlockModalSaga'


export function *createBlockModalSaga(payload) {
    try {
        /*
        const result = yield put(pushModalWindow(BLOCK_CREATE_DIALOG, {}))
        result.then(({status}) => {
            console.log("Result: ", status)
        })
        */
        
    } catch(e) {
        console.log("Error: ", e)
    }

    
}

export default () => [
    takeLatest(SHOW_CREATE_MODAL, createBlockModalSaga),
]