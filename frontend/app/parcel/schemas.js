import { normalize, schema, denormalize } from 'normalizr';
import {
    soilTypeSchema,
    agriculturalTypeSchema,
} from 'reference/schemas'

export const parcelSchema = new schema.Entity('parcels', {
    agriculturalType: agriculturalTypeSchema,
    soilType: soilTypeSchema,
})

export const parcelsSchema = new schema.Array(parcelSchema)
parcelSchema.define({ parcels: parcelsSchema });

export const normalizeParcels = (data) => {
    const { entities, result} = normalize(data, parcelsSchema)
    console.log("Normalize: ", normalize(data, parcelsSchema))
    console.log("Normalize data: ", data)
    console.log("Normalize entities: ", entities)
    console.log("Normalize result: ", result)
    return {
        ...entities,
        ids: result
    }
}

export const deNormalizeParcels = (data) => {
    const { entities, ids } = data
    console.log("deNormalizeParcels-entities: ", entities)
    console.log("deNormalizeParcels-ids: ", ids)
    if (Object.keys(entities.parcels).length && ids && ids.length) {
        return denormalize(ids, parcelsSchema, entities)
    }
    else {
        return []
    }
}
