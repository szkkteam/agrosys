import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'

import { injectSagas } from 'utils/async'

import { injectReducer } from 'utils/async'
import { createFieldDetails } from 'field/actions'

import { 
    FormFieldDetail,
} from 'field/components'

const FORM_NAME = 'create-field-detail'


const withForm = reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})

const withSagas = injectSagas(require('field/sagas/createFieldDetail'))

const withConnect = connect(
    (state, props) => {
        //console.log("featureInEdit: ", props.featureInEdit)
        const {shape = null, area = null} = props.featureInEdit || {}
        const { selectedId } = props
        return { initialValues: {
            shape,
            area,
            selectedId,
        }}
    },
)


const withAction = WrappedComponent => (
    props => (
        <WrappedComponent action={createFieldDetails} {...props}/>
    )    
)

export default compose(
    withConnect,
    withForm,
    withSagas,
    withAction,
)(FormFieldDetail) 
