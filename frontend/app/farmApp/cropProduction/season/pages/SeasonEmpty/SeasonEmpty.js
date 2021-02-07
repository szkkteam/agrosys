import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useParams, Redirect } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import {
    SeasonCreateButton
} from '../../components'

export default ({    
    ...props
}) => {

    const intl = useIntl()
    const params = useParams()
    console.debug("params: ", params)

    const { cropId } = params

    // TODO: Check if crop has a season already
    const seasonId = cropId === "1"? 1 : null
    const redirectRoute = ROUTE_MAP[ROUTES.CropProductionSeason]

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
                <div>Season overview, no season</div>
                <SeasonCreateButton
                    cropId={parseInt(cropId)}
                />
            </>
        )
}

//            <Redirect to={route.toPath({cropId})} />