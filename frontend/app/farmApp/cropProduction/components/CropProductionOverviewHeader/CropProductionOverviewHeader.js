import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useLocation, Switch } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { useHeightDifference } from 'utils/hooks'
import { ROUTES, ROUTE_MAP } from 'routes'

import { 
    TabHeader,
} from 'components'

import { 
    TAB_OVERVIEW,
    TAB_TIMELINE, 
} from '../../constants'


const CropProductionOverviewHeader = ({
    match,
    ...props
}) => {
    const intl = useIntl()

    const tabs = [
        {to: ROUTES.CropProductionTimeline, value: TAB_OVERVIEW, label: intl.formatMessage(messages.overview)},
        {to: ROUTES.CropProductionOverview, value: TAB_TIMELINE, label: intl.formatMessage(messages.timeline)},
    ]

    return (
        <TabHeader
            items={tabs}
            match={match}
        />
    )
}

CropProductionOverviewHeader.propTypes = {
}

export default CropProductionOverviewHeader
