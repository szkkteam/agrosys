import React from 'react'
import { FieldArray } from 'redux-form'

import { HiddenField, TextField } from 'components/Form'

export default (props) => {
  const { error, handleSubmit, submitting, pristine, action } = props
  return (
    <form onSubmit={handleSubmit(action)}>
        <TextField name="title"
            label="Title of the field"
            className="full-width"
            autoFocus />
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
