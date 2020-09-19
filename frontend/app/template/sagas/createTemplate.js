import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { 
    createTemplate,
    actionTemplate,
} from 'template/actions'
import { selectSelectedFarm } from 'farm/reducers/farms'
import TemplateApi from 'template/api'
import { normalizeTemplate } from 'template/schemas'
import { cleanTasks } from 'task/utils'

export const KEY = 'createTemplateSaga'

export const createTemplateSaga = createRoutineFormSaga(
    createTemplate,
  function *successGenerator(payload) {
    console.log("createTemplateSaga-actionPayload: ", payload)

    // Get the selected farm from the store
    const selectedFarm = yield select(selectSelectedFarm)
    if (selectedFarm) {
      // Remove unneccesery data from tasks object
      const { tasks, ...restPayload } = payload
      const clean = cleanTasks(tasks)

      const template = yield call(TemplateApi.createTemplates, selectedFarm, {...restPayload, tasks: clean})  
      console.log("createTemplateSaga-template: ", template)
      yield put(createTemplate.success({ 
        ...normalizeTemplate(template)
      })) 
      yield put(actionTemplate.selectTemplate({ selectedTemplateId: template.id }))
    }       
  },
)

export default () => [
  takeLatest(createTemplate.TRIGGER, createTemplateSaga),
]