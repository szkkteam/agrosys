import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components'

import Container from '@material-ui/core/Container';

const LayoutContent = styled.div`
    height: 100%;
    position: relative;
    > div {
        width: 100%;
        height: 100%;
    }
`

export default ({
    children
}) => {
    

    return (
        <LayoutContent>
            {children}
        </LayoutContent>
    )
}
