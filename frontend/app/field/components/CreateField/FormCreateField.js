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
import { createFields } from 'field/actions'
import { selectMapFeautreInEdit } from 'map/reducer'
import { selectSelectedFarm } from 'farm/reducers/farms'

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
  const { error, handleSubmit, submitting, pristine } = props
  return (
    <form onSubmit={handleSubmit(createFields)}>
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

const withForm = reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: false,
})

const withReducerMap = injectReducer(require('farm/reducers/farms'))
const withReducerFarm = injectReducer(require('map/reducer'))
const withSagas = injectSagas(require('field/sagas/createField'))

const withConnect = connect(
    (state) => {
        const {shape = null, area = null} = selectMapFeautreInEdit(state) 
        return { initialValues: {
            fields: [{
                shape,
                area
            }],
            selectedFarm: selectSelectedFarm(state),

        }}
    },
)


export default compose(
    withReducerMap,
    withReducerFarm,
    withConnect,
    withForm,
    withSagas,
)(FormCreateField)

