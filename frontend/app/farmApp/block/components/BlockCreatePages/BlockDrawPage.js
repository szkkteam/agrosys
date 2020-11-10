import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import messages from 'farmApp/farm/messages';
import { useIntl } from 'react-intl'
import * as modalResultTypes from 'site/modalResultTypes';

import Grid from '@material-ui/core/Grid';

import { Field, reduxForm } from 'redux-form'


import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { SubmitButton, messages as ButtonMessages } from 'components/Button'
import { LeafletMap } from 'farmApp/map/components'

import { BLOCK_CREATE_FORM } from '../../constants'

//import './farmcreate.scss'

/*
<SubmitButton
                                cancelTitle={ButtonMessages.cancel}
                                submitTitle={ButtonMessages.next}
                                cancelDisabled={true}
                                submitDisabled={pristine || invalid}
                                onCancel={onBack}
                            />     
*/

const BlockDrawPage = ({
    invalid,
    handleSubmit,
    onCancel,
    submitting,
    pristine,
    action,
    dirty,
    change,
    tasks,
    onBack,
    onComplete,
    ...rest 
}) => {

    const intl = useIntl()
    //{intl.formatMessage(messages.farmDashboardTitle)}


    return (      
        <form onSubmit={handleSubmit} >
            <div style={{width: "100%"}}>
                <LeafletMap />            
            </div>            
        </form>
    ) 
}


const withForm = reduxForm({
    form: BLOCK_CREATE_FORM,
    //validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false, 
    forceUnregisterOnUnmount: true, 
})

const withConnect = connect(
    (state, props) => {
        const { initialValues : locinitialValues, ...rest } = props
        return {        
            initialValues: {
                ...locinitialValues
            },
            ...rest
        }
    },
)

export default compose(
    withConnect,
    withForm,
)(BlockDrawPage) 

