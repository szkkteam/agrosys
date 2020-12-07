import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

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
        <ContainerForm onSubmit={handleSubmit} >  
            <FullPageMap
            />
            <BlockFormStepButton
                cancelTitle={ButtonMessages.cancel}
                submitTitle={ButtonMessages.next}
                //cancelDisabled={true}
                //submitDisabled={pristine || invalid}
                onSubmit={onSubmit}
                onCancel={onCancel}
            />     
        </ContainerForm>
    ) 
}

BlockDrawPage.propTypes = {

}

export default BlockDrawPage