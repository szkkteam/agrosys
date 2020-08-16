import React from 'react'
import { FieldArray } from 'redux-form'

import { HiddenField, TextField, TextArea, SelectField, SelectOption } from 'components/Form'
import { statusEnum, taskTypesEnum } from 'production/constants'

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



const renderItems = (items) => (
    items && Array.isArray(items) && items.map((item, index) => (
        <SelectOption 
            key={index} 
            value={item.id}
        >
            {item.title}
        </SelectOption>    
    ))
)


export default (props) => {
  const { error, handleSubmit, selectedTaskType, submitting, pristine, action } = props
  return (
    <form onSubmit={handleSubmit}>
        <TextField name="title"
            label="Title of the task"
            className="full-width"
            autoFocus />      
        <HiddenField name="dates.startDate" />
        <HiddenField name="dates.endDate" />
        <TextArea name="description"
            label="Description"
            className="full-width"
            autoFocus />  
        <SelectField name="status" 
            label="Task status"
            inputName="select-status"
            formProps={{className:"full-width"}}
        >
            {renderItems(statusEnum)}
        </SelectField>
        <TextField name="predictedCost"
            label="Planned Cost"
            className="full-width"
            autoFocus />      
        <SelectField name="taskType"
            label="Task Type"
            inputName="select-status"
            formProps={{className:"full-width"}}
        >
            {renderItems(taskTypesEnum)}
        </SelectField>
        {selectedTaskType && renderTaskType(selectedTaskType)}
    </form>
  )
}
