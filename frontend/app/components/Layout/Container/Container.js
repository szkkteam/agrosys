import React, { useState, useRef, useLayoutEffect, forwardRef } from 'react'
import PropTypes, { number } from 'prop-types'
import styled from 'styled-components'

import {
    Container as MuiContainer,
    Paper
} from '@material-ui/core';

const StyledContainer = styled(MuiContainer)`
    //max-height: 40%;
`

const Container = forwardRef(({
    maxWidth="xs",
    children,
    ...props
}, ref) => {
    
    return (
        <div>
            <StyledContainer
                ref={ref}
                fixed={true}
                maxWidth={maxWidth}
                {...props}
            >
                <Paper elevation={3}>
                    {children}
                </Paper>
            </StyledContainer>
        </div>
    )
})

Container.propTypes = {
    /*
    children: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
    ])),
    */
}

export default Container
