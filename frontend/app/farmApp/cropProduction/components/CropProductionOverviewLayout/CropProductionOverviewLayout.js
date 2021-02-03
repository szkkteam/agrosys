import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { DashboardLayout } from 'farmApp/components'

import CropProductionOverviewToolbar from '../CropProductionOverviewToolbar/CropProductionOverviewToolbar'

import {
    UpcomingTask
} from 'farmApp/cropProduction/task/widgets'

import {
    CropExpense,
    CropIncome,
    CropROI,
    CultivatedArea
} from 'farmApp/cropProduction/widgets'

import {
    Grid,
    Typography,
} from '@material-ui/core'

const Container = styled.div`
    ${({theme, spacing}) => `
        flex-grow: 1;
        padding: 7px 8px;
        display: flex;
        flex-direction: column;
        ${theme.breakpoints.up('sm')} {
            //padding: 15px calc(${theme.spacing(spacing)}px / 2 + 1px);
        }
    `}
`


const CropProductionOverviewLayout = ({

}) => {

    const widgetDefaults = {w: 3, h: 5, static: true}

    const upcomingTaskDefault = {...widgetDefaults, h: 9}

    const layouts = {
        xxs: [
            {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0},
            {...widgetDefaults, i: 'CropIncome', x: 3, y: 0},
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 0},
        ],
        xs: [
            {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0, w: 2},
            {...widgetDefaults, i: 'CropIncome', x: 2, y: 0, w: 2},
            {...widgetDefaults, i: 'CropExpense', x: 0, y: 5, w: 2},
            {...widgetDefaults, i: 'CropROI', x: 2, y: 10, w: 2},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 15, w: 4},
        ],
        sm: [
            {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0},
            {...widgetDefaults, i: 'CropIncome', x: 3, y: 0},
            {...widgetDefaults, i: 'CropExpense', x: 0, y: 5},
            {...widgetDefaults, i: 'CropROI', x: 3, y: 10},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 15},
        ],
        md: [
            {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0},
            {...widgetDefaults, i: 'CropIncome', x: 3, y: 0},
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 5, w: 4},
        ],
        lg: [
            {...widgetDefaults, i: 'CultivatedArea', x: 0, y: 0},
            {...widgetDefaults, i: 'CropIncome', x: 3, y: 0},
            {...widgetDefaults, i: 'CropExpense', x: 6, y: 0},
            {...widgetDefaults, i: 'CropROI', x: 9, y: 0},
            {...upcomingTaskDefault, i: 'UpcomingTask', x: 0, y: 5},
        ]

    }

    const components = [
        {key: "CultivatedArea", component: <CultivatedArea />},
        {key: "CropIncome", component: <CropIncome />},
        {key: "CropExpense", component: <CropExpense />},
        {key: "CropROI", component: <CropROI />},
        {key: "UpcomingTask", component: <UpcomingTask />},
    ]

    return (
        <Container
            spacing={4}
        >
            <div>
                <Typography variant="h5">
                    Crops dashboard
                </Typography>
            </div>
            <div style={{width: "100%"}}>
                <CropProductionOverviewToolbar />
            </div>
            <div >
                <DashboardLayout
                    //disabled
                    //compactType="horizontal"
                    //verticalCompact={false}
                    //rowHeight={30}
                    layouts={layouts}
                    components={components}
                />
            </div>
        </Container>
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
