import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { TabsRoute } from 'components'

const PlanTabs = ({

}) => {
    const intl = useIntl()

    const routes = [
        {to: ROUTES.PlanCropPlan, value: {tab: 'crop-plan' },  label: intl.formatMessage(messages.cropPlan) },
        {to: ROUTES.PlanFieldPlan, value: {tab: 'field-plan' }, label: intl.formatMessage(messages.fieldPlan) },
        //{to: ROUTES.DashboardOverview, label: intl.formatMessage(messages.resource) },
    ]

    return (
        <TabsRoute
            valueAccessor='tab'
            items={routes}
        />
    )
}

PlanTabs.propTypes = {

}

export default React.memo(PlanTabs)