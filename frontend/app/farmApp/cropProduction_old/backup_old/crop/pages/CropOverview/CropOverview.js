import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'
import { useSelectCurrentSeason } from '../../hooks'

import {
    CropOverviewLayout
} from '../../components'

export default ({    
    ...props
}) => {

    const intl = useIntl()
    const { cropId } = useParams()
    const { payload, isLoading } = useSelectCurrentSeason(cropId)

    const redirectRoute = ROUTE_MAP[ROUTES.CropProductionSeason]

    console.debug("seasonId: ", payload)
    const seasonId = !isLoading && payload? payload.id : null

    if (seasonId)
        return <Redirect to={redirectRoute.toPath({cropId, seasonId})} />
    else
        return (
            <>
                <Helmet>
                    <title>
                        {intl.formatMessage(messages.title)}
                    </title>
                </Helmet>
                <CropOverviewLayout />
            </>
        )
}

//            <Redirect to={route.toPath({cropId})} />