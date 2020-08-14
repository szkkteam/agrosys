import React from 'react'
import { FieldArray } from 'redux-form'

import { HiddenField, TextField, BooleanField } from 'components/Form'

const renderFieldDetailMemebers = ({fields, meta: { error, submitFailed}, ...rest}) => (
  <div>
      { fields.map((fieldDetail, index) => (
            <HiddenField 
                name={`${fieldDetail}.id`}                
                key={index}
            />  
        )
      )}
  </div>
  )

const renderTasks = ({fields, meta: { error, submitFailed}, ...rest}) => (
  <div>
  { fields.map((task, index) => (
      Object.keys(task).map((itemKey, i) => (
        <HiddenField 
          name={`${task}.${itemKey}`}                
          key={`${index}-${i}`}
        />  
      ))
  ))
  }
  </div>
)

export default (props) => {
  const { error, handleSubmit, submitting, pristine, action } = props
  return (
    <form onSubmit={handleSubmit}>
        <TextField name="title"
            label="Title of the production plan"
            className="full-width"
            autoFocus />
        <HiddenField name="useAsTemplate"/>
        <FieldArray name="tasks" component={renderTasks}/>
        <HiddenField name="cropTemplateId" />
        <FieldArray name="details" component={renderFieldDetailMemebers} />
    </form>
  )
}
