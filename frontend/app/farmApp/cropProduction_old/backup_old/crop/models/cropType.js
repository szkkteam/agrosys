import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
import cropTypeEntity from '../reducers/cropTypeEntity'
import Model from 'utils/Model'

export class CropType extends Model {

    static get fields() {
        return {
            id: attr(),
            title: attr(),
            category: attr(),
        }
    }
    
    static reducer(action, CropType, session) {
        return cropTypeEntity(action, CropType, session)        
    }

    static parse(data) {
        let clonedData = {
            ...data,
        }
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

CropType.modelName = "CropType";