import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { SeasonAppBar } from 'farmApp/cropProduction/season/components'
import { TaskLayout } from '../../components'

const Container = styled.div`
    height: 100%;
`

export default ({    
    ...props
}) => {
    const intl = useIntl()

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <SeasonAppBar
                title={messages.title}
            />
            <TaskLayout />
        </>
    )
}
