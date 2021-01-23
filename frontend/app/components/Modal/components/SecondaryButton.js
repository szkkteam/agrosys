import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages'; 
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useModalContext } from '../hooks'

import Button from 'components/Button/SecondaryButton'

const SecondaryButton = ({
    title,
    onClick,
    ...props
}) => {
    const { handleCancel } = useModalContext()
    return (
        <Button
            variant="contained"
            onClick={onClick ?? handleCancel}
            {...props}
        />
    )
}

SecondaryButton.propTypes = {

}

export default SecondaryButton