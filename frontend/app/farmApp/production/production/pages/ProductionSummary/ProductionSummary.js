import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { ProductionSeasonLayout } from '../../components'

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
            <ProductionSeasonLayout />
        </Container>
    )
}
/*
            <div>
                Summary view for a given production. <br/>
                Show quick information about the active production. <br/>
                Also show some information about past and next productions <br/>
                User can also add production to the dedicated crop <br/>
                The most important stuff is always the active production. That should be in the focus. <br/>
                The user must be able to add new production(s) anytime. The active production can be terminated in the summary view (Finish, archive, delete) <br/>
                If the current production is terminated, the next one should be in the focus. <br/>
                The user should have the possibility, to see the upcoming and archived/deleted productions also.
            </div>
*/