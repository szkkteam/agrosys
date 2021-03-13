import React, { useRef, useMemo, forwardRef, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { spacing, style } from '@material-ui/system'
import { useFormatTitle } from 'utils/hooks'

import {
    DialogTitle as MuiDialogTitle,
    IconButton,
    Typography,
} from '@material-ui/core';



const DialogTitle = styled(MuiDialogTitle)`
    ${spacing}
    margin: 0;
    display: flex;
    align-items: center;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const Center = styled.div`
    width: 100%;
    text-align: center;
`

const Left = styled.div``

const SimpleHeader = ({
    title,
    subheader,
    children,
    center=false,
    ...props
}) => {

    const formattedTitle = useFormatTitle(title)
    const formattedSubheader = useFormatTitle(subheader)

    const TitleContainer = center? Center : Left

    return (
        <DialogTitle p={2} disableTypography>
            <TitleContainer>
                <Typography variant="h6">
                    {formattedTitle}
                </Typography>
                {formattedSubheader && 
                    <Typography variant="body2">
                        {formattedSubheader}
                    </Typography>
                }
            </TitleContainer>
            <Spacer />
            {children}
        </DialogTitle>
    )
}

SimpleHeader.propTypes = {

}

export default SimpleHeader