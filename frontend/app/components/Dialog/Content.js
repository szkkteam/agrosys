import React, { useRef, useMemo, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing } from '@material-ui/system'

import {
    DialogContent as MuiDialogContent
} from '@material-ui/core';

const DialogContent = styled(MuiDialogContent)`
    ${spacing}
`

const Content = ({
    children,
    ...props
}) => {

    return (
        <DialogContent
            {...props}
        >
            {children}
        </DialogContent>
    )
}

Content.propTypes = {

}

export default Content