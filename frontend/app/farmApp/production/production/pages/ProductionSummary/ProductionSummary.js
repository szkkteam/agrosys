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
            <div>
                Summary view for a given production. <br/>
                Show quick information about the active production. <br/>
                Also show some information about past and next productions <br/>
                User can also add production to the dedicated crop
            </div>
        </Container>
    )
}
