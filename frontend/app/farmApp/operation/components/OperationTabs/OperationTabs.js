import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { TabsRoute } from 'components'

const OperationTabs = ({

}) => {
    const intl = useIntl()

    const routes = [
        {to: ROUTES.OperationViews, value: {tab: 'tasks' },  label: intl.formatMessage(messages.task) },
        {to: ROUTES.OperationViews, value: {tab: 'table' }, label: intl.formatMessage(messages.table) },
        //{to: ROUTES.DashboardOverview, label: intl.formatMessage(messages.resource) },
    ]

    return (
        <TabsRoute
            valueAccessor='tab'
            items={routes}
        />
    )
}

OperationTabs.propTypes = {

}

export default React.memo(OperationTabs)