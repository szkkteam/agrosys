import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Content } from 'components'

import { FieldCreateDraw } from '../../components'

/**
 * 1) Render a form component
 * 2) Make the form steppable
 * 3) On the first page render the map and wait for the geometry
 * 4) On the second page, fill out the other data
 * 5) The user can jump back to the map to modify the geometry
 * 6) When everything is okay, send the form data to the server and render the /fields/<id newly created>/?view=map route
 */


const Container = styled.div`
    height: 100%;
`


export default ({
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
                    <FieldCreateDraw />
                </Content>
        </Container>
    )
}
