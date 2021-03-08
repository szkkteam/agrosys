import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from 'farmApp/plan/messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { getYear } from 'date-fns'
import { useParams, Redirect } from 'react-router-dom'
import { ROUTES } from 'farmApp/routes'

import {
    Container
} from '@material-ui/core'

import {
    MinimalLayout,
} from 'farmApp/components'

import {
    AppBar
} from 'farmApp/components'

import {
    CropPlanCreate
} from 'farmApp/plan/cropPlan/components'

export default ({
    location,
    ...props
}) => {
    const intl = useIntl()
    const { season } = useParams()


    const links = [
        {title: messages.title, to: ROUTES.Plan},
        {title: messages.cropPlanOverview, to: ROUTES.PlanCropPlan},
        {title: messages.cropPlanCreate, to: ROUTES.PlanCropPlanCreate, params: {season}},
    ]

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.cropPlanCreate)}
                </title>
            </Helmet>
            <AppBar
                goUpRoute={{
                    to: ROUTES.PlanCropPlan
                }}
                title={messages.cropPlanOverview}
            />
            <MinimalLayout
                containerProps={{
                    component: Container,
                    maxWidth: 'lg'
                }}
                title={messages.cropPlanCreate}
                breadcrumbs={{
                    links
                }}
            >
                <CropPlanCreate
                    season={season}
                />
            </MinimalLayout>
            
        </>
    )
}
/*
<SeasonCreateForm
                initialValues={{
                    userCropId,
                    ...location.state?.initialValues ?? {}
                }}
            />
*/