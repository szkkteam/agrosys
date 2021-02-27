import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { getYear } from 'date-fns'
import { useParams, Redirect } from 'react-router-dom'
import { Route } from "react-router-dom";

import {
    useSeasonFromUrl
} from 'farmApp/plan/hooks'

import {
    AppBar
} from 'farmApp/components'

import {
    CropPlanOverview
} from 'farmApp/plan/cropPlan/components'

export default ({
    location,
    ...props
}) => {
    const intl = useIntl()
    const season = useSeasonFromUrl()

    if (!season) {
        return (
            <Redirect to={{
                ...location,
                search: `season=${getYear(new Date())}`
            }} />
        )
    }
    else {
        return (
            <>
                <Helmet>
                    <title>
                        {intl.formatMessage(messages.title)}
                    </title>
                </Helmet>
                <AppBar
                    title={messages.title}
                />
                <CropPlanOverview
                    season={season}
                />
            </>
        )
    }
    
}
/*
<SeasonCreateForm
                initialValues={{
                    userCropId,
                    ...location.state?.initialValues ?? {}
                }}
            />
*/