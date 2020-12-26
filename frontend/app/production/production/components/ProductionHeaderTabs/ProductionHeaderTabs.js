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
    Tabs,
    TabLink
} from 'components'

import { 
    TAB_TASKS,
    TAB_SUMMARY, 
    TAB_CROP_VARIANTS,
    TAB_FIELDS,
    TAB_PESTS,
    TAB_ANALYSIS,
    TAB_WEATHER
} from '../../constants'



const StyledTabs = styled(props => <Tabs {...props} />)`
    padding: 10px 20px;
`

const ProductionHeaderTabs = ({
    history,
    match,
    location,
    ...props
}) => {
    const intl = useIntl()

    const tabs = [
        {to: ROUTES.ProductionDetailSummary, value: TAB_SUMMARY, label: intl.formatMessage(messages.tabSummaryTitle)},
        {to: ROUTES.ProductionDetailTask, value: TAB_TASKS, label: intl.formatMessage(messages.tabTasksTitle)},
        //{to: ROUTES.CropMultiView, value: TAB_CROP_VARIANTS, label: intl.formatMessage(messages.tabCropVariantTitle)},
        {to: ROUTES.ProductionDetailField, value: TAB_FIELDS, label: intl.formatMessage(messages.tabFieldsTitle)},
        //{to: ROUTES.CropMultiView, value: TAB_PESTS, label: intl.formatMessage(messages.tabPestsTitle)},
        {to: ROUTES.ProductionDetailAnalysis, value: TAB_ANALYSIS, label: intl.formatMessage(messages.tabAnalysisTitle)},
        {to: ROUTES.ProductionDetailWeather, value: TAB_WEATHER, label: intl.formatMessage(messages.tabWeatherTitle)},
    ]

    let value = null
    tabs.map(({ to, value: tabValue }) => {
        const route = ROUTE_MAP[to]
        const match = useRouteMatch({ path: route?.path, ...route.props})
        if (match) {
            value = tabValue
        }
    })

    return (
        <StyledTabs
            value={value}
            orientation="horizontal"
        >
            { tabs && tabs.map((tab, i) => 
                <TabLink key={i} {...tab} params={match.params} />    
            )}            
        </StyledTabs>
    )
}

ProductionHeaderTabs.propTypes = {
    //history: PropTypes.object.isRequired,
    //match: PropTypes.object.isRequired,
}

export default ProductionHeaderTabs
