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
    SplitButton
} from 'components'

import { 
    TAB_GN,
    TAB_SUMMARY,
} from '../../constants'

const CountryTabHeader = ({
    match,
    ...props
}) => {
    const intl = useIntl()

    const tabs = [
        //{to: ROUTES.CountrySummary, value: TAB_SUMMARY, label: intl.formatMessage(messages.tabSummaryTitle)},
        {to: ROUTES.ReportCountryGn, value: TAB_GN, label: intl.formatMessage(messages.tabGnTitle)},
        
    ]

    return (
        <TabHeader
            items={tabs}
        />

        
    )
}

/*

*/

CountryTabHeader.propTypes = {
}

export default CountryTabHeader
