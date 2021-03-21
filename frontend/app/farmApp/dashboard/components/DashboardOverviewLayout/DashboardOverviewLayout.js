import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    DashboardContainer,
} from 'farmApp/components'


import {
    CropExpense,
    CropCashFlow,
    CropROI,
    CultivatedArea
} from 'farmApp/cropProduction_old/widgets'

import {
    CropsByArea,
    UpcomingTask
} from 'farmApp/dashboard/widgets'

const DashboardOverviewLayout = ({

}) => {


    const widgetDefaults = {w: 3, h: 5, static: true}

    const cultivatedAreaDefaults = {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0}
    const cropRoiDefaults = {...widgetDefaults, i: 'CropROI', x: 3, y: 0}
    const cropExpenseDefaults = {...widgetDefaults, i: 'CropExpense', x: 0, y: 5}
    const cropCashFlowAreaDefaults = {...widgetDefaults, i: 'CropCashFlow', x: 3, y: 5}
    const cropsByAreaDefaults = {...widgetDefaults, i: 'CropsByArea', x: 6, y: 0, w: 6, h: 10}
    const upcomingTaskDefaults = {...widgetDefaults, i: 'UpcomingTask', x: 0, y: 10, w: 4, h: 10}

    const layouts = {
        xxs: [
            cropsByAreaDefaults,
            upcomingTaskDefaults,
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            cropRoiDefaults,
            cropExpenseDefaults,
        ],
        xs: [
            cropsByAreaDefaults,
            upcomingTaskDefaults,
            {...cultivatedAreaDefaults, w: 2},
            {...cropCashFlowAreaDefaults, x: 2, w: 2},
            {...cropExpenseDefaults, x: 0, w: 2},
            {...cropRoiDefaults, x: 2, w: 2},
        ],
        sm: [
            cropsByAreaDefaults,
            upcomingTaskDefaults,
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            cropRoiDefaults,
            cropExpenseDefaults,
        ],
        md: [
            cropsByAreaDefaults,
            upcomingTaskDefaults,
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            cropRoiDefaults,
            cropExpenseDefaults,
        ],
        lg: [
            cropsByAreaDefaults,
            upcomingTaskDefaults,
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            cropRoiDefaults,
            cropExpenseDefaults,
        ]

    }

    const components = [
        {key: "CropsByArea", component: <CropsByArea />},
        {key: "UpcomingTask", component: <UpcomingTask />},
        {key: "CultivatedArea", component: <CultivatedArea />},
        {key: "CropCashFlow", component: <CropCashFlow />},
        {key: "CropExpense", component: <CropExpense />},
        {key: "CropROI", component: <CropROI />},
    ]

    return (
    
        <DashboardContainer
            //disabled
            //compactType="horizontal"
            //verticalCompact={false}
            //rowHeight={30}
            layouts={layouts}
            components={components}
        />
    )
}

DashboardOverviewLayout.propTypes = {

}

export default DashboardOverviewLayout