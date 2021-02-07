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

import { SeasonTimeline, SeasonStats } from 'farmApp/cropProduction/season/widgets'
import { FieldWeather } from 'farmApp/cropProduction/fieldProduction/widgets'
import { CropUpcomingTask } from 'farmApp/cropProduction/task/widgets'

const SeasonOverviewLayout = ({

}) => {


    const widgetDefaults = {static: true}

    const seasonTimelineDefaults = {...widgetDefaults, i: 'SeasonTimeline', x: 12, y: 0, w: 3, h: 10}

    const fieldWeatherDefaults = {...widgetDefaults, i: 'FieldWeather', x: 0, y: 10, w: 6, h: 10}

    const upcomingTaskDefaults = {...widgetDefaults, i: 'CropUpcomingTask', x: 5, y: 0, w: 4, h: 10}

    const seasonsStatsDefaults = {...widgetDefaults, i: 'SeasonStats', x: 0, y: 0, w: 5, h: 10}

    const test = {...widgetDefaults, i: 'test', x: 0, y: 10, w: 3, h: 15}

    const components = [
        {key: 'SeasonTimeline', component: <SeasonTimeline />},
        {key: 'FieldWeather', component: <FieldWeather />},
        {key: 'CropUpcomingTask', component: <CropUpcomingTask />},       
        {key: 'SeasonStats', component: <SeasonStats />},       
        
    ]

    const layouts = {
        xxs: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...seasonsStatsDefaults},
        ],
        xs: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...seasonsStatsDefaults},
        ],
        sm: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...seasonsStatsDefaults},
        ],
        md: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...seasonsStatsDefaults},
        ],
        lg: [
            {...seasonTimelineDefaults},
            {...fieldWeatherDefaults},
            {...upcomingTaskDefaults},
            {...seasonsStatsDefaults},
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