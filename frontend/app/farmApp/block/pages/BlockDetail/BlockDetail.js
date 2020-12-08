import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Content } from 'components'

import { BlockEdit } from '../../components'

const Container = styled.div`
    height: 100%;
`

export default ({
    history,
    match,
    ...rest  
}) => {

    const intl = useIntl()
   
    return (
        <Container>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <Content>
                <BlockEdit
                />
            </Content>
        </Container>
    )
}