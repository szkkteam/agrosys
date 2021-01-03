import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { DashboardLayout } from '../../components'

import { usePageTitle } from 'utils/hooks'

const Container = styled.div`
    height: 100%;
    width: 100%;
`

export default ({

}) => {
    const intl = useIntl()

    usePageTitle(messages.title)

    return (
        <Container>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <DashboardLayout />
        </Container>
    )
}
