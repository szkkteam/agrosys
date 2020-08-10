import React from 'react'
import { FieldArray } from 'redux-form'

import { HiddenField, TextField, TextArea, SelectField } from 'components/Form'

const statusEnum = [
    'Pending',
    'Completed',
] 

const taskTypesEnum = [
    'TaskGeneral',
    'TaskPruning',
]

const renderTaskType = (value) => {
    switch(value) {
        case 'TaskGeneral':
            return (
                <div>
                    Display: {value} related fields
                </div>
            )
        case 'TaskPruning':
            return null
        default:
            return null
    }
}



export default (props) => {
  const { error, handleSubmit, selectedTaskType, submitting, pristine, action } = props
  console.log("selectedTaskType: ", selectedTaskType)
  return (
    <form onSubmit={handleSubmit}>
        <TextField name="title"
            label="Title of the task"
            className="full-width"
            autoFocus />      
        <HiddenField name="startDate" />
        <HiddenField name="endDate" />
        <TextArea name="description"
            label="Description"
            className="full-width"
            autoFocus />  
        <SelectField name="status"
            label="Task status"
            className="full-width"            
        >
            { statusEnum.map((value, index) => (
                <option key={index} value={value}>{value}</option>    
            )) }
        </SelectField>
        <TextField name="predictedCost"
            label="Planned Cost"
            className="full-width"
            autoFocus />      
        <SelectField name="taskType"
            label="Task Type"
            className="full-width"            
        >
            { taskTypesEnum.map((value, index) => (
                <option key={index} value={value}>{value}</option>    
            )) }
        </SelectField>
        {selectedTaskType && renderTaskType(selectedTaskType)}
    </form>
  )
}
