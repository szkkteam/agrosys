import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
import userCropEntity from '../reducers/userCropEntity'
import Model from 'utils/Model'

export class UserCrop extends Model {

    static get fields() {
        return {
            id: attr(),
            title: attr(),
            //TODO: fk
            cropType: fk('CropType', 'userCrops'),
        }
    }
    
    static reducer(action, UserCrop, session) {
        return userCropEntity(action, UserCrop, session)        
    }

    static parse(data) {
        const { CropType, Season } = this.session
        let clonedData = {
            ...data,
            cropType: CropType.parse({...data.cropType}),
            seasons: data.seasons && data.seasons.map(season => Season.parse(season))
        }
        
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }
}

UserCrop.modelName = "UserCrop";