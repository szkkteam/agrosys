import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { TabsRoute } from 'components'

const ResourceTabs = ({

}) => {
    const intl = useIntl()

    const routes = [
        {to: ROUTES.ResourceOverview, disabled: true, value: {tab: 'machinery' },  label: intl.formatMessage(messages.machinery) },
        {to: ROUTES.ResourceOverview, disabled: true, value: {tab: 'worker' }, label: intl.formatMessage(messages.worker) },
        {to: ROUTES.ResourceOverview, value: {tab: 'fields' }, label: intl.formatMessage(messages.field) },
        //{to: ROUTES.DashboardOverview, label: intl.formatMessage(messages.resource) },
    ]

    return (
        <TabsRoute
            redirectTo={{to: ROUTES.ResourceOverview, params: {tab: 'fields'}}}
            valueAccessor='tab'
            items={routes}
        />
    )
}

ResourceTabs.propTypes = {

}

export default React.memo(ResourceTabs)