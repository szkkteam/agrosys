import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

//import { useActions } from 'utils/hooks'
import { useDispatch } from 'react-redux'

import { connect } from 'react-redux';
import { compose } from 'redux'
import { bindActionCreators } from 'redux'

import { pushModalWindow } from 'redux-promising-modals';
import { FIELD_DRAW_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM, MODAL_TYPE_CANCEL } from 'site/modalResultTypes'

const ContainerForm = styled.form`
    width: 100%;
    height: 100%;
`

const FieldDrawPage = ({
    form,
    title,

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
    const dispatch = useDispatch()
    //const pushModal = useActions(pushModalWindow)

    console.debug("Form: ", form)

    const modalProps = {
        title,
        form,
        onSubmit,
        onBack
    }
    
    useEffect(() => {
        dispatch(pushModalWindow(FIELD_DRAW_DIALOG, modalProps)).then(({ status }) => {
            // If status success, then call onSubmit
            // if status cancel, then call onBack
            console.debug("Form result: ", status)
            console.debug("onSubmit: ", onSubmit)
            console.debug("onBack: ", onBack)
            if (status === MODAL_TYPE_CONFIRM) {
                onSubmit()
            } else {
                onBack()
            }
        })
    }, [])
    
    return (      
        <ContainerForm onSubmit={handleSubmit} >              
        </ContainerForm>
    ) 
}

FieldDrawPage.propTypes = {

}

export default FieldDrawPage
