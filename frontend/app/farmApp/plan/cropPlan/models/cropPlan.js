import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
import cropPlanEntity from '../reducers/cropPlanEntity'
import Model from 'utils/Model'

export class CropPlan extends Model {

    static get fields() {
        return {
            id: attr(),
            title: attr(),
            season: attr(),
            cropType: fk('CropType', 'cropPlans'),
            
        }
    }
    
    static reducer(action, CropPlan, session) {
        return cropPlanEntity(action, CropPlan, session)        
    }

    static parse(data) {
        const { CropType } = this.session
        let clonedData = {
            ...data,
            cropType: CropType.parse({...data.cropType}),
        }
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }

    toJSON() {
        const data = {
            ...this.ref,
            cropType: this.cropType.toJSON(),
        }

        return data
    }
}

CropPlan.modelName = "CropPlan";