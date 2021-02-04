import schema from './schema'

export function updateEntity(state, payload) {
    const { model, id, data } = payload

    const session = schema.session(state)
    const ModelClass = session[model]

    if (ModelClass.hasId(id)) {
        const modelInstance = ModelClass.widthId(id)
        modelInstance.update(data)
    }

    return session.state
}

export function deleteEntity(state, payload) {
    const { model, id } = payload

    const session = schema.session(state)
    const ModelClass = session[model]

    if (ModelClass.hasId(id)) {
        const modelInstance = ModelClass.widthId(id)
        modelInstance.delete()
    }

    return session.state
}


export function createEntity(state, payload) {
    const { model, data } = payload

    const session = schema.session(state)
    const ModelClass = session[model]

    ModelClass.parse(data)

    return session.state
}