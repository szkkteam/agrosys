import React, { useRef, useMemo, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'

import {
    DialogActions as MuiDialogActions
} from '@material-ui/core';

const DialogActions = styled(MuiDialogActions)`
    ${spacing}
`

const Footer = ({
    children,
    ...props
}) => {

    return (
        <DialogActions
            {...props}
        >
            {children}
        </DialogActions>
    )
}

Footer.propTypes = {

}

export default Footer