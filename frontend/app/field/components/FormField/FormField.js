import React from 'react'
import { FieldArray } from 'redux-form'

import { HiddenField, TextField } from 'components/Form'
import { 
    FormFieldDetailSection
} from 'field/components'

const renderFieldDetailMemebers = ({fields, meta: { error, submitFailed}, ...rest}) => (
    <div>
        {fields.map((field, index) => (
            <FormFieldDetailSection 
                namespace={field}
                key={index}
            />            
        ))}
    </div>
    )

export default (props) => {
  const { error, handleSubmit, submitting, pristine, action } = props
  return (
    <form onSubmit={handleSubmit(action)}>
        <TextField name="title"
            label="Title of the field"
            className="full-width"
            autoFocus />
        <FieldArray name="fields" component={renderFieldDetailMemebers}>
        </FieldArray>
        <HiddenField name={"selectedFarm"} />
        
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
