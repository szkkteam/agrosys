import { Schema, many, fk, attr } from 'redux-orm';
import { PropTypes } from 'react';
import taskEntity from '../reducers/taskEntity'
import Model from 'utils/Model'

export class Task extends Model {

    static get fields() {
        return {
            id: attr(),
            title: attr(),
            //cropPlan: fk('CropPlan', 'tasks'),
            cropPlanId: fk({
                to: 'CropPlan',
                as: 'cropPlan',
                relatedName: 'tasks',
            }),
            
        }
    }
    
    static reducer(action, Task, session) {
        return taskEntity(action, Task, session)        
    }

    static parse(data) {
        const { CropPlan } = this.session
        let clonedData = {
            ...data,
            //cropPlan: CropPlan.parse({...data.cropPlan}),
        }
        // TODO: Do some parsing magic with relations
        return this.upsert(clonedData)
    }

    toJSON() {
        const data = {
            ...this.ref,
            //cropPlan: this.cropPlan.toJSON(),
        }

        return data
    }
}

Task.modelName = "Task";