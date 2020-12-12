import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'

import {
    Container,
    Grid,
    Button,
} from '@material-ui/core';

import { Field, reduxForm } from 'redux-form'

import { HiddenField, TextField, onlyDecimal } from 'components/Form'
import { Stepper } from 'components'

import { FIELD_CREATE_FORM } from '../../constants'
/*
import {
    BlockDetailPage,
    BlockDrawPage
} from '../../components'
*/

import FieldDetailPage from '../FieldDetailPage/FieldDetailPage'
import FieldDrawPage from '../FieldDrawPage/FieldDrawPage'

const withForm = reduxForm({
    form: FIELD_CREATE_FORM,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
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

const ConnectedFieldDrawPage = compose(
    withConnect,
    withForm,
)(FieldDrawPage) 

const ConnectedFieldDetailPage = compose(
    withConnect,
    withForm,
)(FieldDetailPage) 

const FirstPage = ({
    onComplete,
    onBack: notUsed,
    ...props
}) => {
    
    let history = useHistory()

    const onCancel = () => {
        history.goBack()
    }


    return <ConnectedFieldDrawPage
                title={messages.step1Title}
                onSubmit={onComplete}
                onBack={onCancel}
                {...props}
            />
}

const SecondPage = ({
    onComplete,
    ...props
}) => <ConnectedFieldDetailPage onSubmit={(e) => console.log("Submitting: ", e)} {...props} />

const steps = [
    messages.step1Title,
    messages.step2Title,
]

const contents = [
    FirstPage,
    SecondPage
]

const FieldCreateDraw = ({
    pages,
    invalid,
    ...rest 
}) => {

    console.log("Contents: ", contents)
   
    return (      
        <Stepper 
            //defaultStep={1} // TODO: REmove
            steps={steps}
            contents={contents}
            stepsVisible={false}
        />
  ) 
}

FieldCreateDraw.propTypes = {

}

export default FieldCreateDraw