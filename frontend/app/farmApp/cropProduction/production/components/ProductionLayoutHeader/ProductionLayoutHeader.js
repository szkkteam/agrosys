import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useLocation, useParams } from "react-router-dom";
import { HashRoute } from 'utils/route'
import { useHeightDifference } from 'utils/hooks'
import { ROUTES, ROUTE_MAP } from 'routes'

import { 
    TabHeader,
    SplitButton
} from 'components'

import {
    Typography,
    Button
} from '@material-ui/core'

import { 
    TAB_TASKS,
    TAB_SUMMARY, 
    TAB_CROP_VARIANTS,
    TAB_FIELDS,
    TAB_PESTS,
    TAB_ANALYSIS,
    TAB_WEATHER,
    TAB_SETTINGS
} from '../../constants'

import {
    SeasonSelector
} from 'farmApp/cropProduction/season/components'

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`

const SubContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`

const SelectorContainer = styled.div`
    margin-right: 15px;
`
const Spacer = styled.div`
    flex-grow: 1;
`

const ProductionLayoutHeader = ({
}) => {
    const intl = useIntl()

    // TODO: Get the current season from the storage. If no season is created yet, deactivate the rotues
    const params = { seasonId: 3}



    const tabs = [
        {to: ROUTES.CropProductionSeasonSummary, value: TAB_SUMMARY, label: intl.formatMessage(messages.tabSummaryTitle)},

        //{to: ROUTES.ProductionDetailSummary, value: TAB_SUMMARY, label: intl.formatMessage(messages.tabSummaryTitle)},
        {to: ROUTES.ProductionDetailTask, value: TAB_TASKS, label: intl.formatMessage(messages.tabTasksTitle)},
        {to: ROUTES.CropProductionFieldProduction, value: TAB_FIELDS, label: intl.formatMessage(messages.tabFieldsTitle)},
        //{to: ROUTES.ProductionDetailAnalysis, value: TAB_ANALYSIS, label: intl.formatMessage(messages.tabAnalysisTitle)},
        //{to: ROUTES.ProductionDetailWeather, value: TAB_WEATHER, label: intl.formatMessage(messages.tabWeatherTitle)},
        //{to: ROUTES.ProductionSettings, value: TAB_SETTINGS, label: intl.formatMessage(messages.tabSettingsTitle)},
    ]

    return (
        <Container>
            <TabHeader
                items={tabs}
                params={params}
            />
        </Container>
    )
}
/*

*/


ProductionLayoutHeader.propTypes = {
}

export default React.memo(ProductionLayoutHeader)
