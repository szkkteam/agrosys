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
import { BLOCK_DRAW_DIALOG } from 'site/modalTypes'
import { MODAL_TYPE_CONFIRM, MODAL_TYPE_CANCEL } from 'site/modalResultTypes'

import { messages as ButtonMessages } from 'components/Button'
import { BlockFormStepButton } from '../../components'

import { LeafletMap } from 'farmApp/map/components'

const ContainerForm = styled.form`
    width: 100%;
    height: 100%;
`

const FullPageMap = styled(LeafletMap)`
    height: 100%;
`

const BlockDrawPage = ({
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
        dispatch(pushModalWindow(BLOCK_DRAW_DIALOG, modalProps)).then(({ status, ...rest }) => {
            // If status success, then call onSubmit
            // if status cancel, then call onBack
            console.debug("Form result: ", status)
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

/*
<FullPageMap
            />
            <BlockFormStepButton
                cancelTitle={ButtonMessages.cancel}
                submitTitle={ButtonMessages.next}
                //cancelDisabled={true}
                //submitDisabled={pristine || invalid}
                onSubmit={onSubmit}
                onCancel={onBack}
            />     
*/

BlockDrawPage.propTypes = {

}

export default BlockDrawPage

/*

const mapStateToProps = (state) => {
    return {
    }
  }

const withConnect = connect(
    mapStateToProps,
    (dispatch) => bindActionCreators({ pushModalWindow }, dispatch),
)
  
export default compose(
    withConnect,
)(BlockDrawPage)
*/