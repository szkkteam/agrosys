import React, { useRef, useState, useContext, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    CardActions
    
} from '@material-ui/core'

const Action = ({
    className,
    children,
    ...props
}) => {
    
    return (
        <CardActions className={className}>
            {children}
        </CardActions>
    )
}


Action.propTypes = {
    icon: PropTypes.element,
    title: PropTypes.object.isRequired,
    subheader: PropTypes.object,
}

export default Action
