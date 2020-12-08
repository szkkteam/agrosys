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

import { BLOCK_CREATE_FORM } from '../../constants'
/*
import {
    BlockDetailPage,
    BlockDrawPage
} from '../../components'
*/

import BlockDetailPage from '../BlockDetailPage/BlockDetailPage'
import BlockDrawPage from '../BlockDrawPage/BlockDrawPage'

const withForm = reduxForm({
    form: BLOCK_CREATE_FORM,
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

const ConnectedBlockDrawPage = compose(
    withConnect,
    withForm,
)(BlockDrawPage) 

const ConnectedBlockDetailPage = compose(
    withConnect,
    withForm,
)(BlockDetailPage) 

const FirstPage = ({
    onComplete,
    onBack: notUsed,
    ...props
}) => {
    
    let history = useHistory()

    const onCancel = () => {
        history.goBack()
    }


    return <ConnectedBlockDrawPage
                title={messages.step1Title}
                onSubmit={onComplete}
                onBack={onCancel}
                {...props}
            />
}

const SecondPage = ({
    onComplete,
    ...props
}) => <ConnectedBlockDetailPage onSubmit={(e) => console.log("Submitting: ", e)} {...props} />

const steps = [
    messages.step1Title,
    messages.step2Title,
]

const contents = [
    FirstPage,
    SecondPage
]

const BlockCreateDraw = ({
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

BlockCreateDraw.propTypes = {

}

export default BlockCreateDraw