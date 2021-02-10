import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { createRoutineSaga } from 'sagas'

import { listField } from '../actions'
// TODO: Import API

import { selectFieldRequest } from '../reducers/fieldRequest'

export const KEY = 'listFieldSaga'

const aloisTieberGeom = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                15.80683171749115,
                47.0677724300821
              ],
              [
                15.806558132171629,
                47.067122035283184
              ],
              [
                15.807357430458067,
                47.0668699138166
              ],
              [
                15.807212591171263,
                47.06642413091398
              ],
              [
                15.80828547477722,
                47.066442400778335
              ],
              [
                15.808795094490051,
                47.06647163254827
              ],
              [
                15.809036493301392,
                47.06707088029944
              ],
              [
                15.808634161949158,
                47.06743261805917
              ],
              [
                15.807738304138184,
                47.06752031169185
              ],
              [
                15.807239413261414,
                47.06764089020118
              ],
              [
                15.80683171749115,
                47.0677724300821
              ]
            ]
          ]
        }
      }
    ]
  }

export const fixture = [
    {id: 1, title: "Tábla 1", area: 21000, geometry: aloisTieberGeom, ownership: "Tulajdon", cadastralPlot: "116/2, 117/2", meparId: "ABCDEF-11"},
]

export const maybeListFieldSaga = function *() {
    const { isLoading, isLoaded } = yield select(selectFieldRequest)
    if (!(isLoading || isLoaded)) {
        yield put(listField.trigger())
    }
}

export const listFieldSaga = createRoutineSaga(
    listField,
    function *successGenerator() {
        // TODO: Call backend api
        // FIXME: Simulate network delay (250ms)
        yield delay(250)
        // TODO: Put result to redux-orm model
        yield put(listField.success({
            fields: fixture,
        }))      
    }
)

export default () => [
    takeEvery(listField.MAYBE_TRIGGER, maybeListFieldSaga),
    takeLatest(listField.TRIGGER, listFieldSaga)
]