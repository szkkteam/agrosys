import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { useHeightDifference } from 'utils/hooks'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import { 
    TAB_FIELD,
    TAB_MACHINERY,
    TAB_WORKER,
    TAB_USAGE,
    TAB_INVENTORY
} from '../../constants'

const ResourceTabHeader = ({
    match,
    ...props
}) => {
    const intl = useIntl()

    const tabs = [
        {to: ROUTES.ReportResourceUsage, value: TAB_USAGE, label: intl.formatMessage(messages.tabUsageTitle)},
        {to: ROUTES.ReportResourceBlock, value: TAB_FIELD, label: intl.formatMessage(messages.tabBlockTitle)},
        {to: ROUTES.ReportResourceMachinery, value: TAB_MACHINERY, label: intl.formatMessage(messages.tabMachineryTitle)},
        {to: ROUTES.ReportResourceWorker, value: TAB_WORKER, label: intl.formatMessage(messages.tabWorkerTitle)},
        {to: ROUTES.ReportResourceInventory, value: TAB_INVENTORY, label: intl.formatMessage(messages.tabInventoryTitle)},
        
        
    ]

    return (
        <div>tab header</div>

        
    )
}

/*

*/

ResourceTabHeader.propTypes = {
}

export default ResourceTabHeader
