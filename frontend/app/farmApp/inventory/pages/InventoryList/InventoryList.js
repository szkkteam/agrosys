import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { HeaderContent } from 'components'
import { 
    InventoryLayout,
    InventoryHeader,
} from '../../components'

const Container = styled.div`
    height: 100%;
    width: 100%;
`

export default ({
    match,
    location
}) => {
    const intl = useIntl()

    return (
        <Container>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <HeaderContent>
                <InventoryHeader />
                <InventoryLayout />
            </HeaderContent>
        </Container>

    )
}