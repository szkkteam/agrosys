import { normalize, schema, denormalize } from 'normalizr';
import { tasksSchema } from 'task/schemas'

export const templateSchema = new schema.Entity('templates', {
    tasks: tasksSchema
})


export const templatesSchema = new schema.Array(templateSchema)

export const normalizeTemplates = (data) => {
    const { entities, result} = normalize(data, templatesSchema)
    return {
        ...entities,
        ids: result
    }
}

export const normalizeTemplate = (data) => {
    const { entities, result} = normalize(data, templateSchema)
    console.log("normalizeTemplate-entities: ", entities)
    console.log("normalizeTemplate-result: ", result)
    return {
        ...entities,
        ids: result
    }
}


export const deNormalizeTemplates = (data) => {
    const { entities, ids } = data
    console.log("deNormalizeTemplates-entities: ", entities)
    return (ids && ids.length) ? denormalize(ids, templatesSchema, entities) : []

}


export const deNormalizeTemplate = (data) => {
    const { entities, ids } = data
    return (ids && ids.length) ? denormalize(ids, templateSchema, entities) : []

}
