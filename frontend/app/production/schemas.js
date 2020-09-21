import { normalize, schema, denormalize } from 'normalizr';
import { tasksSchema } from 'task/schemas'

export const productionSchema = new schema.Entity('productions', {
    tasks: tasksSchema
})


export const productionsSchema = new schema.Array(productionSchema)

export const normalizeProductions = (data) => {
    const { entities, result} = normalize(data, productionsSchema)
    return {
        ...entities,
        ids: result
    }
}

export const normalizeProduction = (data) => {
    const { entities, result} = normalize(data, productionSchema)
    return {
        ...entities,
        ids: result
    }
}


export const deNormalizeProductions = (data) => {
    const { entities, ids } = data
    return (ids && ids.length) ? denormalize(ids, productionsSchema, entities) : []

}


export const deNormalizeProduction = (data) => {
    const { entities, ids } = data
    return (ids && ids.length) ? denormalize(ids, productionSchema, entities) : []

}
