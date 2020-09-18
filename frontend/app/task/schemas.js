import { normalize, schema, denormalize } from 'normalizr';

export const taskSchema = new schema.Entity('tasks', {
    //referenceParcels: [parcelSchema]
})


export const tasksSchema = new schema.Array(taskSchema)

export const normalizeTasks = (data) => {
    const { entities, result} = normalize(data, tasksSchema)
    return {
        ...entities,
        ids: result
    }
}

export const normalizeTask = (data) => {
    const { entities, result} = normalize(data, taskSchema)
    return {
        ...entities,
        ids: result
    }
}


export const deNormalizeTasks = (data) => {
    const { entities, ids } = data
    return denormalize(ids, tasksSchema, entities)

}


export const deNormalizeTask = (data) => {
    const { entities, ids } = data
    return denormalize(ids, taskSchema, entities)

}
