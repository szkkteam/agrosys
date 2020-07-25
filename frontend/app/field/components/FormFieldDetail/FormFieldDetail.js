import React from 'react'
import { FieldArray } from 'redux-form'

import { HiddenField, TextField } from 'components/Form'
import { 
    FormFieldDetailSection
} from 'field/components'
 
import './formfielddetail.scss'

export default (props) => {
  const { error, handleSubmit, submitting, pristine, action, dirty, values } = props
  return (      
    <form onSubmit={handleSubmit(action)} className="form-fielddetail">
        <FormFieldDetailSection 
        />
        <HiddenField name={"selectedId"} />       
        
        <div className="row">
            <button type="submit"
                    className="btn btn-primary form-fielddetail-submit"
                    disabled={submitting}
            >
            {submitting ? 'Saving...' : 'Save'}
            </button>
        </div>
    </form>
  ) 
}
