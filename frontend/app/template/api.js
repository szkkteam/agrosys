import { get, post, patch, put } from 'utils/request'
import { farm } from 'api'


function template(uri) {
  return farm(`/templates${uri}`)
}


export default class Template {

    static listTemplates(farmData) {
        return get(farm(`/${farmData.id}/templates`))
    }
  
    static createTemplates(farmData, payload) {
        return post(farm(`/${farmData.id}/templates`), payload)
    }

    static getTemplate(templateData) {
        return get(template(`/${templateData}`))
    }

    static updateTemplate(templateData, payload) {
        return put(template(`/${templateData}`), payload)
    }

}
