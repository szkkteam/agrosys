import React from 'react'

import Container from '@material-ui/core/Container';

export default ({children}) => {
    return (
        <Container
            maxWidth="xl"
        >
            {children}
        </Container>        
    )
}