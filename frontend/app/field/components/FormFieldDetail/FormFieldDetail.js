import React from 'react'
import { FieldArray } from 'redux-form'

import { HiddenField, TextField } from 'components/Form'
import { 
    FormFieldDetailSection
} from 'field/components'


export default (props) => {
  const { error, handleSubmit, submitting, pristine, action } = props
  console.log("action: ", action)
  return (      
    <form onSubmit={handleSubmit(action)}>
        <FormFieldDetailSection 
        />
        <HiddenField name={"selectedField"} />       
        
        <div className="row">
            <button type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
            >
            {submitting ? 'Saving...' : 'Save'}
            </button>
        </div>
    </form>
  )
}
