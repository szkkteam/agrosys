import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import { CropDetailDialog } from '..'

import { Modal } from 'site/components'
import { CROP_FORM } from '../../constants'

const withForm = reduxForm({
    form: CROP_FORM,
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


const CropForm = ({
    action,
    handleSubmit,
    ...props
}) => {
   
    return (      
        <form onSubmit={handleSubmit}>
            <CropDetailDialog
                {...props}
            />
        </form>
  ) 
}

CropForm.propTypes = {

}


const ConnectedCropForm = compose(
    withConnect,
    withForm,
)(CropForm) 


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
            <ConnectedCropForm
                initialValues={data}
                onSubmit={handleSubmit}
                {...headerProps}
                {...props}
            />
        </Modal>
    )
}