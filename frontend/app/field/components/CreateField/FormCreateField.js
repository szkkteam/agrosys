import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'
import { parse } from 'query-string'
import { FieldArray } from 'redux-form'

//import { login } from 'security/actions'
import { DangerAlert, PageContent } from 'components'
import { NavLink } from 'components/Nav'
import { HiddenField, PasswordField, TextField } from 'components/Form'
import { FieldDetailSection } from 'field/components/Form'
import { ROUTES } from 'routes'
import { injectSagas } from 'utils/async'

import { injectReducer } from 'utils/async'
import { createFieldShape, createFieldActionTypes } from 'field/actions'
import { selectCreateFieldShape } from 'field/reducers/createFieldShape'

const FORM_NAME = 'create-field'

const renderFieldDetailMemebers = ({fields, meta: { error, submitFailed}, ...rest}) => (
    <div>
        {fields.map((field, index) => (
            <FieldDetailSection 
                namespace={field}
                key={index}
            />            
        ))}
    </div>
    )

const FormCreateField = (props) => {
  const { error, handleSubmit, submitting, shape, area, pristine } = props
  return (
    <form onSubmit={handleSubmit}>
        <TextField name="title"
            label="Title of the field"
            className="full-width"
            autoFocus />
        <FieldArray name="fields" component={renderFieldDetailMemebers}>
        </FieldArray>
        
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

const withForm = reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: false,
})

const withReducer = injectReducer(require('field/reducers/createFieldShape'))

const withConnect = connect(
    (state) => {
        const { shape, area} = selectCreateFieldShape(state) 
        return { initialValues: {
            fields: [{
                shape,
                area
            }]
        }}
    },
)

export default compose(
    withReducer,
    withConnect,
    withForm,
)(FormCreateField)
