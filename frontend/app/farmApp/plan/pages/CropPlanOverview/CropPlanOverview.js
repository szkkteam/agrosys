import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from 'farmApp/plan/messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { getYear } from 'date-fns'
import { useParams, Redirect } from 'react-router-dom'
import { ROUTES } from 'farmApp/routes'

import {
    MinimalLayout,
    SeasonArrowSelector
} from 'farmApp/components'

import {
    useSeasonFromUrl
} from 'farmApp/plan/hooks'

import {
    CropPlanOverview
} from 'farmApp/plan/cropPlan/components'

export default ({
    location,
    history,
    ...props
}) => {
    const intl = useIntl()
    const season = useSeasonFromUrl()


    const handleSeasonChange = (newSeason) => {
        history.push({
            path: location.pathname,
            search: `season=${newSeason}`
        })
    }

    const links = [
        {title: messages.title, to: ROUTES.Plan},
        {title: messages.cropPlanOverview, to: ROUTES.PlanCropPlan},
    ]

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
                        {intl.formatMessage(messages.cropPlanOverview)}
                    </title>
                </Helmet>
                <MinimalLayout
                    title={messages.cropPlanOverview}
                    breadcrumbs={{
                        links
                    }}
                    action={
                        <SeasonArrowSelector
                            season={season}
                            onChange={handleSeasonChange}
                        />
                    }
                >
                    <CropPlanOverview
                        season={season}
                    />
                </MinimalLayout>
                
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