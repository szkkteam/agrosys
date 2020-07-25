import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'

import { injectSagas } from 'utils/async'

import { injectReducer } from 'utils/async'
import { updateFieldDetails } from 'field/actions'

import { 
    FormFieldDetail,
} from 'field/components'

const FORM_NAME = 'update-field-detail'


const withForm = reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})

const withSagas = injectSagas(require('field/sagas/updateFieldDetail'))

const withConnect = connect(
    (state, props) => {
        //console.log("featureInEdit: ", props.featureInEdit)
        const {shape = null, area = null, value = 0, soil = null} = props.featureInEdit || {}
        const { selectedId } = props
        const { id: soilId } = soil || {}
        return { initialValues: {
            shape,
            area,
            value,
            soilTypeId: soilId,
            selectedId,
        }}
    },
)


const withAction = WrappedComponent => (
    props => (
        <WrappedComponent action={updateFieldDetails} {...props}/>
    )    
)

export default compose(
    withConnect,
    withForm,
    withSagas,
    withAction,
)(FormFieldDetail) 

