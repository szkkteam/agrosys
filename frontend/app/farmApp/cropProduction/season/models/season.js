import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
import seasonEntity from '../reducers/seasonEntity'
import Model from 'utils/Model'

export class Season extends Model {

    static get fields() {
        return {
            id: attr(),
            title: attr(),
            userCropId: fk({
                to: 'UserCrop',
                as: 'userCrop',
                relatedName: 'seasons',
            })
            //TODO: fk
            //cropType: fk('CropType', 'userCrops'),
        }
    }
    
    static reducer(action, Season, session) {
        return seasonEntity(action, Season, session)        
    }

    static parse(data) {

        const { UserCrop } = this.session
        let clonedData = {
            ...data,
            //userCrop: UserCrop.parse({...data.userCrop})
        }
        console.debug("Cloned data: ", clonedData)
        
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

Season.modelName = "Season";