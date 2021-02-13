import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
import seasonEntity from '../reducers/seasonEntity'
import Model from 'utils/Model'
import { getId } from 'utils'

export class Season extends Model {

    static get fields() {
        return {
            id: attr({getDefault: () => getId()}),
            title: attr(),
            userCropId: fk({
                to: 'UserCrop',
                as: 'userCrop',
                relatedName: 'seasons',
            }),
            /*
            fields: many({
                to: 'Field',
                through: 'SeasonField',
                relatedName: 'seasons',
                throughFields: ['season', 'field']
            })
            */
            //TODO: fk
            //cropType: fk('CropType', 'userCrops'),
        }
    }
    
    static reducer(action, Season, session) {
        return seasonEntity(action, Season, session)        
    }

    static parse(data) {

        const { Production } = this.session
        const clonedData = {...data}
        //console.debug("Season-data: ", data)
        clonedData.productions = data.productions && data.productions.map(production => Production.parse({...production, season: data.id}))
        //console.debug("Season-clonedData: ", clonedData)
        
        
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

Season.modelName = "Season";