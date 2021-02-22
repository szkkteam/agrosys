import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    DashboardContainer,
    DashboardLayout
} from 'farmApp/components'


import {
    CropExpense,
    CropCashFlow,
    CropROI,
    CultivatedArea
} from 'farmApp/cropProduction/widgets'

import {
    CropsByArea
} from 'farmApp/dashboard/widgets'

const DashboardOverviewLayout = ({

}) => {


    const widgetDefaults = {w: 3, h: 5, static: true}

    const cultivatedAreaDefaults = {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0}
    const cropRoiDefaults = {...widgetDefaults, i: 'CropROI', x: 3, y: 0}
    const cropExpenseDefaults = {...widgetDefaults, i: 'CropExpense', x: 0, y: 5}
    const cropCashFlowAreaDefaults = {...widgetDefaults, i: 'CropCashFlow', x: 3, y: 5}
    const cropsByAreaDefaults = {...widgetDefaults, i: 'CropsByArea', x: 6, y: 0, w: 6, h: 10}
    
    const layouts = {
        xxs: [
            cropsByAreaDefaults,
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            cropRoiDefaults,
            cropExpenseDefaults,
        ],
        xs: [
            cropsByAreaDefaults,
            {...cultivatedAreaDefaults, w: 2},
            {...cropCashFlowAreaDefaults, x: 2, w: 2},
            {...cropExpenseDefaults, x: 0, w: 2},
            {...cropRoiDefaults, x: 2, w: 2},
        ],
        sm: [
            cropsByAreaDefaults,
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            cropRoiDefaults,
            cropExpenseDefaults,
        ],
        md: [
            cropsByAreaDefaults,
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            cropRoiDefaults,
            cropExpenseDefaults,
        ],
        lg: [
            cropsByAreaDefaults,
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            cropRoiDefaults,
            cropExpenseDefaults,
        ]

    }

    const components = [
        {key: "CropsByArea", component: <CropsByArea />},
        {key: "CultivatedArea", component: <CultivatedArea />},
        {key: "CropCashFlow", component: <CropCashFlow />},
        {key: "CropExpense", component: <CropExpense />},
        {key: "CropROI", component: <CropROI />},
    ]

    return (
        <DashboardLayout
            headerProps={{
                title: "Dashboard",
                subheader: "Farm overview"
            }}
           
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

DashboardOverviewLayout.propTypes = {

}

export default DashboardOverviewLayout