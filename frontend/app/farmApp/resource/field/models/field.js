import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
import fieldEntity from '../reducers/fieldEntity'
import Model from 'utils/Model'

export class Field extends Model {

    static get fields() {
        return {
            id: attr(),
            title: attr(),
            //TODO: fk
            //cropType: fk('CropType', 'userCrops'),
        }
    }
    
    static reducer(action, Field, session) {
        return fieldEntity(action, Field, session)        
    }

    static parse(data) {

        const { Field } = this.session
        let clonedData = {
            ...data,
            //cropType: CropType.parse({...data.cropType})
        }
        
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

Field.modelName = "Field";