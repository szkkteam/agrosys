import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import AddIcon from '@material-ui/icons/Add';
import {
    Fab,
} from '@material-ui/core'

const FloatButton = styled(Fab)`
    position: absolute;
    top: calc(75% + 0px);
    right: 12px;
`

const CardFab = ({
    className,
    ...props
}) => {
    const intl = useIntl()
    
    return (
        <FloatButton 
        className={className}
            size="small"
            color="secondary"
            aria-label="add"
            {...props}
        >
            <AddIcon />
        </FloatButton>
    )
}


CardFab.propTypes = {

}

export default CardFab
