import { get, post, patch, put, delete_ } from 'utils/request'
import { farm } from 'api'


function plan(uri) {
  return farm(`/plans${uri}`)
}

function task(uri) {
    return farm(`/plans/tasks${uri}`)
  }
  

export default class Task {

    static createTasks(planData, payload) {
        return post(plan(`/${planData.id}/tasks`), payload)
    }

    static updateTasks(taskData, payload) {
        return put(task(`/${taskData.id}`), payload)
    }

    static deleteTasks(taskData) {
        return delete_(task(`/${taskData.id}`))
    }

}
