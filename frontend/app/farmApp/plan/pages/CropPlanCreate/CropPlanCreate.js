import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import styled from 'styled-components'
import { useIntl } from 'react-intl'
import { getYear } from 'date-fns'
import { useParams, Redirect } from 'react-router-dom'
import { ROUTES } from 'farmApp/routes'

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
    //const { season } = useParams()

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <AppBar
                goUpRoute={{
                    to: ROUTES.PlanCropPlan
                }}
                title={messages.title}
            />
            <div>add new crop plan</div>
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