import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages'; 
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useModalContext } from '../hooks'

import {
    Button
} from '@material-ui/core'

const StyledSecondaryButton = styled(Button)`
    margin: 10px 7px;
    min-width: 100px;
`

const SecondaryButton = ({
    title,
    onClick,
    ...props
}) => {
    const { handleCancel } = useModalContext()
    return (
        <StyledSecondaryButton
            variant="contained"
            onClick={onClick ?? handleCancel}
            {...props}
        >
            <FormattedMessage {...title} />
        </StyledSecondaryButton>
    )
}

SecondaryButton.propTypes = {

}

export default SecondaryButton