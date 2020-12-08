import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components'

import Container from '@material-ui/core/Container';

const StyledContainer = styled.div`
    height: 100%;
    position: relative;
`


export default ({
    children
}) => {
    

    return (
        <StyledContainer maxWidth={false}>
            {children}
        </StyledContainer>
    )
}
