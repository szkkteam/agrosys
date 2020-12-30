import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { PageContent } from 'components'

const Container = styled.div`
    height: 100%;
`

export default ({

}) => {
    const intl = useIntl()

    return (
        <Container>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <div>Production multi view</div>
        </Container>

    )
}