import camelCase from 'lodash/camelCase'
import isFunction from 'lodash/isFunction'
import isObject from 'lodash/isObject'

export const actionTypes = [
  'MAYBE_TRIGGER',
  'TRIGGER',
  'REQUEST',
  'SUCCESS',
  'FAILURE',
  'FULFILL',
]

export const ROUTINE_PROMISE = 'actions/ROUTINE_PROMISE'

/**
 * createRoutine(string: routineName)
 *
 * Creates an object with the standard action creators and constants.
 *
 * For example:
 * const myAction = createRoutine('ACTION')
 *
 * myAction === {
 *   // the standard action constants:
 *   MAYBE_TRIGGER: 'ACTION_MAYBE_TRIGGER',
 *   TRIGGER: 'ACTION_TRIGGER',
 *   REQUEST: 'ACTION_REQUEST',
 *   SUCCESS: 'ACTION_SUCCESS',
 *   FAILURE: 'ACTION_FAILURE',
 *   FULFILL: 'ACTION_FULFILL',
 *
 *   // the standard action creators:
 *   maybeTrigger: (payload) => ({ type: 'ACTION_MAYBE_TRIGGER', payload }),
 *   trigger: (payload) => ({ type: 'ACTION_TRIGGER', payload }),
 *   request: (payload) => ({ type: 'ACTION_REQUEST', payload }),
 *   success: (payload) => ({ type: 'ACTION_SUCCESS', payload }),
 *   failure: (payload) => ({ type: 'ACTION_FAILURE', payload }),
 *   fulfill: (payload) => ({ type: 'ACTION_FULFILL', payload }),
 * }
 */
export function createRoutine(routineName) {
  return createRoutineActions(routineName, actionTypes)
}

export function createRoutineActions(routineName, actionList) {
  const routine = actionList.reduce((routine, actionType) => {
    const actionName = `${routineName}_${actionType}`
    //console.log("createRoutineActions-actionName: ", actionName)
    routine[actionType] = actionName
    routine[camelCase(actionType)] = (payload, meta) => ({
      type: actionName,
      payload,
      meta,
    })
    //console.log("createRoutineActions-routine: ", routine)
    return routine
  }, {})

  const routinePromise = (data, dispatch, formHelper) => {
    return new Promise((resolve, reject) => dispatch({
      type: ROUTINE_PROMISE,
      payload: {
        data,
        routine,
        defer: { resolve, reject },
      },
      meta: {
        ...formHelper
      }
    }))
  }
  let o = Object.assign(routinePromise, routine)
  return Object.assign(o, {actionList})
}


/**
 * bindRoutineCreators(object: routines, fn: dispatch)
 *
 * Like redux's bindActionCreators, except it takes an object of routines
 * created by createRoutine instead of an object of individual action creators
 *
 * For example, using myAction from above:
 * const boundRoutines = bindRoutineCreators({ myAction }, dispatch)
 *
 * boundRoutines === {
 *   myAction: {
 *     maybeTrigger: (payload) => dispatch(myAction.maybeTrigger(payload)),
 *     trigger: (payload) => dispatch(myAction.trigger(payload)),
 *     request: (payload) => dispatch(myAction.request(payload)),
 *     success: (payload) => dispatch(myAction.success(payload)),
 *     failure: (payload) => dispatch(myAction.failure(payload)),
 *     fulfill: (payload) => dispatch(myAction.fulfill(payload)),
 *   },
 * }
 */

function _bindRoutine(routine, dispatch, actionList) {
  return actionList.reduce((boundRoutine, actionType) => {
    const key = camelCase(actionType)
    boundRoutine[key] = (payload) => dispatch(routine[key](payload))
    return boundRoutine
  }, {})
}


export function bindRoutineCreators(routines, dispatch) {
  if (!isObject(routines)) {
    throw new Error('routines must be an object')
  }
  if (!isFunction(dispatch)) {
    throw new Error('dispatch must be a function')
  }
  return Object.keys(routines).reduce((boundRoutines, routineName) => {
    const { actionList } = routines[routineName]
    boundRoutines[routineName] = _bindRoutine(routines[routineName], dispatch, actionList)
    return boundRoutines
  }, {})
}
