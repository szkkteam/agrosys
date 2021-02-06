import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { 
    DashboardContainer,
    DashboardLayout
} from 'farmApp/components'

import SeasonOverviewToolbar from '../SeasonOverviewToolbar/SeasonOverviewToolbar'

import { SeasonTimeline } from 'farmApp/cropProduction/season/widgets'
import { FieldWeather } from 'farmApp/cropProduction/fieldProduction/widgets'
import { CropUpcomingTask } from 'farmApp/cropProduction/task/widgets'

import {
    Paper,
    Grid,
    Typography,
    LinearProgress
} from '@material-ui/core'

const FullWidth = styled.div`
    width: 100%;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const Bar = ({
    title,
    valueTitle,
    value
}) => {
    return (
        <>
            <div style={{ paddingBottom: "10px", width: "100%", display: "flex"}}>
                <Typography variant="body2">
                    {title}
                </Typography>
                <Spacer />
                <Typography variant="body2">
                    {valueTitle}
                </Typography>
            </div>
            <LinearProgress
                variant="determinate"
                value={value}
            />
        </>
    )
}

const CashFlow = ({

}) => {
    return (
        <FullWidth>
            <Bar title="Bevétel" valueTitle="23.000 HUF" value={100}/>
            <Bar title="Kiadás" valueTitle="13.000 HUF" value={50}/>
        </FullWidth>
    )
}

const Header = ({

}) => {
    return (
        <Grid container>
            <Grid container item xs={4}>
                <Grid item xs={12}>
                    <Typography variant="h6">
                        Wheat 2020
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    From: 2020 Szeptember 1
                </Grid>
                <Grid item xs={12}>
                    To: 2020 Szeptember 1
                </Grid>
                <Grid item xs={12}>
                    Main crop: Tavaszi búza
                </Grid>
                <Grid item xs={12}>
                    Várható hozam: 9t
                </Grid>
                <Grid item xs={12}>
                    Várható bevétel: 3500 HUF
                </Grid>
                <Grid item xs={12}>
                    <CashFlow />
                </Grid>
            </Grid>
            <Grid item xs={8}>
                Selectable
            </Grid>
        </Grid>
    )
}

const SeasonOverviewLayout = ({

}) => {


    const widgetDefaults = {static: true}

    const seasonTimelineDefaults = {...widgetDefaults, i: 'SeasonTimeline', x: 12, y: 0, w: 3, h: 10}

    const fieldWeatherDefaults = {...widgetDefaults, i: 'FieldWeather', x: 0, y: 0, w: 6, h: 10}

    const upcomingTaskDefaults = {...widgetDefaults, i: 'CropUpcomingTask', x: 6, y: 0, w: 3, h: 10}

    const test = {...widgetDefaults, i: 'test', x: 0, y: 10, w: 3, h: 15}

    const components = [
        {key: 'SeasonTimeline', component: <SeasonTimeline />},
        {key: 'FieldWeather', component: <FieldWeather />},
        {key: 'CropUpcomingTask', component: <CropUpcomingTask />},       
        
    ]

    const layouts = {
        xxs: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ],
        xs: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ],
        sm: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ],
        md: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ],
        lg: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...test},
        ]

    }

    return (
        <DashboardLayout
            headerProps={{
                title: "Current season - Wheat 2020",
                subheader: "2020 Szepember 1 - 2020 November 20"
            }}
            toolbar={
                <SeasonOverviewToolbar
                />
            }
        >
            <DashboardContainer
                layouts={layouts}
                components={components}
            >                    
            </DashboardContainer>
        </DashboardLayout>        
    )
}


SeasonOverviewLayout.propTypes = {

}

export default SeasonOverviewLayout