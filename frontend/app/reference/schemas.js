import { normalize, schema, denormalize } from 'normalizr';

export const referenceParcelTypeSchema = new schema.Entity('referenceParcelTypes', {
})

export const referenceParcelTypesSchema = new schema.Array(referenceParcelTypeSchema)

export const normalizeReferenceParcelTypes = (data) => {
    const { entities, result} = normalize(data, referenceParcelTypesSchema)
    console.log("entities: ", entities)
    return {
        byId: entities.referenceParcelTypes,
        ids: result
    }
}


export const deNormalizeReferenceParcelTypes = (data) => {
    const { entities, ids } = data
    return denormalize(ids, referenceParcelTypesSchema, entities)

}

export const soilTypeSchema = new schema.Entity('soilTypes', {
})

export const soilTypesSchema = new schema.Array(soilTypeSchema)

export const normalizeSoilTypes = (data) => {
    const { entities, result} = normalize(data, soilTypesSchema)
    return {
        byId: entities.soilTypes,
        ids: result
    }
}

export const deNormalizeSoilTypes = (data) => {
    const { entities, ids } = data
    return denormalize(ids, soilTypesSchema, entities)

}
