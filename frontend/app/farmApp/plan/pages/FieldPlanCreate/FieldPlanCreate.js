import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import messages from 'farmApp/plan/messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
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
    FieldPlanCreate 
} from 'farmApp/plan/fieldPlan/components'

export default ({
    ...props
}) => {
    const intl = useIntl()
    const { season } = useParams()

    const links = [
        {title: messages.title, to: ROUTES.Plan},
        {title: messages.fieldPlanOverview, to: ROUTES.PlanFieldPlan},
        {title: messages.fieldPlanCreate, to: ROUTES.PlanFieldPlanCreate, params: {season}},
    ]

    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.fieldPlanCreate)}
                </title>
            </Helmet>
            <AppBar
                goUpRoute={{
                    to: ROUTES.PlanFieldPlan
                }}
                title={messages.fieldPlanOverview}
            />
            <MinimalLayout
                title={messages.fieldPlanCreate}
                breadcrumbs={{
                    links
                }}
            >
                <FieldPlanCreate
                    season={season}
                />
            </MinimalLayout>
        </>
    )
}
