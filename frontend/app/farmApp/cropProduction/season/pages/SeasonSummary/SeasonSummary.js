import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'routes'

const Container = styled.div`
    height: 100%;
`

export default ({    
    ...props
}) => {

    const intl = useIntl()
    const { cropId } = useParams()
    // TODO: Get the title for the given crop and provide as a value

    return (
        <Container>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <div>Season overview</div>
        </Container>
    )
}

//            <Redirect to={route.toPath({cropId})} />