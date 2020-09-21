import { normalize, schema, denormalize } from 'normalizr';
import {
    soilTypeSchema,
    agriculturalTypeSchema,
} from 'reference/schemas'

export const parcelSchema = new schema.Entity('parcels', {
    agriculturalType: agriculturalTypeSchema,
    soilType: soilTypeSchema,
}, {
    processStrategy: (value, parent, key) => {
        console.log("parcelSchema-value: ", value)
        console.log("parcelSchema-parent: ", parent)
        console.log("parcelSchema-key: ", key)
        let { season = undefined, ...retVal } = value
        if ('referenceParcels' == key) { Object.assign(retVal, {season: parent.id}) }
        if (season) {
            if (typeof(season) === 'object') { Object.assign(retVal, {season: season.id}) }
            else if (typeof(season) === 'number') { Object.assign(retVal, {season}) }
        }
        if ('parcels' == key) { Object.assign(retVal, { parentParcel: parent.id }) }
        if ('parcels' in retVal && !retVal.parcels.length) { delete retVal.parcels }
        // If Season is in the data, just store the ID.
        //if ('season' in retVal && retVal.season && typeof(retVal) === 'object') { retVal.season = retVal.season.id }
        console.log("parcelSchema-retVal: ", retVal)
        return retVal
    }
    
})

export const parcelsSchema = new schema.Array(parcelSchema)
parcelSchema.define({ parcels: parcelsSchema });

export const normalizeParcels = (data) => {
    const { entities, result} = normalize(data, parcelsSchema)
    return {
        ...entities,
        ids: result
    }
}

export const deNormalizeParcels = (data) => {
    const { entities, ids } = data
    if (Object.keys(entities.parcels).length && ids && ids.length) {
        return denormalize(ids, parcelsSchema, entities)
    }
    else {
        return []
    }
}
