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


const DashboardOverviewLayout = ({

}) => {


    const widgetDefaults = {w: 3, h: 5, static: true}

    const cultivatedAreaDefaults = {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0}
    const cropCashFlowAreaDefaults = {...widgetDefaults, i: 'CropCashFlow', x: 3, y: 0}
    
    const layouts = {
        xxs: [
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
        ],
        xs: [
            {...cultivatedAreaDefaults, w: 2},
            {...cropCashFlowAreaDefaults, x: 2, w: 2},
            {...widgetDefaults, i: 'CropExpense', x: 0, y: 5, w: 2},
            {...widgetDefaults, i: 'CropROI', x: 2, y: 10, w: 2},
        ],
        sm: [
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            {...widgetDefaults, i: 'CropExpense', x: 0, y: 5},
            {...widgetDefaults, i: 'CropROI', x: 3, y: 10},
        ],
        md: [
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
        ],
        lg: [
            cultivatedAreaDefaults,
            cropCashFlowAreaDefaults,
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
        ]

    }

    const components = [
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