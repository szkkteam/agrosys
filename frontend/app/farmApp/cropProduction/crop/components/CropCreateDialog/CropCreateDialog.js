import React, { useContext, useMemo } from 'react'
import messages from './messages';
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import { Detail, DetailContainer } from 'farmApp/components/Detail'

import CropTabGeneral from './CropTabGeneral'

import { Modal, ModalHeader, ModalContent, ModalFooter, ModalContext } from 'components'
import { CROP_FORM } from '../../constants'

import { useInjectSaga } from 'utils/hooks'

import { createUserCrop } from '../../actions'

const Container = styled(props => <ModalContent {...props} />)`
    //padding: 10px 15px;
`

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
    onClose,
    submitting,
    pristine,
    handleSubmit,
    ...props
}) => {
    useInjectSaga(require('../../sagas/createUserCrop'))
   
    return (      
        <form onSubmit={handleSubmit(createUserCrop)}>
            <ModalHeader
                title={messages.title}
            />
            <Container>
                <CropTabGeneral 
                    title={messages.tabGeneral}
                    {...props}
                />
            </Container>
            <ModalFooter
                primaryButtonProps={{
                    title: globalMessages.save,
                    type: 'submit',
                    disabled: submitting || pristine,
                }}
                secondaryButtonProps={{
                    title: globalMessages.close,
                }}
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

    const { handleConfirm } = useContext(ModalContext)

    const handleSubmit = (d) => {
        console.debug("Submitting ... : ", d)
        handleConfirm && handleConfirm(d)
    }
    return (
        <Modal
            fullWidth
            maxWidth="md"
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