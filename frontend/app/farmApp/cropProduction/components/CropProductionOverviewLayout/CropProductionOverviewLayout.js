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

const TestDiv = styled.div`
    background-color: grey;
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
                >
                    <div key="CultivatedArea">
                        <CultivatedArea />
                    </div>
                    <div key="CropIncome" >
                        <CropIncome />
                    </div>
                    <div key="CropExpense">
                        <CropExpense />
                    </div>
                    <div key="CropROI">
                        <CropROI />
                    </div>
                    <div key="UpcomingTask">
                        <UpcomingTask />
                    </div>
                    
                </DashboardLayout>
            </div>
        </Container>
    )
}
/*
<DashboardLayout
                disabled
                compactType="horizontal"
                verticalCompact={false}
            >
                <TestDiv key="1">1</TestDiv>
                <TestDiv key="2">2</TestDiv>
                <TestDiv key="3">3</TestDiv>
            </DashboardLayout>
            <Grid 
                container
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Crops dashboard
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CropProductionOverviewToolbar />
                </Grid>
                <Grid
                    alignItems="stretch"
                    container
                    item xs={12}
                    spacing={2}
                >   
                    <Grid item xs={12} sm={6} md={3}>
                        <CultivatedArea />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CropIncome />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CropExpense />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <CropROI />
                    </Grid>
                </Grid>
                <Grid 
                    container item xs={12} 
                    spacing={2}
                >
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <UpcomingTask />
                    </Grid>
                </Grid>
            </Grid>
*/

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
