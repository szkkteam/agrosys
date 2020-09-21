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
        const { useAsTemplate = false, cropTemplateId, fieldDetails = [], tasks = [] } = props
        return { initialValues: {
            useAsTemplate,
            cropTemplateId,
            details: fieldDetails,
            tasks: tasks,
        }}        
    },
)


const withAction = WrappedComponent => (
    props => (
        <WrappedComponent action={props.action} {...props}/>
    )    
)

export default compose(
    withConnect,
    withForm,
    withSagas,
    withAction,
)(FormProduction) 

