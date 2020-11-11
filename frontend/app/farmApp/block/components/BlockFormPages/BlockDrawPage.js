import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory } from "react-router-dom";
import messages from 'farmApp/farm/messages';
import { useIntl } from 'react-intl'
import * as modalResultTypes from 'site/modalResultTypes';

import Grid from '@material-ui/core/Grid';

import { Field, reduxForm } from 'redux-form'

import { withRemoteSubmit } from 'utils/hoc'
import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { SubmitButton, messages as ButtonMessages } from 'components/Button'
import { LeafletMap } from 'farmApp/map/components'

import { BLOCK_CREATE_FORM } from '../../constants'

import './blockdrawpage.scss' 

const withFormRemoteSubmit = reduxForm({
    form: BLOCK_CREATE_FORM,
    //onSubmit: () => console.log("submiting"),  
})

console.log("withFormRemoteSubmit: ", withFormRemoteSubmit)
console.log("withRemoteSubmit: ", withRemoteSubmit)

const RemoteSubmitButton = compose(
    withFormRemoteSubmit,
)(withRemoteSubmit(SubmitButton, BLOCK_CREATE_FORM)) 

const BlockDrawPage = ({
    invalid,
    handleSubmit,
    submitting,
    pristine,
    action,
    dirty,
    change,
    tasks,
    onBack,
    onSubmit,
    onComplete,
    ...rest 
}) => {

    const intl = useIntl()

    let history = useHistory()

    const onCancel = () => {
        console.log("Go back")
        history.goBack()
    }


    return (      
        <>
            <form onSubmit={handleSubmit} >  
            </form>
            <div className="map-outer">
                <LeafletMap
                    className="map-container"
                />
                <div className="step-control">
                    <RemoteSubmitButton
                        className="navigation-buttons"
                        cancelTitle={ButtonMessages.cancel}
                        submitTitle={ButtonMessages.next}
                        //cancelDisabled={true}
                        //submitDisabled={pristine || invalid}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                    />     
                </div>            
            </div>         
        </>
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

