import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { ProductionLayout } from '../../components'

const Container = styled.div`
    height: 100%;
`

export default ({    
    ...props
}) => {

    const intl = useIntl()
   
    return (
        <Container>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <ProductionLayout
                {...props}
            />  
        </Container>
    )
}

/*
            <ProductionLayout
                history={history}
                match={match}
            />            
 */