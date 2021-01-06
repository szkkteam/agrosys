import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import { MachineryDetailDialog } from '..'

import { Modal } from 'site/components'
import { MACHINERY_FORM } from '../../constants'

const withForm = reduxForm({
    form: MACHINERY_FORM,
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


const MachineryForm = ({
    action,
    handleSubmit,
    ...props
}) => {
   
    return (      
        <form onSubmit={handleSubmit}>
            <MachineryDetailDialog
                {...props}
            />
        </form>
  ) 
}

MachineryForm.propTypes = {

}


const ConnectedMachineryForm = compose(
    withConnect,
    withForm,
)(MachineryForm) 


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
            <ConnectedMachineryForm
                initialValues={data}
                onSubmit={handleSubmit}
                {...headerProps}
                {...props}
            />
        </Modal>
    )
}