import { normalize, schema, denormalize } from 'normalizr';
import {
    soilTypeSchema,
    referenceParcelTypeSchema,
} from 'reference/schemas'

export const parcelSchema = new schema.Entity('parcels', {
    referenceParcelType: referenceParcelTypeSchema,
    soilType: soilTypeSchema,
})

export const parcelsSchema = new schema.Array(parcelSchema)
parcelSchema.define({ parcels: parcelSchema });

export const normalizeParcels = (data) => {
    const { entities, result} = normalize(data, parcelsSchema)
    return {
        byId: entities.parcels,
        ids: result
    }
}

export const deNormalizeParcels = (data) => {
    const { entities, ids } = data
    if (Object.keys(entities.parcels).length) {
        return denormalize(ids, parcelsSchema, entities)
    }
    else {
        return []
    }
}
