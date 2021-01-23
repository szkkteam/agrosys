import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages'; 
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useModalContext } from '../hooks'

import Button from 'components/Button/PrimaryButton'


const PrimaryButton = ({
    ...props
}) => {
    const { handleConfirm } = useModalContext()
    const { onClick, type } = props

    const additionalProps = !(type === 'submit')? { onClick: onClick ?? handleConfirm } : {}

    return (
        <Button
            {...props}
            {...additionalProps}
        />
    )
}

PrimaryButton.propTypes = {

}

export default PrimaryButton