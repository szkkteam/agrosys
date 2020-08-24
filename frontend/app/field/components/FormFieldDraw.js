import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import reduxForm from 'redux-form/es/reduxForm'
import { parse } from 'query-string'
import { FieldArray } from 'redux-form'

import { HiddenField, TextField } from 'components/Form'
import { injectSagas } from 'utils/async'

import { injectReducer } from 'utils/async'
import { createFields } from 'field/actions'
import { selectMapFeautreInEdit } from 'components/Map/reducer'
import { selectSelectedFarm } from 'farm/reducers/farms'

import { 
    FormField,
} from 'field/components'

const FORM_NAME = 'create-field'


const withForm = reduxForm({
    form: FORM_NAME,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})

const withReducerFarm = injectReducer(require('components/Map/reducer'))
const withSagas = injectSagas(require('field/sagas/createField'))

const withConnect = connect(
    (state, props) => {
        const {shape = null, area = null} = props.featureInEdit || {}
        return { initialValues: {
            fields: [{
                shape,
                area
            }],
            selectedFarm: selectSelectedFarm(state),

        }}
    },
)

const withAction = WrappedComponent => (
    props => (
        <WrappedComponent action={createFields} {...props}/>
    )    
)

export default compose(
    withReducerFarm,
    withConnect,
    withForm,
    withSagas,
    withAction,
)(FormField) 

