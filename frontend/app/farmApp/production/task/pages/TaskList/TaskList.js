import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { Route } from "react-router-dom";

import { TaskLayout } from '../../components'

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
            <TaskLayout
                {...props}
            />
        </Container>
    )
}