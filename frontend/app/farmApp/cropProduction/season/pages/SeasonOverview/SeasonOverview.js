import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import {
    SeasonOverviewLayout
} from '../../components'

export default ({    
    ...props
}) => {

    const intl = useIntl()
    const { cropId } = useParams()

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <SeasonOverviewLayout />
        </>
    )
}

//            <Redirect to={route.toPath({cropId})} />