import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
//import seasonEntity from '../reducers/seasonEntity'
import Model from 'utils/Model'
import { getId } from 'utils'

export class Production extends Model {

    static get fields() {
        return {
            id: attr({getDefault: () => getId()}),
            //TODO: fk
            //cropType: fk('CropType', 'userCrops'),
            fields: many({
                to: 'Field',
                through: 'FieldProduction',
                relatedName: 'productions',
                throughFields: ['production', 'field']
            }),
            season: fk({
                to: 'Season',
                as: 'season',
                relatedName: 'productions'
            })
        }
    }
    /*
    static reducer(action, Season, session) {
        //return seasonEntity(action, Season, session)        
    }
    */
    static parse(data) {

        //const { UserCrop } = this.session
        const { Field } = this.session
        const clonedData = {...data}
        //console.debug("Production-data: ", data)
        clonedData.fields = data.fields && data.fields.map(field => Field.parse(field))
        //console.debug("Production-clonedData: ", clonedData)
        
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

Production.modelName = "Production";