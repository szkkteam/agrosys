import { call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import { ROUTES, ROUTE_MAP } from 'routes'
import { createRoutineFormSaga } from 'sagas'

import { updateTemplate } from 'template/actions'
import TemplateApi from 'template/api'
import { normalizeTemplate } from 'template/schemas'
import { cleanTasks } from 'task/utils'

export const KEY = 'updateTemplateSaga'

export const updateTemplateSaga = createRoutineFormSaga(
    updateTemplate,
  function *successGenerator(payload) {
    console.log("updateTemplateSaga-actionPayload: ", payload)
    // Remove unneccesery data from tasks object
    const { tasks, id, ...restPayload } = payload
    const clean = cleanTasks(tasks)

    const template = yield call(TemplateApi.updateTemplate, {id}, {...restPayload, tasks: clean})  
    console.log("updateTemplateSaga-template: ", template)
    yield put(updateTemplate.success({ 
    ...normalizeTemplate(template)
    }))     
  },
)

export default () => [
  takeLatest(updateTemplate.TRIGGER, updateTemplateSaga),
]

/**
 *  This is not neccessery, because updating an object with childs, will create new objects on the fly and delete the old ones.
    const templateSelector = yield select(getUserTemplateById)
    // Get the stored template from the redux store, by it's ID
    const templateInStore = templateSelector(restPayload.id)
    
    const parts = _.partition(tasks, v => !!(templateInStore.tasks.find(x => x.id === v.id) ))
    const tasksUpdate = cleanTasks(parts[0])
    const tasksAdd = cleanTasks(parts[1])

    const tasksDelete = cleanTasks(_.partition(templateInStore.tasks, v => !!(tasks.find(x => x.id !== v.id)))[0])
    
    // Update the template object
    const template = yield call(TemplateApi.updateTemplate, restPayload, {...restPayload})  
    // Add new tasks
    const newTasks = tasksAdd.map((v, i) => {
        const { id, ...task } = v
        const taskNew =  yield call(TaskApi.createTasks, {id}, task)  
        return taskNew
    })
    // Delete old tasks
    tasksDelete.map((v, i) => {
        const { id, ...task } = v
        const taskOld = yield call(TaskApi.deleteTasks, {id})  
        return taskOld
    })
    // Update tasks
    const updatedTasks = tasksUpdate.map((v, i) => {
        const { id, ...task } = v
        const taskNew = yield call(TaskApi.updateTasks, {id}, task)
        return taskNew
    })
    
 */