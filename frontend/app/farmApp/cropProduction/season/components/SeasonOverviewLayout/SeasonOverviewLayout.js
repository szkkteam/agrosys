import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { DashboardLayout, DashboardCard } from 'farmApp/components/Dashboard'

import { SeasonTimeline } from 'farmApp/cropProduction/season/widgets'
import { FieldWeather } from 'farmApp/cropProduction/fieldProduction/widgets'
import { CropUpcomingTask } from 'farmApp/cropProduction/task/widgets'

import {
    Grid,
    Typography
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

const SeasonOverviewLayout = ({

}) => {


    const widgetDefaults = {static: true}

    const seasonTimelineDefaults = {...widgetDefaults, i: 'SeasonTimeline', x: 12, y: 0, w: 3, h: 10}

    const fieldWeatherDefaults = {...widgetDefaults, i: 'FieldWeather', x: 0, y: 0, w: 6, h: 10}

    const upcomingTaskDefaults = {...widgetDefaults, i: 'CropUpcomingTask', x: 6, y: 0, w: 3, h: 10}

    const test = {...widgetDefaults, i: 'test', x: 0, y: 10, w: 3, h: 10}

    const components = [
        {key: 'SeasonTimeline', component: <SeasonTimeline />},
        {key: 'FieldWeather', component: <FieldWeather />},
        {key: 'CropUpcomingTask', component: <CropUpcomingTask />},
        {key: 'test', component: (
            <DashboardCard
                title="Test title"
                subheader="subheader bla bla"
            >
                <div>content</div>
            </DashboardCard>
        )}
        
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
        <Container
            spacing={4}
        >
            <div>
                <Typography variant="h5">
                    My wheat - wheat 2020 (2020.06.05 - 2020.08.10)
                </Typography>
            </div>
            <div style={{width: "100%"}}>
                Toolbar
            </div>
            <div>
                <DashboardLayout
                    layouts={layouts}
                    components={components}
                >                    
                </DashboardLayout>
            </div>
        </Container>
    )
}


SeasonOverviewLayout.propTypes = {

}

export default SeasonOverviewLayout