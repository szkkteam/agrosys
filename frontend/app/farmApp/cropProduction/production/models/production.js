import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
//import seasonEntity from '../reducers/seasonEntity'
import Model from 'utils/Model'

export class Production extends Model {

    static get fields() {
        return {
            id: attr(),
            season: attr(),
            field: attr(),
            //TODO: fk
            //cropType: fk('CropType', 'userCrops'),
            fields: many({
                to: 'Field',
                through: 'FieldProduction',
                relatedName: 'productions',
                throughFields: ['production', 'field']
            })
        }
    }
    
    static reducer(action, Season, session) {
        //return seasonEntity(action, Season, session)        
    }

    static parse(data) {

        //const { UserCrop } = this.session
        const { Field } = this.session
        const clonedData = {...data}
        clonedData.fields = data.fields && data.fields.map(field => Field.parse(field))
        
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

Production.modelName = "Production";