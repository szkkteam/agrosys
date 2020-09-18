import { normalize, schema, denormalize } from 'normalizr';

export const agriculturalTypeSchema = new schema.Entity('agriculturalTypes', {
})

export const agriculturalTypesSchema = new schema.Array(agriculturalTypeSchema)

export const normalizeAgriculturalTypes = (data) => {
    const { entities, result} = normalize(data, agriculturalTypesSchema)
    console.log("entities: ", entities)
    return {
        ...entities,
        ids: result
    }
}


export const deNormalizeAgriculturalTypes = (data) => {
    const { entities, ids } = data
    return denormalize(ids, agriculturalTypesSchema, entities)

}

export const soilTypeSchema = new schema.Entity('soilTypes', {
})

export const soilTypesSchema = new schema.Array(soilTypeSchema)

export const normalizeSoilTypes = (data) => {
    const { entities, result} = normalize(data, soilTypesSchema)
    return {
        ...entities,
        ids: result
    }
}

export const deNormalizeSoilTypes = (data) => {
    const { entities, ids } = data
    return denormalize(ids, soilTypesSchema, entities)

}
