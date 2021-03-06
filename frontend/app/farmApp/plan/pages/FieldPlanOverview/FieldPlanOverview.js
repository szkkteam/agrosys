import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import messages from 'farmApp/plan/messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import {
    FieldPlanOverview,
    FieldPlanNewPlanButton
} from 'farmApp/plan/fieldPlan/components'

import {
    ListLayout,
} from 'farmApp/components'

export default ({
    ...props
}) => {
    const intl = useIntl()
    
    const links = [
        {title: messages.title, to: ROUTES.Plan},
        {title: messages.fieldPlanOverview, to: ROUTES.PlanFieldPlan},
    ]
    
    return (
        <>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.fieldPlanOverview)}
                </title>
            </Helmet>
            <ListLayout
                title={messages.fieldPlanOverview}
                breadcrumbs={{
                    links
                }}
                primaryAction={
                    <FieldPlanNewPlanButton
                    />
                }
            >
                <FieldPlanOverview
                />
            </ListLayout>
        </>
    )
}
