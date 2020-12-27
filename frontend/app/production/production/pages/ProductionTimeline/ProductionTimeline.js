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
                Show dedicated productions as timeline. <br/>
                On the X axis: Display the allocated fields for the current production.<br/>
                On the Y axis: Display the years and months. <br/>
                As data: Display each and every productions for given field and align it on the correct time axis.<br/>
            </div>
        </Container>
    )
}
