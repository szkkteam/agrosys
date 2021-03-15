import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    DashboardContainer,
    DashboardLayout
} from 'farmApp/components'

import CropProductionOverviewToolbar from '../CropProductionOverviewToolbar/CropProductionOverviewToolbar'

import {
    UpcomingTask
} from 'farmApp/cropProduction/task/widgets'

import {
    CropExpense,
    CropCashFlow,
    CropROI,
    CultivatedArea
} from 'farmApp/cropProduction/widgets'


const CropProductionOverviewLayout = ({

}) => {

    const widgetDefaults = {w: 3, h: 5, static: true}

    const cultivatedAreaDefaults = {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0}
    const cropCashFlowAreaDefaults = {...widgetDefaults, i: 'CropCashFlow', x: 3, y: 0}

    const upcomingTaskDefault = {...widgetDefaults, h: 9}

    const layouts = {
        xxs: [
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 0},
        ],
        xs: [
            {...cultivatedAreaDefaults, w: 2},
            {...cropCashFlowAreaDefaults, x: 2, w: 2},
            {...widgetDefaults, i: 'CropExpense', x: 0, y: 5, w: 2},
            {...widgetDefaults, i: 'CropROI', x: 2, y: 10, w: 2},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 15, w: 4},
        ],
        sm: [
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            {...widgetDefaults, i: 'CropExpense', x: 0, y: 5},
            {...widgetDefaults, i: 'CropROI', x: 3, y: 10},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 15},
        ],
        md: [
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 5, w: 4},
        ],
        lg: [
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 5},
        ]

    }

    const components = [
        {key: "CultivatedArea", component: <CultivatedArea />},
        {key: "CropCashFlow", component: <CropCashFlow />},
        {key: "CropExpense", component: <CropExpense />},
        {key: "CropROI", component: <CropROI />},
        {key: "UpcomingTask", component: <UpcomingTask />},
    ]

    return (
        <DashboardLayout
            headerProps={{
                title: "Crops dashboard"
            }}
            toolbar={
                <CropProductionOverviewToolbar />
            }
        >
            <DashboardContainer
                //disabled
                //compactType="horizontal"
                //verticalCompact={false}
                //rowHeight={30}
                layouts={layouts}
                components={components}
            />
        </DashboardLayout>
    )
}

/*
content<br/>
            1) Page title, enough whitespaces.<br/>
                              2) Filter toolbar. Crop chips, select all, edit crops button, add crop button<br/>
                              3) A row (maybe carousel) to display common KPIs<br/>
                              4) Grid layout, to put widgets inside. Based on filtered crops<br/>
                              4.1) Tasks, crop growth, weather, ROI, yield, crop finance, usages, etc...
*/

CropProductionOverviewLayout.propTypes = {

}

export default CropProductionOverviewLayout