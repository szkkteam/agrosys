import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { TabsRoute } from 'components'

const DashboardTabs = ({

}) => {
    const intl = useIntl()

    const routes = [
        {to: ROUTES.DashboardOverview, label: intl.formatMessage(messages.overview) },
        //{to: ROUTES.DashboardOverview, label: intl.formatMessage(messages.crop) },
        //{to: ROUTES.DashboardOverview, label: intl.formatMessage(messages.finance) },
        //{to: ROUTES.DashboardOverview, label: intl.formatMessage(messages.resource) },
    ]

    return (
        <TabsRoute
            items={routes}
        />
    )
}

DashboardTabs.propTypes = {

}

export default DashboardTabs