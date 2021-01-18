import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages'; 
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import {
    Button
} from '@material-ui/core'

const StyledPrimaryButton = styled(Button)`
    min-width: 220px;
    margin: 10px 15px;
    padding: 8px 16px;
`

const PrimaryButton = ({
    title,
    ...props
}) => {
    const { onClick, type } = props

    return (
        <StyledPrimaryButton
            color="primary"
            variant="contained"            
            {...props}
        >
            <FormattedMessage {...title} />
        </StyledPrimaryButton>
    )
}

PrimaryButton.propTypes = {

}

export default PrimaryButton