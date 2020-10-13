import orm from 'orm'

import {
    createEntityAction,
    updateEntityAction,
    deleteEntityAction
} from './actions'

export function updateEntity(state, payload) {
    const { model, id, data } = payload

    const session = orm.session(state)
    const ModelClass = session[model]

    if (ModelClass.hasId(id)) {
        const modelInstance = ModelClass.widthId(id)
        modelInstance.update(data)
    }

    return session.state
}

export function deleteEntity(state, payload) {
    const { model, id } = payload

    const session = orm.session(state)
    const ModelClass = session[model]

    if (ModelClass.hasId(id)) {
        const modelInstance = ModelClass.widthId(id)
        modelInstance.delete()
    }

    return session.state
}


export function createEntity(state, payload) {
    const { model, data } = payload

    const session = orm.session(state)
    const ModelClass = session[model]

    ModelClass.parse(data)

    return session.state
}

