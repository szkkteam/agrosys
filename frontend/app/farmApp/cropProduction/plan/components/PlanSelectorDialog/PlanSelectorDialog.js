import React, { useState, useMemo } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import PlanSelectorDialog from './PlanSelectorDialog'

import { Modal } from 'site/components'
import { PLAN_SELECTOR_FORM } from '../../constants'

import { DetailHeader, DetailContainer } from 'farmApp/components/Detail'
import ProductionTabGeneral from './ProductionTabGeneral'

const Container = styled.div`
    padding: 10px 15px;
`

const withForm = reduxForm({
    form: PLAN_SELECTOR_FORM,
    //validate,
    //enableReinitialize: true,
    //keepDirtyOnReinitialize: true,
    //destroyOnUnmount: false, 
    //forceUnregisterOnUnmount: true, 
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


const PlanSelectorForm = ({
    action,
    onClose,
    handleSubmit,
    ...props
}) => {
    const { handleConfirm }  = props

    return (      
        <form onSubmit={handleSubmit}>
            <DetailHeader
                title={messages.title}
                onClose={onClose}
            />
            <Container>
                <ProductionTabGeneral 
                    title={messages.tabGeneral}
                    onCreate={handleConfirm}
                    {...props}
                />
            </Container>
        </form>
  ) 
}

PlanSelectorForm.propTypes = {

}


const ConnectedPlanSelectorForm = compose(
    withConnect,
    withForm,
)(PlanSelectorForm) 


export default ({
    headerProps,
    data,
    ...props
}) => {

    const { handleConfirm } = headerProps

    const handleSubmit = (d) => {
        console.debug("Submitting ... : ", d)
        handleConfirm && handleConfirm(d)
    }
    return (
        <Modal
            fullWidth
            maxWidth="md"
            {...headerProps}
        >   
            <ConnectedPlanSelectorForm
                initialValues={data}
                onSubmit={handleSubmit}
                {...headerProps}
                {...props}
            />
        </Modal>
    )
}