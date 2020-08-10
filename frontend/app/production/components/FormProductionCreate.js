import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'

import { injectSagas } from 'utils/async'

import { injectReducer } from 'utils/async'
import { createProductions } from 'production/actions'

import { 
    FormProduction,
} from 'production/components'

const FORM_NAME = 'create-production'


const withForm = reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true, 
})

const withSagas = injectSagas(require('production/sagas/createProductions'))

const withConnect = connect(
    (state, props) => {
        console.log("Form props: ", props)
        const { useAsTemplate = false, cropTemplateId, fieldDetails = [] } = props
        return { initialValues: {
            useAsTemplate,
            cropTemplateId,
            details: fieldDetails,
        }}
        /*
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
        */
    },
)


const withAction = WrappedComponent => (
    props => (
        <WrappedComponent action={createProductions} {...props}/>
    )    
)

export default compose(
    withConnect,
    withForm,
    withSagas,
    withAction,
)(FormProduction) 

