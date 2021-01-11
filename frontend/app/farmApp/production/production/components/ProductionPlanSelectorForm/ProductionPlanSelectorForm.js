import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import { ProductionPlanSelectorDialog } from '..'

import { Modal } from 'site/components'
import { PLAN_SELECTOR_FORM } from '../../constants'

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


const ProductionPlanSelectorForm = ({
    action,
    handleSubmit,
    ...props
}) => {
   
    return (      
        <form onSubmit={handleSubmit}>
            <ProductionPlanSelectorDialog
                {...props}
            />
        </form>
  ) 
}

ProductionPlanSelectorForm.propTypes = {

}


const ConnectedProductionPlanSelectorForm = compose(
    withConnect,
    withForm,
)(ProductionPlanSelectorForm) 


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
            <ConnectedProductionPlanSelectorForm
                initialValues={data}
                onSubmit={handleSubmit}
                {...headerProps}
                {...props}
            />
        </Modal>
    )
}