import { normalize, schema, denormalize } from 'normalizr';
import { parcelSchema } from 'parcel/schemas'

export const seasonSchema = new schema.Entity('seasons', {
    referenceParcels: [parcelSchema]
})


export const seasonsSchema = new schema.Array(seasonSchema)

export const normalizeSeasons = (data) => {
    const { entities, result} = normalize(data, seasonsSchema)
    return {
        ...entities,
        ids: result
    }
}

export const normalizeSeason = (data) => {
    console.log("normalizeSeason-Data: ", data)
    const { entities, result} = normalize(data, seasonSchema)
    console.log("normalizeSeason-entities: ", entities)
    console.log("normalizeSeason-result: ", result)
    return {
        ...entities,
        ids: result
    }
}


export const deNormalizeSeasons = (data) => {
    const { entities, ids } = data
    return denormalize(ids, seasonsSchema, entities)

}


export const deNormalizeSeason = (data) => {
    const { entities, ids } = data
    return denormalize(ids, seasonSchema, entities)

}
