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


export default (props) => {
  const { error, handleSubmit, submitting, pristine, action } = props
  return (
    <form onSubmit={handleSubmit(action)}>
        <TextField name="title"
            label="Title of the production plan"
            className="full-width"
            autoFocus />
        <BooleanField name="useAsTemplate"
            label="Use later as template"
            autoFocus
        />
        <HiddenField name="cropTemplateId" />
        <FieldArray name="details" component={renderFieldDetailMemebers} />

        <div className="row">
            <button type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
            >
            {submitting ? 'Creating...' : 'Create'}
            </button>
        </div>
    </form>
  )
}
